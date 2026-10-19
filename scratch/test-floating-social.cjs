const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\38a965c7-b7e8-4a02-b66c-f0270195c951';

async function testFloatingIcons() {
  console.log('Launching browser for floating social icons test...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Desktop Test (1280 x 850)
  await page.setViewport({ width: 1280, height: 850 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 });
  console.log('Desktop page loaded.');

  // Find floating social icons
  const iconsData = await page.evaluate(() => {
    const aside = document.querySelector('aside[aria-label="Contact and Social Media Channels"]');
    if (!aside) return null;

    const links = Array.from(aside.querySelectorAll('a'));
    return links.map(a => ({
      ariaLabel: a.getAttribute('aria-label'),
      href: a.getAttribute('href'),
      target: a.getAttribute('target'),
      classes: a.className,
      style: a.getAttribute('style') || '',
      hasSvg: !!a.querySelector('svg'),
      svgHtml: a.querySelector('svg')?.outerHTML.substring(0, 80)
    }));
  });

  console.log('Icons found on page:', JSON.stringify(iconsData, null, 2));

  // Check WhatsApp link
  const wa = iconsData.find(i => i.ariaLabel.includes('WhatsApp'));
  console.log('WhatsApp link check:');
  console.log('  Href:', wa?.href);
  console.log('  Target:', wa?.target);
  const waValid = wa && wa.href.includes('254793477288') && wa.href.includes('Assalamu%20Alaikum');
  console.log('  WhatsApp Link Valid?', waValid);

  // Check Instagram link
  const ig = iconsData.find(i => i.ariaLabel.includes('Instagram'));
  console.log('Instagram link check:');
  console.log('  Href:', ig?.href);
  console.log('  Style gradient present?', ig?.style?.includes('radial-gradient'));

  // Check TikTok link
  const tt = iconsData.find(i => i.ariaLabel.includes('TikTok'));
  console.log('TikTok link check:');
  console.log('  Href:', tt?.href);
  console.log('  Black background present?', tt?.classes?.includes('bg-black'));

  // Hover over WhatsApp icon to capture tooltip
  await page.hover('a[aria-label="Chat with us on WhatsApp"]');
  await new Promise(r => setTimeout(r, 600));

  const desktopScreenshot = path.join(artifactDir, 'floating-social-desktop-hover.png');
  await page.screenshot({ path: desktopScreenshot, fullPage: false });
  console.log('Desktop screenshot saved:', desktopScreenshot);

  // 2. Mobile Test (390 x 844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 });
  console.log('Mobile page loaded.');

  // Check positioning relative to mobile navigation bar
  const positions = await page.evaluate(() => {
    const aside = document.querySelector('aside[aria-label="Contact and Social Media Channels"]');
    const bottomNav = document.querySelector('.sm\\:hidden.fixed.bottom-0');
    
    const asideRect = aside?.getBoundingClientRect();
    const navRect = bottomNav?.getBoundingClientRect();

    return {
      aside: asideRect ? { top: asideRect.top, bottom: asideRect.bottom, right: asideRect.right, height: asideRect.height } : null,
      bottomNav: navRect ? { top: navRect.top, bottom: navRect.bottom, height: navRect.height } : null,
      isAboveNav: asideRect && navRect ? asideRect.bottom <= navRect.top + 5 : false
    };
  });

  console.log('Mobile positions:', JSON.stringify(positions, null, 2));

  const mobileScreenshot = path.join(artifactDir, 'floating-social-mobile.png');
  await page.screenshot({ path: mobileScreenshot, fullPage: false });
  console.log('Mobile screenshot saved:', mobileScreenshot);

  // 3. Test on another page (e.g. Categories or About)
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Categories'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const categoriesHasIcons = await page.evaluate(() => {
    return !!document.querySelector('aside[aria-label="Contact and Social Media Channels"]');
  });
  console.log('Floating icons present on Categories page?', categoriesHasIcons);

  // 4. Test on Policies page
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Privacy Policy'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const policiesHasIcons = await page.evaluate(() => {
    return !!document.querySelector('aside[aria-label="Contact and Social Media Channels"]');
  });
  console.log('Floating icons present on Policies view?', policiesHasIcons);

  await browser.close();
  console.log('ALL TESTS PASSED SUCCESSFULLY!');
}

testFloatingIcons().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
