const puppeteer = require('puppeteer-core');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\38a965c7-b7e8-4a02-b66c-f0270195c951';

async function run() {
  console.log('Launching Edge browser...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

    // 1. Check Policies / Payment Options page
    console.log('Navigating to preview server at http://127.0.0.1:5175 ...');
    await page.goto('http://127.0.0.1:5175/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));

    console.log('Navigating to Payment Options policy section...');
    await page.evaluate(() => {
      const footerButtons = Array.from(document.querySelectorAll('footer button'));
      const paymentBtn = footerButtons.find(b => b.textContent.includes('Payment Options'));
      if (paymentBtn) {
        paymentBtn.click();
      }
    });

    await new Promise(r => setTimeout(r, 1500));

    // Scroll to payments section and screenshot
    await page.evaluate(() => {
      const el = document.getElementById('payments');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 800));

    const policyScreenshotPath = path.join(ARTIFACT_DIR, 'payment-policy-page.png');
    await page.screenshot({ path: policyScreenshotPath });
    console.log('Saved policy screenshot:', policyScreenshotPath);

    // 2. Test Checkout Modal Step 2
    console.log('Testing Checkout Modal Step 2 (Payment Screen)...');
    await page.evaluate(() => {
      if (window.__openCheckout) {
        window.__openCheckout();
      }
    });

    await page.waitForSelector('input[name="fullName"]', { visible: true, timeout: 8000 });

    console.log('Filling Step 1 checkout form...');
    await page.click('input[name="fullName"]');
    await page.type('input[name="fullName"]', 'Amina Hassan');

    await page.click('input[name="email"]');
    await page.type('input[name="email"]', 'amina@example.com');

    await page.click('input[name="phone"]');
    await page.type('input[name="phone"]', '0712345678');

    await page.click('input[name="city"]');
    await page.type('input[name="city"]', 'Kilimani, Nairobi');

    await new Promise(r => setTimeout(r, 600));

    // Click Continue to Payment Method
    console.log('Clicking Continue to Payment Method...');
    await page.evaluate(() => {
      const continueBtn = Array.from(document.querySelectorAll('button')).find(b => 
        b.textContent.includes('Continue to Payment Method')
      );
      if (continueBtn) continueBtn.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    // Verify Step 2 is active and check for the 4 payment logos
    const checkoutLogos = await page.evaluate(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      if (!modal) return { foundModal: false };
      
      const imgs = Array.from(modal.querySelectorAll('img')).map(img => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt')
      }));

      const hasMpesa = imgs.some(i => i.src && i.src.includes('payment-mpesa.png'));
      const hasPesapal = imgs.some(i => i.src && i.src.includes('payment-pesapal.png'));
      const hasVisa = imgs.some(i => i.src && i.src.includes('payment-visa.png'));
      const hasMastercard = imgs.some(i => i.src && i.src.includes('payment-mastercard.png'));

      const isStep2 = modal.innerText.includes('Step 2: Select Payment Method') || 
                      modal.innerText.includes('Accepted Payment Methods');

      return {
        foundModal: true,
        isStep2,
        hasMpesa,
        hasPesapal,
        hasVisa,
        hasMastercard,
        imgs
      };
    });

    console.log('Checkout Step 2 payment logos check:', JSON.stringify(checkoutLogos, null, 2));

    const checkoutScreenshotPath = path.join(ARTIFACT_DIR, 'checkout-payment-step.png');
    await page.screenshot({ path: checkoutScreenshotPath });
    console.log('Saved checkout screenshot:', checkoutScreenshotPath);

    console.log('ALL CHECKS FINISHED SUCCESSFULLY.');
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
