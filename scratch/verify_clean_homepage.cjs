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
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:5175/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Capture Full Desktop Homepage
  const cleanDesktopPath = path.join(artifactDir, 'homepage-clean-desktop.png');
  await page.screenshot({ path: cleanDesktopPath, fullPage: true });
  console.log('Saved clean desktop homepage:', cleanDesktopPath);

  // 2. Check DOM for social elements on homepage
  const domCheck = await page.evaluate(() => {
    const textContent = document.body.innerText;
    const hasFollowHeading = textContent.includes('Follow HKAYA Kids Library');
    const hasFollowSection = Boolean(document.getElementById('follow-hikaya'));
    
    // Check floating bar
    const floatingAside = document.querySelector('aside[aria-label*="Contact and Social Media"]');
    const floatingSocialIcons = Array.from(document.querySelectorAll('aside a, .fixed a'))
      .filter(a => a.href.includes('tiktok.com') || a.href.includes('instagram.com'));

    // Check footer links
    const footerLinks = Array.from(document.querySelectorAll('footer a'))
      .filter(a => a.href.includes('tiktok.com') || a.href.includes('instagram.com'))
      .map(a => ({
        href: a.href,
        target: a.target,
        rel: a.rel,
        text: a.innerText.replace(/\s+/g, ' ').trim()
      }));

    return {
      hasFollowHeading,
      hasFollowSection,
      hasFloatingSocialBar: Boolean(floatingAside),
      floatingSocialCount: floatingSocialIcons.length,
      footerLinks
    };
  });

  console.log('DOM Check Results:', JSON.stringify(domCheck, null, 2));

  // 3. Capture footer focus screenshot
  const footerEl = await page.$('footer');
  if (footerEl) {
    const footerPath = path.join(artifactDir, 'footer-social-verified.png');
    await footerEl.screenshot({ path: footerPath });
    console.log('Saved footer verified screenshot:', footerPath);
  }

  // 4. Capture Mobile Homepage
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await mobilePage.goto('http://127.0.0.1:5175/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  const mobileCleanPath = path.join(artifactDir, 'homepage-clean-mobile.png');
  await mobilePage.screenshot({ path: mobileCleanPath, fullPage: true });
  console.log('Saved clean mobile homepage:', mobileCleanPath);

  // 5. Check Contact Us page
  await page.evaluate(() => {
    const navButtons = Array.from(document.querySelectorAll('nav button, header button'));
    const contactBtn = navButtons.find(b => b.textContent && b.textContent.trim() === 'Contact Us');
    if (contactBtn) contactBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const contactCheck = await page.evaluate(() => {
    const socialLinks = Array.from(document.querySelectorAll('main a'))
      .filter(a => a.href.includes('tiktok.com') || a.href.includes('instagram.com'))
      .map(a => ({
        href: a.href,
        target: a.target,
        rel: a.rel,
        text: a.innerText.replace(/\s+/g, ' ').trim()
      }));
    return socialLinks;
  });

  console.log('Contact Page Social Links:', JSON.stringify(contactCheck, null, 2));

  await browser.close();
  console.log('Verification completed!');
})();
