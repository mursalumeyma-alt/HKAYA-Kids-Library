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
  console.log('Navigating to spreadsheet in Edge...');
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 50000 });
  await new Promise(r => setTimeout(r, 8000));

  await page.screenshot({ path: 'scratch/excel_online_screen.png' });
  console.log('Saved screenshot to scratch/excel_online_screen.png');

  // Let's check all frames and their top header buttons
  for (let i = 0; i < page.frames().length; i++) {
    const f = page.frames()[i];
    console.log(`Frame ${i}: ${f.url().slice(0, 80)}`);
    const elements = await f.evaluate(() => {
      return Array.from(document.querySelectorAll('*')).filter(el => {
        const text = el.innerText?.trim();
        const aria = el.getAttribute('aria-label');
        return (text && (text === 'File' || text === 'Download' || text.includes('Download'))) ||
               (aria && (aria === 'File' || aria.includes('Download') || aria.includes('Save')));
      }).map(el => ({
        tag: el.tagName,
        id: el.id,
        className: el.className,
        text: el.innerText?.trim(),
        aria: el.getAttribute('aria-label')
      }));
    });
    console.log('Elements in Frame ' + i + ':', elements);
  }

  await browser.close();
})();
