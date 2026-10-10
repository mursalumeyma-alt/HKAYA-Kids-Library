import { spawn } from 'child_process';
import http from 'http';

async function main() {
  console.log('Starting headless Chrome for Checkout payment options verification...');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9226',
    '--user-data-dir=C:\\Users\\Administrator\\.gemini\\antigravity\\scratch\\chrome-test-profile-3',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1280,1000',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 3000));

  const target = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9226/json', res => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => {
        const list = JSON.parse(buf);
        resolve(list.find(t => t.type === 'page'));
      });
    }).on('error', reject);
  });

  const ws = new WebSocket(target.webSocketDebuggerUrl);

  let id = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const curId = id++;
    pending.set(curId, { resolve, reject });
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await new Promise(r => ws.onopen = r);

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  await new Promise(r => setTimeout(r, 2000));

  // 1. Add an item to cart and trigger checkout
  const checkoutTest = await send('Runtime.evaluate', {
    expression: `
      (async () => {
        // Find first add to cart button
        const addBtn = document.querySelector('button[aria-label*="Add"], button:has(svg)');
        // Alternatively, find any "Add to Cart" text button
        const buttons = Array.from(document.querySelectorAll('button'));
        const cartBtn = buttons.find(b => b.innerText.includes('Add to Cart') || b.innerText.includes('Order Now'));
        if (cartBtn) cartBtn.click();
        
        // Wait briefly
        await new Promise(r => setTimeout(r, 500));
        
        // Open cart / checkout
        const cartIcon = document.querySelector('button[aria-label*="Cart"], button:has(.cart-count)');
        // Or check if checkout button exists
        const allBtns = Array.from(document.querySelectorAll('button'));
        const checkoutOpener = allBtns.find(b => b.innerText.includes('Checkout') || b.getAttribute('aria-label')?.includes('Cart'));
        if (checkoutOpener) checkoutOpener.click();

        await new Promise(r => setTimeout(r, 500));

        // Search body text for any mentions of Cash on Delivery
        const bodyText = document.body.innerText;
        const hasCashOnDelivery = bodyText.toLowerCase().includes('cash on delivery') ||
                                  bodyText.toLowerCase().includes('payment on delivery') ||
                                  bodyText.toLowerCase().includes('pay upon delivery');

        return {
          hasCashOnDelivery,
          cartBtnFound: !!cartBtn,
          bodySnippet: hasCashOnDelivery ? 'FOUND cash on delivery' : 'CLEAN: No cash on delivery anywhere in DOM'
        };
      })()
    `,
    awaitPromise: true,
    returnByValue: true
  });

  console.log('DOM Checkout Payment Check:', checkoutTest.result.value);

  ws.close();
  chrome.kill();
  console.log('Verification finished.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
