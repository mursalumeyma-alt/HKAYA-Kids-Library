const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: edgePath, headless: true });
  const page = await browser.newPage();
  const allBadgesImg = fs.readFileSync('public/images/reference/payment-all-badges.png');
  const b64 = 'data:image/png;base64,' + allBadgesImg.toString('base64');
  await page.setContent(`<img id="img" src="${b64}" /><canvas id="c"></canvas>`);
  await page.waitForSelector('#img');

  const crops = [
    { name: 'payment-mpesa.png', x: 7, y: 3, w: 47, h: 24 },
    { name: 'payment-pesapal.png', x: 59, y: 3, w: 68, h: 24 },
    { name: 'payment-visa.png', x: 7, y: 31, w: 40, h: 20 },
    { name: 'payment-mastercard.png', x: 52, y: 31, w: 32, h: 20 },
  ];

  for (const c of crops) {
    const dataUrl = await page.evaluate((c) => {
      const img = document.getElementById('img');
      const canvas = document.getElementById('c');
      canvas.width = c.w;
      canvas.height = c.h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);
      return canvas.toDataURL('image/png');
    }, c);

    const b64Out = dataUrl.split(';base64,').pop();
    fs.writeFileSync(path.join('public/images/reference', c.name), b64Out, 'base64');
    console.log(`Cropped: ${c.name}`);
  }

  await browser.close();
})();
