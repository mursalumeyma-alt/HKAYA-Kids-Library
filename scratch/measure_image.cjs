const puppeteer = require('puppeteer-core');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const inputImagePath = 'C:/Users/Administrator/.gemini/antigravity/brain/38a965c7-b7e8-4a02-b66c-f0270195c951/.user_uploaded/media_1792341100095_c076f50f.jpg';
const imgBuffer = fs.readFileSync(inputImagePath);
const base64Data = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; background: #222;">
        <canvas id="c"></canvas>
        <img id="img" src="${base64Data}" />
      </body>
    </html>
  `);

  await page.waitForSelector('#img');
  await page.evaluate(() => new Promise(r => {
    const img = document.getElementById('img');
    if (img.complete) r(); else img.onload = r;
  }));

  // Let's sample colors down the vertical center to find row boundaries
  const yData = await page.evaluate(() => {
    const img = document.getElementById('img');
    const canvas = document.getElementById('c');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const samples = [];
    for (let y = 0; y < img.naturalHeight; y += 10) {
      const p = ctx.getImageData(500, y, 1, 1).data;
      samples.push({ y, r: p[0], g: p[1], b: p[2] });
    }
    return samples;
  });

  console.log('Sampled vertical profile:', JSON.stringify(yData.slice(0, 30)));
  console.log('Sampled vertical profile (middle to end):', JSON.stringify(yData.slice(30)));

  await browser.close();
})();
