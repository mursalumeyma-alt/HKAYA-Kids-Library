const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: edgePath, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:5173');

  const data = await page.evaluate(() => {
    const link = document.querySelector('a[aria-label="Contact Hikaya Kids Library on WhatsApp"]');
    const container = link ? link.parentElement : null;
    return {
      windowWidth: window.innerWidth,
      docClientWidth: document.documentElement.clientWidth,
      containerRect: container ? container.getBoundingClientRect() : null,
      containerComputedRight: container ? window.getComputedStyle(container).right : null,
      linkRect: link ? link.getBoundingClientRect() : null,
      linkComputedWidth: link ? window.getComputedStyle(link).width : null
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
