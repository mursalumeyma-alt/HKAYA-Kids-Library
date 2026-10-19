import puppeteer from 'puppeteer-core';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function testMobile() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => ({
      aria: b.getAttribute('aria-label'),
      text: b.innerText.trim(),
      display: window.getComputedStyle(b).display,
      visibility: window.getComputedStyle(b).visibility,
      parentDisplay: window.getComputedStyle(b.parentElement).display
    }));
  });
  console.log('Mobile buttons found:', buttons.slice(0, 10));

  const hamburger = await page.$('button[aria-label="Open navigation menu"]');
  console.log('hamburger element handle:', hamburger);

  if (hamburger) {
    console.log('Clicking hamburger...');
    await hamburger.click();
    await new Promise(r => setTimeout(r, 600));
    const fullText = await page.evaluate(() => document.body.innerText);
    console.log('Full body text after click:\n', fullText);
  }

  await browser.close();
}

testMobile();
