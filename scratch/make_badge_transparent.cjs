const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: edgePath, headless: true });
  const page = await browser.newPage();
  
  const badgeImg = fs.readFileSync('public/images/reference/badge-better-readers.png');
  const b64 = 'data:image/png;base64,' + badgeImg.toString('base64');
  
  await page.setContent(`<img id="img" src="${b64}" /><canvas id="c"></canvas>`);
  await page.waitForSelector('#img');

  const transparentBadgeB64 = await page.evaluate(() => {
    const img = document.getElementById('img');
    const canvas = document.getElementById('c');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Background color is roughly R: 250-255, G: 240-250, B: 230-245
    // The text and rays are orange/brown: R: 180-230, G: 80-140, B: 30-90
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // If high brightness cream/off-white background
      const isCreamBg = (r > 230 && g > 220 && b > 210 && (r - b) < 45);
      if (isCreamBg) {
        data[i + 3] = 0; // Transparent
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
  });

  const b64Out = transparentBadgeB64.split(';base64,').pop();
  fs.writeFileSync('public/images/reference/badge-better-readers.png', b64Out, 'base64');
  console.log('Successfully made badge-better-readers.png transparent!');

  await browser.close();
})();
