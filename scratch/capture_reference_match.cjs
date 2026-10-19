const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\38a965c7-b7e8-4a02-b66c-f0270195c951';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Desktop Screenshot
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 850, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for images to load
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'));
    await Promise.all(selectors.map(img => {
      if (img.complete) return;
      return new Promise((resolve) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      });
    }));
  });

  await new Promise(r => setTimeout(r, 1200));

  const desktopScreenshotPath = path.join(artifactDir, 'reference-redesign-desktop.png');
  await page.screenshot({ path: desktopScreenshotPath, fullPage: true });
  console.log('Saved desktop screenshot to:', desktopScreenshotPath);

  const desktopViewportPath = path.join(artifactDir, 'reference-redesign-desktop-fold.png');
  await page.screenshot({ path: desktopViewportPath, fullPage: false });
  console.log('Saved fold screenshot to:', desktopViewportPath);

  // 2. Mobile Screenshot
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await mobilePage.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  const mobileScreenshotPath = path.join(artifactDir, 'reference-redesign-mobile.png');
  await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: true });
  console.log('Saved mobile screenshot to:', mobileScreenshotPath);

  // 3. Policies Page Screenshot
  await page.evaluate(() => {
    // Find footer or nav button with text Policies
    const buttons = Array.from(document.querySelectorAll('button, a'));
    const polBtn = buttons.find(b => b.textContent && b.textContent.trim() === 'Policies');
    if (polBtn) polBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  const policiesScreenshotPath = path.join(artifactDir, 'policies-desktop.png');
  await page.screenshot({ path: policiesScreenshotPath, fullPage: true });
  console.log('Saved policies screenshot to:', policiesScreenshotPath);

  await browser.close();
  console.log('Capture complete!');
})();
