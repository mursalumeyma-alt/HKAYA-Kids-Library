const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: edgePath, headless: true });
  const page = await browser.newPage();
  const footerImg = fs.readFileSync('public/images/reference/reference-footer.jpg');
  const b64 = 'data:image/jpeg;base64,' + footerImg.toString('base64');
  await page.setContent(`<img id="img" src="${b64}" /><canvas id="c"></canvas>`);
  await page.waitForSelector('#img');
  const dims = await page.evaluate(() => {
    const img = document.getElementById('img');
    return { w: img.naturalWidth, h: img.naturalHeight };
  });
  console.log('Footer dimensions:', dims);
  await browser.close();
})();
