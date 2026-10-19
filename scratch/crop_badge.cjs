const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const inputImagePath = 'C:/Users/Administrator/.gemini/antigravity/brain/38a965c7-b7e8-4a02-b66c-f0270195c951/.user_uploaded/media_1792341100095_c076f50f.jpg';
const outputDir = path.resolve(__dirname, '../public/images/reference');

const imgBuffer = fs.readFileSync(inputImagePath);
const base64Data = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

(async () => {
  const browser = await puppeteer.launch({ executablePath: edgePath, headless: true });
  const page = await browser.newPage();
  await page.setContent(`<img id="img" src="${base64Data}" /><canvas id="c"></canvas>`);
  await page.waitForSelector('#img');

  const crops = [
    { name: 'badge-better-readers.png', x: 810, y: 430, w: 125, h: 105 }
  ];

  for (const c of crops) {
    const dataUrl = await page.evaluate((c) => {
      const img = document.getElementById('img');
      const canvas = document.getElementById('c');
      canvas.width = c.w;
      canvas.height = c.h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);
      return canvas.toDataURL('image/png', 0.95);
    }, c);

    const b64 = dataUrl.split(';base64,').pop();
    fs.writeFileSync(path.join(outputDir, c.name), b64, 'base64');
    console.log(`Cropped: ${c.name}`);
  }

  await browser.close();
})();
