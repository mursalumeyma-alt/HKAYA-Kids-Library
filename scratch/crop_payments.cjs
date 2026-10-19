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

  // Let's crop the whole payment badges area and the 4 individual cards
  // The cards are roughly x: 808, y: 55, w: 135, h: 55
  const crops = [
    { name: 'payment-all-badges.png', x: 800, y: 50, w: 145, h: 60 },
    { name: 'payment-mpesa.png', x: 806, y: 53, w: 58, h: 25 },
    { name: 'payment-pesapal.png', x: 870, y: 53, w: 58, h: 25 },
    { name: 'payment-visa.png', x: 806, y: 83, w: 45, h: 22 },
    { name: 'payment-mastercard.png', x: 855, y: 83, w: 45, h: 22 },
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
