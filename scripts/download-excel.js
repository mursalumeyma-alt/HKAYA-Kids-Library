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
  
  if (!fs.existsSync('scratch/excel')) {
    fs.mkdirSync('scratch/excel', { recursive: true });
  }

  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.resolve('scratch/excel')
  });

  const url = 'https://1drv.ms/x/c/5F1FC2D3F1DDF0D9/IQDkyXFlEWRGQrqPwk0J9RP0AWoOYoUvgKVXryZ-Y-w0vg4?e=1VfaGG';
  console.log('Opening OneDrive spreadsheet in Edge...');
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 50000 });
  await new Promise(r => setTimeout(r, 6000));

  // Find the frame containing Excel Online
  let excelFrame = null;
  for (const f of page.frames()) {
    if (f.url().includes('officeapps.live.com') && f.url().includes('excel')) {
      excelFrame = f;
      break;
    }
  }

  if (!excelFrame) {
    console.log('No excel frame found');
    await browser.close();
    return;
  }

  console.log('Found Excel frame:', excelFrame.url().slice(0, 80));

  // Try to find the File menu button
  const fileButtons = await excelFrame.evaluate(() => {
    const list = [];
    document.querySelectorAll('*').forEach(el => {
      const t = el.innerText?.trim();
      const a = el.getAttribute('aria-label');
      const id = el.id;
      if (t === 'File' || a === 'File' || a === 'File Tab' || id.toLowerCase().includes('file')) {
        list.push({ tag: el.tagName, id: el.id, class: el.className, text: t, aria: a });
      }
    });
    return list;
  });

  console.log('File elements:', fileButtons);

  // Click File menu if present
  try {
    const fileSelector = '#FileMenuLauncher, button[aria-label="File Tab"], button[aria-label="File"], div[aria-label="File Tab"]';
    await excelFrame.waitForSelector(fileSelector, { timeout: 5000 });
    console.log('Clicking File tab...');
    await excelFrame.click(fileSelector);
    await new Promise(r => setTimeout(r, 3000));

    // Look for Save As or Download
    const menuOptions = await excelFrame.evaluate(() => {
      return Array.from(document.querySelectorAll('button, a, div, span, [role="menuitem"]')).map(el => ({
        tag: el.tagName,
        id: el.id,
        text: el.innerText?.trim(),
        aria: el.getAttribute('aria-label')
      })).filter(x => x.text && (x.text.includes('Save') || x.text.includes('Download') || x.text.includes('Copy')));
    });

    console.log('Save / Download menu options:', menuOptions);

    // Try clicking Download a Copy or Save As
    for (const opt of menuOptions) {
      if (opt.text.toLowerCase().includes('download a copy') || opt.text.toLowerCase().includes('download')) {
        console.log('Clicking:', opt.text);
        await excelFrame.evaluate((id, text) => {
          const el = id ? document.getElementById(id) : Array.from(document.querySelectorAll('*')).find(e => e.innerText?.trim() === text);
          if (el) el.click();
        }, opt.id, opt.text);
        await new Promise(r => setTimeout(r, 4000));
        break;
      }
    }
  } catch (err) {
    console.log('Error interacting with File menu:', err.message);
  }

  // Check if anything downloaded
  const downloaded = fs.readdirSync('scratch/excel');
  console.log('Downloaded files in scratch/excel:', downloaded);

  await browser.close();
})();
