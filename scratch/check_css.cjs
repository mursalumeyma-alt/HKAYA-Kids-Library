const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173');

  const info = await page.evaluate(() => {
    const aside = document.querySelector('aside[aria-label="Contact and Social Media Channels"]');
    const cs = window.getComputedStyle(aside);
    const link = aside.querySelector('a');
    const asideRect = aside.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    return {
      windowWidth: window.innerWidth,
      asideComputedRight: cs.right,
      asideRect: {
        left: asideRect.left,
        right: asideRect.right,
        width: asideRect.width
      },
      linkRect: {
        left: linkRect.left,
        right: linkRect.right,
        width: linkRect.width
      }
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
