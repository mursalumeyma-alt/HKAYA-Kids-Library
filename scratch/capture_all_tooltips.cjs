const puppeteer = require('puppeteer-core');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\38a965c7-b7e8-4a02-b66c-f0270195c951';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Desktop (1280 x 850)
  await page.setViewport({ width: 1280, height: 850 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Hover over Instagram
  await page.hover('a[aria-label="Follow us on Instagram"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'floating-social-instagram-hover.png') });

  // Hover over TikTok
  await page.hover('a[aria-label="Follow us on TikTok"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artifactDir, 'floating-social-tiktok-hover.png') });

  // Clean Mobile Viewport without scrollbar offset (emulate iPhone 14 Pro 393 x 852)
  await page.emulate({
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(artifactDir, 'floating-social-mobile-device.png') });

  await browser.close();
  console.log('Screenshots generated successfully.');
})();
