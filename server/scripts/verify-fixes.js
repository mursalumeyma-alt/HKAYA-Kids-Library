import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

async function main() {
  console.log('Starting headless Chrome for verification...');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--user-data-dir=C:\\Users\\Administrator\\.gemini\\antigravity\\scratch\\chrome-test-profile-2',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1280,1000',
    'http://localhost:5173/'
  ]);

  await new Promise(r => setTimeout(r, 3000));

  const target = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9225/json', res => {
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

  async function captureElement(selector, filename, width = 1280, height = 900) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600
    });
    await new Promise(r => setTimeout(r, 500));

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
    await new Promise(r => setTimeout(r, 600));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filename, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. Check for removed delivery banner anywhere in page text
  const deliveryBannerCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const pageText = document.body.innerText;
        const hasDeliveryBanner = pageText.includes('Delivery Across East Africa • Free on orders above KSh 20,000') ||
                                  pageText.includes('Free delivery on orders above KSh 20,000') ||
                                  pageText.includes('Delivery Across East Africa');
        return {
          hasDeliveryBanner,
          bodySnippetMatch: hasDeliveryBanner ? 'FOUND unwanted delivery text' : 'CLEAN: No unwanted delivery banner text'
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Delivery Banner Check:', deliveryBannerCheck.result.value);

  // 2. Check Customer Care section structure
  const customerCareCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const section = document.querySelector('#customer-care');
        if (!section) return { found: false };
        const headings = Array.from(section.querySelectorAll('h3')).map(h => h.innerText.trim());
        const text = section.innerText;
        const buttons = Array.from(section.querySelectorAll('button')).map(b => b.innerText.trim());
        return {
          found: true,
          headings,
          fullText: text,
          buttonCount: buttons.length,
          buttons,
          hasSecurePayments: text.includes('Secure Payments'),
          hasShopWithConfidence: text.includes('Shop With Confidence'),
          hasPaymentMethods: text.includes('M-Pesa • Mobile Money • Visa • Mastercard'),
          hasDeliveryCard: text.includes('Delivery Across East Africa') || text.includes('Free delivery')
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Customer Care Check:', customerCareCheck.result.value);

  // 3. Check Floating WhatsApp Button & absence of greeting popup
  const whatsappCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const floatingBtn = document.querySelector('a[aria-label*="WhatsApp"], a[title*="WhatsApp"]');
        const greetingPopup = document.body.innerText.includes('Chat with our team on WhatsApp');
        const waLinks = Array.from(document.querySelectorAll('a[href*="wa.me"]')).map(a => a.href);
        return {
          floatingBtnExists: !!floatingBtn,
          floatingBtnHref: floatingBtn?.href,
          hasGreetingPopup: greetingPopup,
          totalWhatsAppLinksOnPage: waLinks.length,
          waLinks
        };
      })()
    `,
    returnByValue: true
  });
  console.log('WhatsApp Button Check:', whatsappCheck.result.value);

  // 4. Check Hero section images
  const heroCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const hero = document.querySelector('section');
        const images = Array.from(hero?.querySelectorAll('img') || []).map(img => ({
          alt: img.alt,
          src: img.src
        }));
        return {
          heroImages: images
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Hero Check:', heroCheck.result.value);

  // Take Screenshots
  // Desktop
  await captureElement('header', 'verify-hero-desktop.png', 1280, 800);
  await captureElement('#customer-care', 'verify-customer-care-desktop.png', 1280, 800);
  await captureElement('footer', 'verify-footer-desktop.png', 1280, 800);

  // Mobile
  await captureElement('header', 'verify-hero-mobile.png', 390, 844);
  await captureElement('#customer-care', 'verify-customer-care-mobile.png', 390, 844);
  await captureElement('footer', 'verify-footer-mobile.png', 390, 844);

  ws.close();
  chrome.kill();
  console.log('Verification completed successfully!');
}

main().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
