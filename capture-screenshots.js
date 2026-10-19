import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = "C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\38a965c7-b7e8-4a02-b66c-f0270195c951";

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // 1. Homepage Desktop Categories Grid
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.scrollTo(0, 600));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'homepage-image-categories.png') });
  console.log('✓ Captured homepage-image-categories.png');

  // 2. Homepage Subcategory Visual Explorer
  await page.evaluate(() => {
    const explorer = document.querySelector('#shop-by-category h4');
    if (explorer) explorer.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'homepage-subcategory-explorer.png') });
  console.log('✓ Captured homepage-subcategory-explorer.png');

  // 3. Desktop Dropdown Mega-Menu with Subcategory Images
  await page.evaluate(() => window.scrollTo(0, 0));
  const firstDept = await page.$('header div.relative.group');
  if (firstDept) {
    await firstDept.hover();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop-mega-menu-images.png') });
    console.log('✓ Captured desktop-mega-menu-images.png');
  }

  // 4. ShopView Visual Subcategory Image Chips (School Bags)
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#shop-by-category div.group'));
    const schoolBagsCard = cards.find(c => c.innerText.includes('School Bags'));
    if (schoolBagsCard) schoolBagsCard.click();
  });
  await page.waitForFunction(() => document.querySelector('h1')?.innerText.includes('School Bags'), { timeout: 5000 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'shopview-visual-subcategory-chips.png') });
  console.log('✓ Captured shopview-visual-subcategory-chips.png');

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
