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

  // 1. Desktop full homepage
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:5175/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  const desktopHomepage = path.join(artifactDir, 'social-homepage-desktop.png');
  await page.screenshot({ path: desktopHomepage, fullPage: true });
  console.log('Saved full desktop homepage:', desktopHomepage);

  // 2. Focused screenshot of the Follow HKAYA Kids Library section
  await page.waitForSelector('#follow-hikaya', { timeout: 10000 });
  const socialEl = await page.$('#follow-hikaya');
  if (socialEl) {
    const socialSectionFocus = path.join(artifactDir, 'social-section-focus.png');
    await socialEl.screenshot({ path: socialSectionFocus });
    console.log('Saved social section focus (element crop):', socialSectionFocus);
  }

  // 3. Scroll to footer to capture footer social links
  const footerEl = await page.$('footer');
  if (footerEl) {
    const footerFocus = path.join(artifactDir, 'social-footer-focus.png');
    await footerEl.screenshot({ path: footerFocus });
    console.log('Saved footer focus (element crop):', footerFocus);
  }

  // 4. Mobile screenshot of social section
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await mobilePage.goto('http://127.0.0.1:5175/', { waitUntil: 'networkidle0', timeout: 30000 });
  
  await mobilePage.waitForSelector('#follow-hikaya', { timeout: 10000 });
  const mobileSocialEl = await mobilePage.$('#follow-hikaya');
  if (mobileSocialEl) {
    const mobileSocialFocus = path.join(artifactDir, 'social-mobile-focus.png');
    await mobileSocialEl.screenshot({ path: mobileSocialFocus });
    console.log('Saved mobile social focus (element crop):', mobileSocialFocus);
  }

  // 5. Contact page with social links
  await page.goto('http://127.0.0.1:5175/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const navButtons = Array.from(document.querySelectorAll('nav button, header button'));
    const contactBtn = navButtons.find(b => b.textContent && b.textContent.trim() === 'Contact Us');
    if (contactBtn) contactBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  const contactScreenshot = path.join(artifactDir, 'social-contact-view.png');
  await page.screenshot({ path: contactScreenshot, fullPage: true });
  console.log('Saved contact view screenshot:', contactScreenshot);

  await browser.close();
  console.log('All social screenshots captured successfully!');
})();
