import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  if (!fs.existsSync('scratch/excel_dl')) {
    fs.mkdirSync('scratch/excel_dl', { recursive: true });
  }

  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.resolve('scratch/excel_dl')
  });

  const url = 'https://1drv.ms/x/c/5F1FC2D3F1DDF0D9/IQDkyXFlEWRGQrqPwk0J9RP0AWoOYoUvgKVXryZ-Y-w0vg4?e=1VfaGG';
  console.log('Navigating in Edge...');
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 50000 });
  await new Promise(r => setTimeout(r, 8000));

  console.log('Clicking File button (x: 23, y: 70)...');
  await page.mouse.click(23, 70);
  await new Promise(r => setTimeout(r, 2000));

  console.log('Hovering/clicking Export (x: 50, y: 220)...');
  await page.mouse.move(50, 220);
  await new Promise(r => setTimeout(r, 1500));
  await page.mouse.click(50, 220);
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: 'scratch/after_export_click.png' });
  console.log('Saved screenshot to scratch/after_export_click.png');

  // Let's also check if sub-menu items appeared
  const exportItems = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*')).map(el => el.innerText?.trim()).filter(t => t && (t.includes('Download') || t.includes('Copy') || t.includes('Export')));
  });
  console.log('Export items:', exportItems);

  // If there's a download button, click it
  await page.mouse.click(260, 220); // typical submenu position
  await new Promise(r => setTimeout(r, 8000));

  const files = fs.readdirSync('scratch/excel_dl');
  console.log('Files in scratch/excel_dl:', files);

  await browser.close();
})();
