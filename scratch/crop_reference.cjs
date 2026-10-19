const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const inputImagePath = 'C:/Users/Administrator/.gemini/antigravity/brain/38a965c7-b7e8-4a02-b66c-f0270195c951/.user_uploaded/media_1792341100095_c076f50f.jpg';
const outputDir = path.resolve(__dirname, '../public/images/reference');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert input image to base64 data URL
const imgBuffer = fs.readFileSync(inputImagePath);
const base64Data = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

async function cropImages() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  // Load an HTML page with canvas
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; background: #fff;">
        <canvas id="cropCanvas"></canvas>
        <img id="sourceImg" src="${base64Data}" />
      </body>
    </html>
  `);

  await page.waitForSelector('#sourceImg');
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const img = document.getElementById('sourceImg');
      if (img.complete) resolve();
      else img.onload = resolve;
    });
  });

  console.log('Source image loaded in canvas page.');

  // Crop definitions relative to 1024 x 682
  // Let's refine these crops:
  const crops = [
    {
      name: 'hero-children-reading.jpg',
      x: 535,
      y: 110,
      width: 485,
      height: 310
    },
    {
      name: 'cat-books-reading.png',
      x: 60,
      y: 440,
      width: 120,
      height: 155
    },
    {
      name: 'cat-stationery.png',
      x: 193,
      y: 440,
      width: 120,
      height: 155
    },
    {
      name: 'cat-school-bags.png',
      x: 326,
      y: 440,
      width: 120,
      height: 155
    },
    {
      name: 'cat-lunch-boxes.png',
      x: 458,
      y: 440,
      width: 120,
      height: 155
    },
    {
      name: 'cat-educational-toys.png',
      x: 590,
      y: 440,
      width: 120,
      height: 155
    },
    {
      name: 'cat-gifts-accessories.png',
      x: 722,
      y: 440,
      width: 120,
      height: 155
    },
    {
      name: 'cat-reading-accessories.png',
      x: 852,
      y: 440,
      width: 120,
      height: 155
    },
    {
      name: 'about-read-learn-grow.jpg',
      x: 65,
      y: 635,
      width: 315,
      height: 160 // wait, let's see total image height
    }
  ];

  const imgInfo = await page.evaluate(() => {
    const img = document.getElementById('sourceImg');
    return { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
  });
  console.log('Source image dimensions:', imgInfo);

  for (const crop of crops) {
    // If y + height exceeds naturalHeight, clamp it
    const cropH = Math.min(crop.height, imgInfo.naturalHeight - crop.y);
    if (cropH <= 0) continue;

    const croppedBase64 = await page.evaluate((c, actualH) => {
      const img = document.getElementById('sourceImg');
      const canvas = document.getElementById('cropCanvas');
      canvas.width = c.width;
      canvas.height = actualH;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, c.width, actualH);
      ctx.drawImage(img, c.x, c.y, c.width, actualH, 0, 0, c.width, actualH);
      return canvas.toDataURL(c.name.endsWith('.png') ? 'image/png' : 'image/jpeg', 0.95);
    }, crop, cropH);

    const base64Image = croppedBase64.split(';base64,').pop();
    const outPath = path.join(outputDir, crop.name);
    fs.writeFileSync(outPath, base64Image, { encoding: 'base64' });
    console.log(`Saved: ${crop.name} (${crop.width}x${cropH})`);
  }

  await browser.close();
}

cropImages().catch(err => {
  console.error(err);
  process.exit(1);
});
