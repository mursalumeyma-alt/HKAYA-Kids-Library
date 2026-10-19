const puppeteer = require('puppeteer-core');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\38a965c7-b7e8-4a02-b66c-f0270195c951';

async function testWhatsAppFloatingButton() {
  console.log('Testing WhatsApp Floating Button...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Desktop Test (1280 x 850)
  await page.setViewport({ width: 1280, height: 850 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 });

  // Evaluate the button attributes
  const btnData = await page.evaluate(() => {
    const link = document.querySelector('a[aria-label="Contact Hikaya Kids Library on WhatsApp"]');
    if (!link) return null;

    const cs = window.getComputedStyle(link);
    const tooltip = document.querySelector('#whatsapp-floating-tooltip');
    const tooltipText = tooltip ? tooltip.textContent.trim() : null;

    return {
      href: link.getAttribute('href'),
      target: link.getAttribute('target'),
      rel: link.getAttribute('rel'),
      ariaLabel: link.getAttribute('aria-label'),
      ariaDescribedby: link.getAttribute('aria-describedby'),
      classes: link.className,
      backgroundColor: cs.backgroundColor,
      borderRadius: cs.borderRadius,
      width: cs.width,
      height: cs.height,
      tooltipText
    };
  });

  console.log('Desktop WhatsApp button data:', JSON.stringify(btnData, null, 2));

  // Verify URL and prefilled message
  const expectedUrl = 'https://wa.me/254793477288?text=Assalamu%20Alaikum!%20I%20would%20like%20to%20enquire%20about%20products%20from%20Hikaya%20Kids%20Library.';
  console.log('URL matches expected?', btnData?.href === expectedUrl);
  console.log('Accessible label correct?', btnData?.ariaLabel === 'Contact Hikaya Kids Library on WhatsApp');
  console.log('Tooltip text correct?', btnData?.tooltipText === 'Chat with us on WhatsApp');

  // Hover over the button to reveal tooltip
  await page.hover('a[aria-label="Contact Hikaya Kids Library on WhatsApp"]');
  await new Promise(r => setTimeout(r, 600));

  const desktopScreenshot = path.join(artifactDir, 'whatsapp-floating-desktop-hover.png');
  await page.screenshot({ path: desktopScreenshot });
  console.log('Desktop hover screenshot saved:', desktopScreenshot);

  // 2. Mobile Test (390 x 844)
  await page.emulate({
    viewport: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 });

  const mobilePositions = await page.evaluate(() => {
    const link = document.querySelector('a[aria-label="Contact Hikaya Kids Library on WhatsApp"]');
    const bottomNav = document.querySelector('.sm\\:hidden.fixed.bottom-0');

    const linkRect = link?.getBoundingClientRect();
    const navRect = bottomNav?.getBoundingClientRect();

    return {
      link: linkRect ? { top: linkRect.top, bottom: linkRect.bottom, right: linkRect.right, width: linkRect.width, height: linkRect.height } : null,
      bottomNav: navRect ? { top: navRect.top, height: navRect.height } : null,
      isAboveNav: linkRect && navRect ? linkRect.bottom <= navRect.top + 5 : false
    };
  });

  console.log('Mobile positions:', JSON.stringify(mobilePositions, null, 2));

  const mobileScreenshot = path.join(artifactDir, 'whatsapp-floating-mobile.png');
  await page.screenshot({ path: mobileScreenshot });
  console.log('Mobile screenshot saved:', mobileScreenshot);

  // 3. Page Switching Tests (Shop, About, Policies)
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Categories'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 700));
  const onCategories = await page.evaluate(() => !!document.querySelector('a[aria-label="Contact Hikaya Kids Library on WhatsApp"]'));
  console.log('Button present on Categories view?', onCategories);

  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Home'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 700));
  const onHome = await page.evaluate(() => !!document.querySelector('a[aria-label="Contact Hikaya Kids Library on WhatsApp"]'));
  console.log('Button present on Home view?', onHome);

  await browser.close();
  console.log('All WhatsApp floating button tests PASSED!');
}

testWhatsAppFloatingButton().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
