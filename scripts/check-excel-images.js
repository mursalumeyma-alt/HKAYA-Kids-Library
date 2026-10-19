import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  const url = 'https://1drv.ms/x/c/5F1FC2D3F1DDF0D9/IQDkyXFlEWRGQrqPwk0J9RP0AWoOYoUvgKVXryZ-Y-w0vg4?e=1VfaGG';
  console.log('Navigating in Edge...');
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 50000 });
  await new Promise(r => setTimeout(r, 8000));

  let excelFrame = null;
  for (const f of page.frames()) {
    if (f.url().includes('officeapps.live.com') && f.url().includes('excel')) {
      excelFrame = f;
      break;
    }
  }

  if (excelFrame) {
    const data = await excelFrame.evaluate(() => {
      // Find all image tags in the entire document
      const allImgs = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src?.slice(0, 100),
        w: img.naturalWidth || img.width,
        h: img.naturalHeight || img.height,
        alt: img.alt
      }));

      // Find floating objects or shapes
      const floatingObjects = Array.from(document.querySelectorAll('[id*="shape"], [id*="image"], [class*="floating"], [class*="image"], [class*="picture"]')).map(el => ({
        tag: el.tagName,
        id: el.id,
        cls: el.className
      }));

      return { allImgs, floatingObjects };
    });

    console.log('Images in Excel frame:', data.allImgs);
    console.log('Floating objects count:', data.floatingObjects.length);
  }

  await browser.close();
})();
