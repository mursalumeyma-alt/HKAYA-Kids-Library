import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

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

  // Find the excel frame
  let excelFrame = null;
  for (const f of page.frames()) {
    if (f.url().includes('officeapps.live.com') && f.url().includes('excel')) {
      excelFrame = f;
      break;
    }
  }

  if (excelFrame) {
    console.log('Found frame. Clicking File tab...');
    // Click on File tab in excelFrame
    await excelFrame.click('#FileMenuLauncher');
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: 'scratch/excel_file_menu.png' });
    console.log('Screenshot of File menu saved to scratch/excel_file_menu.png');
  } else {
    console.log('Frame not found');
  }

  await browser.close();
})();
