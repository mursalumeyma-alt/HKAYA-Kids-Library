const puppeteer = require('puppeteer-core');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\38a965c7-b7e8-4a02-b66c-f0270195c951';

async function run() {
  console.log('Launching Edge browser for mobile viewport test...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

    await page.goto('http://127.0.0.1:5175/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));

    // Open Checkout Modal directly
    await page.evaluate(() => {
      if (window.__openCheckout) {
        window.__openCheckout();
      }
    });

    await page.waitForSelector('input[name="fullName"]', { visible: true, timeout: 8000 });

    await page.click('input[name="fullName"]');
    await page.type('input[name="fullName"]', 'Amina Hassan');

    await page.click('input[name="email"]');
    await page.type('input[name="email"]', 'amina@example.com');

    await page.click('input[name="phone"]');
    await page.type('input[name="phone"]', '0712345678');

    await page.click('input[name="city"]');
    await page.type('input[name="city"]', 'Kilimani, Nairobi');

    await new Promise(r => setTimeout(r, 500));

    await page.evaluate(() => {
      const continueBtn = Array.from(document.querySelectorAll('button')).find(b => 
        b.textContent.includes('Continue to Payment Method')
      );
      if (continueBtn) continueBtn.click();
    });

    await new Promise(r => setTimeout(r, 1200));

    const checkoutMobileScreenshotPath = path.join(ARTIFACT_DIR, 'checkout-payment-step-mobile.png');
    await page.screenshot({ path: checkoutMobileScreenshotPath });
    console.log('Saved mobile checkout screenshot:', checkoutMobileScreenshotPath);

  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('Mobile test run failed:', err);
  process.exit(1);
});
