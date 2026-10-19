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
    // 1. Hero Children Photo
    { name: 'hero-children.jpg', x: 535, y: 75, w: 450, h: 215 },
    
    // 2. The 7 Categories:
    // Total row is from x=60 to x=964 (about 904px wide). 904 / 7 = ~129px per slot!
    { name: 'cat-books.png', x: 60, y: 300, w: 120, h: 108 },
    { name: 'cat-stationery.png', x: 193, y: 300, w: 120, h: 108 },
    { name: 'cat-school-bags.png', x: 326, y: 300, w: 120, h: 108 },
    { name: 'cat-lunch-boxes.png', x: 458, y: 300, w: 120, h: 108 },
    { name: 'cat-toys.png', x: 590, y: 300, w: 120, h: 108 },
    { name: 'cat-gifts.png', x: 722, y: 300, w: 120, h: 108 },
    { name: 'cat-reading-acc.png', x: 852, y: 300, w: 120, h: 108 },

    // 3. Just the product images inside each category (without the card border/text):
    { name: 'cat-prod-books.png', x: 70, y: 310, w: 100, h: 65 },
    { name: 'cat-prod-stationery.png', x: 203, y: 310, w: 100, h: 65 },
    { name: 'cat-prod-school-bags.png', x: 336, y: 310, w: 100, h: 65 },
    { name: 'cat-prod-lunch-boxes.png', x: 468, y: 310, w: 100, h: 65 },
    { name: 'cat-prod-toys.png', x: 600, y: 310, w: 100, h: 65 },
    { name: 'cat-prod-gifts.png', x: 732, y: 310, w: 100, h: 65 },
    { name: 'cat-prod-reading-acc.png', x: 862, y: 310, w: 100, h: 65 },

    // 4. About Hikaya "Read Learn Grow" Books Stack
    { name: 'about-books-stack.jpg', x: 66, y: 435, w: 312, h: 105 },

    // 5. Hikaya Logo
    { name: 'hikaya-sun-logo.png', x: 80, y: 25, w: 135, h: 42 }
  ];

  for (const c of crops) {
    const dataUrl = await page.evaluate((c) => {
      const img = document.getElementById('img');
      const canvas = document.getElementById('c');
      canvas.width = c.w;
      canvas.height = c.h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);
      return canvas.toDataURL(c.name.endsWith('.png') ? 'image/png' : 'image/jpeg', 0.95);
    }, c);

    const b64 = dataUrl.split(';base64,').pop();
    fs.writeFileSync(path.join(outputDir, c.name), b64, 'base64');
    console.log(`Cropped: ${c.name}`);
  }

  await browser.close();
  console.log('All crops completed successfully.');
})();
