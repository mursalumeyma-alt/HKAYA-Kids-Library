import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

async function main() {
  console.log('Starting headless Chrome...');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--user-data-dir=C:\\Users\\Administrator\\.gemini\\antigravity\\scratch\\chrome-test-profile',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1280,1000',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 3000));

  // Get debug websocket
  const target = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9224/json', res => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => {
        const list = JSON.parse(buf);
        resolve(list.find(t => t.type === 'page'));
      });
    }).on('error', reject);
  });

  console.log('Connecting to DevTools WS:', target.webSocketDebuggerUrl);
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

  // Wait for React hydration
  await new Promise(r => setTimeout(r, 2000));

  // Helper to scroll to element and capture screenshot
  async function captureElement(selector, filename, width = 1280, height = 900) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600
    });
    await new Promise(r => setTimeout(r, 500));

    // Scroll element into view precisely
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('${selector}');
          if (el) {
            const rect = el.getBoundingClientRect();
            window.scrollTo(0, window.pageYOffset + rect.top - 80);
          }
        })()
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filename, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. Desktop: Customer Care section
  await captureElement('#customer-care', 'screenshot-customer-care-desktop.png', 1280, 800);

  // 2. Desktop: WhatsApp Guidance Banner
  await captureElement('#whatsapp-banner', 'screenshot-whatsapp-banner-desktop.png', 1280, 800);

  // 3. Desktop: Order-Ready CTA section
  await captureElement('#order-ready-cta', 'screenshot-order-cta-desktop.png', 1280, 800);

  // 4. Mobile: Customer Care section
  await captureElement('#customer-care', 'screenshot-customer-care-mobile.png', 390, 844);

  // 5. Mobile: WhatsApp Guidance Banner
  await captureElement('#whatsapp-banner', 'screenshot-whatsapp-banner-mobile.png', 390, 844);

  // 6. Mobile: Order-Ready CTA section
  await captureElement('#order-ready-cta', 'screenshot-order-cta-mobile.png', 390, 844);

  // Check WhatsApp banner elements
  const waCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const banner = document.querySelector('#whatsapp-banner');
        const link = banner?.querySelector('a');
        return {
          bannerExists: !!banner,
          bannerText: banner?.innerText,
          href: link?.getAttribute('href'),
          target: link?.getAttribute('target')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('WhatsApp Banner Element Check:', waCheck.result.value);

  // 5. Test Click on CTA button to verify clickability
  const clickRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const ctaBtn = document.querySelector('#order-ready-cta button');
        if (!ctaBtn) return { error: 'No CTA button found' };
        ctaBtn.click();
        return { success: true, text: ctaBtn.innerText };
      })()
    `,
    returnByValue: true
  });
  console.log('CTA Button Click Result:', clickRes.result.value);

  await new Promise(r => setTimeout(r, 800));

  // Verify current page state after clicking CTA button
  const pageState = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          h1: document.querySelector('h1')?.innerText || '',
          url: window.location.href,
          shopHeader: document.querySelector('h1, h2')?.innerText || ''
        };
      })()
    `,
    returnByValue: true
  });
  console.log('After CTA Click page state:', pageState.result.value);

  ws.close();
  chrome.kill();
  console.log('Verification script completed.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
