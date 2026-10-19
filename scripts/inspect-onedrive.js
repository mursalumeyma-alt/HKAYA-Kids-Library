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
  
  if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch', { recursive: true });
  }

  // Set download behavior
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.resolve('scratch')
  });

  page.on('response', async (res) => {
    const u = res.url();
    const ct = res.headers()['content-type'] || '';
    const cd = res.headers()['content-disposition'] || '';
    if (u.includes('download') || u.includes('xlsx') || cd.includes('attachment') || ct.includes('spreadsheet') || ct.includes('octet-stream')) {
      console.log('INTERESTING RESPONSE:', res.status(), u.slice(0, 100), ct, cd);
      try {
        const buf = await res.buffer();
        console.log('Buffer size:', buf.length);
        if (buf.length > 5000) {
          fs.writeFileSync('scratch/downloaded_from_network.xlsx', buf);
          console.log('SAVED TO scratch/downloaded_from_network.xlsx!');
        }
      } catch (e) {
        console.log('Buffer error:', e.message);
      }
    }
  });

  const url = 'https://1drv.ms/x/c/5F1FC2D3F1DDF0D9/IQDkyXFlEWRGQrqPwk0J9RP0AWoOYoUvgKVXryZ-Y-w0vg4?e=1VfaGG';
  console.log('Navigating to OneDrive...');
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 40000 });
  await new Promise(r => setTimeout(r, 6000));
  
  console.log('Page frames:', page.frames().length);
  for (const f of page.frames()) {
    console.log('\n--- Frame:', f.url().slice(0, 120));
    try {
      const items = await f.evaluate(() => {
        return Array.from(document.querySelectorAll('button, a, [role="button"], [role="menuitem"], [data-automation-id]')).map(el => ({
          tag: el.tagName,
          text: el.innerText.trim(),
          aria: el.getAttribute('aria-label'),
          dataId: el.getAttribute('data-automation-id'),
          href: el.getAttribute('href')
        })).filter(x => x.text || x.aria || x.dataId);
      });
      console.log('Items found in frame (' + items.length + '):');
      items.forEach(it => console.log('  ', it));
    } catch(e) {
      console.log('Frame eval error:', e.message);
    }
  }

  await browser.close();
})();
