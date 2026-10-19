const fs = require('fs');
const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({ executablePath: edgePath, headless: true });
  const page = await browser.newPage();
  const imgBuffer = fs.readFileSync('C:/Users/Administrator/.gemini/antigravity/brain/38a965c7-b7e8-4a02-b66c-f0270195c951/.user_uploaded/media_1792341100095_c076f50f.jpg');
  const b64 = 'data:image/jpeg;base64,' + imgBuffer.toString('base64');
  await page.setContent(`<img id="img" src="${b64}" /><canvas id="c"></canvas>`);
  await page.waitForSelector('#img');

  const colors = await page.evaluate(() => {
    const img = document.getElementById('img');
    const canvas = document.getElementById('c');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const getHex = (x, y) => {
      const p = ctx.getImageData(x, y, 1, 1).data;
      return '#' + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1);
    };

    return {
      heroBg: getHex(100, 150),
      catBg: getHex(100, 310),
      aboutBg: getHex(500, 470),
      footerBg: getHex(500, 600),
      subfooterBg: getHex(500, 660),
      cardBorder: getHex(61, 350)
    };
  });

  console.log('Sampled colors:', colors);
  await browser.close();
})();
