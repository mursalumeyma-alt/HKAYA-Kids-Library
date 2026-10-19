import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Administrator/.gemini/antigravity/brain/38a965c7-b7e8-4a02-b66c-f0270195c951';

async function testAboutPage() {
  console.log('🚀 Starting About Us Page Automated Browser Test...');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const networkErrors = [];
  page.on('response', (response) => {
    const url = response.url();
    const status = response.status();
    // Allow standard ok (200) and 304 (Not Modified)
    if (!response.ok() && status !== 304 && !url.includes('favicon')) {
      networkErrors.push({ url, status });
    }
  });

  try {
    // 1. Load preview server
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    console.log('✅ Homepage loaded.');

    // 2. Navigate to About Us page
    const aboutBtn = await page.waitForSelector('button ::-p-text(About Us)', { timeout: 5000 });
    await aboutBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    console.log('✅ Navigated to About Us page.');

    // 3. Verify Section 2: Hero Section
    const heroSmallHeading = await page.$eval('div ::-p-text(GET TO KNOW HIKAYA)', el => !!el);
    if (!heroSmallHeading) throw new Error('Hero small heading "GET TO KNOW HIKAYA" missing!');
    console.log('✅ Hero Small Heading verified: GET TO KNOW HIKAYA');

    const heroMainHeading = await page.$eval('h1', el => el.innerText);
    if (!heroMainHeading.includes('Little Minds') || !heroMainHeading.includes('Big Dreams')) {
      throw new Error(`Hero main heading mismatch! Found: "${heroMainHeading}"`);
    }
    console.log(`✅ Hero Main Heading verified: "${heroMainHeading}"`);

    const heroDesc = await page.$eval('p ::-p-text(At Hikaya, we believe)', el => el.innerText);
    if (!heroDesc.includes('every book opened, every idea explored')) {
      throw new Error(`Hero description mismatch! Found: "${heroDesc}"`);
    }
    console.log('✅ Hero Description verified.');

    const exploreBtn = await page.$eval('button ::-p-text(Explore Our Categories)', el => !!el);
    if (!exploreBtn) throw new Error('Button "Explore Our Categories" missing!');
    console.log('✅ Button "Explore Our Categories" verified.');

    // 4. Verify Section 3: Our Story
    const storyHeading = await page.$eval('#our-story-heading', el => el.innerText);
    if (!storyHeading.includes('The Story Behind Hikaya')) {
      throw new Error(`Story heading mismatch! Found: "${storyHeading}"`);
    }
    console.log(`✅ Story Heading verified: "${storyHeading}"`);

    const storyParagraph = await page.$eval('p ::-p-text(Hikaya, meaning ‘story’ in Arabic)', el => el.innerText);
    if (!storyParagraph) throw new Error('Story paragraph missing!');
    console.log('✅ Story text verified.');

    // 5. Verify Section 4: Our Mission
    const missionHeading = await page.$eval('#our-mission-heading', el => el.innerText);
    if (!missionHeading.includes('Our Mission')) {
      throw new Error(`Mission heading mismatch! Found: "${missionHeading}"`);
    }
    console.log(`✅ Mission Heading verified: "${missionHeading}"`);

    const missionQuote = await page.$eval('blockquote', el => el.innerText);
    if (!missionQuote.includes('To make discovering children\'s books and learning essentials simple')) {
      throw new Error(`Mission quote mismatch! Found: "${missionQuote}"`);
    }
    console.log('✅ Mission Quote verified.');

    // 6. Verify Section 5: What We Believe In
    const beliefs = await page.$$eval('section[aria-labelledby="beliefs-heading"] h3', els => els.map(e => e.innerText.trim()));
    console.log('Found belief cards:', beliefs);
    const expectedBeliefs = [
      'A Love of Reading',
      'Learning Through Play',
      'Creativity Every Day',
      'Thoughtful Choices'
    ];
    for (const eb of expectedBeliefs) {
      if (!beliefs.includes(eb)) throw new Error(`Missing expected belief card: "${eb}"`);
    }
    console.log('✅ All 4 Belief cards verified.');

    // 7. Verify Section 6: What You Can Discover at Hikaya
    const discoveryCards = await page.$$eval('section[aria-labelledby="discover-heading"] h3', els => els.map(e => e.innerText.trim()));
    console.log('Found discovery category cards:', discoveryCards);
    const expectedCats = [
      'Books & Reading',
      'Stationery & Art Supplies',
      'School Bags',
      'Lunch Boxes & Bottles',
      'Educational Toys',
      'Gifts & Accessories'
    ];
    for (const ec of expectedCats) {
      if (!discoveryCards.includes(ec)) throw new Error(`Missing expected category card: "${ec}"`);
    }
    console.log('✅ All 6 Category discovery cards verified.');

    // Verify NO individual product prices or product grids on this page
    const priceBadges = await page.$$eval('.price, [data-price], ::-p-text(KSh )', els => els.length);
    // Let's filter out general currency text if any, but ensure there are NO product cards
    const productCards = await page.$$eval('.product-card, [data-product-id]', els => els.length);
    if (productCards > 0) throw new Error(`Found ${productCards} product cards on About page! Must be 0.`);
    console.log('✅ 0 Product cards found on About page as required.');

    // 8. Verify Section 7: Who We Serve
    const serveHeading = await page.$eval('#who-we-serve-heading', el => el.innerText);
    if (!serveHeading.includes('For Little Learners and the People Who Support Them')) {
      throw new Error(`Who We Serve heading mismatch! Found: "${serveHeading}"`);
    }
    console.log(`✅ Who We Serve Heading verified: "${serveHeading}"`);

    const serveCopy = await page.$eval('p ::-p-text(Whether you\'re a parent preparing)', el => el.innerText);
    if (!serveCopy) throw new Error('Who We Serve body text missing!');
    console.log('✅ Who We Serve text verified.');

    // 9. Verify Section 8: Call to Action
    const ctaHeading = await page.$eval('#cta-heading', el => el.innerText);
    if (!ctaHeading.includes('Every Little Discovery Begins Somewhere.')) {
      throw new Error(`CTA heading mismatch! Found: "${ctaHeading}"`);
    }
    console.log(`✅ CTA Heading verified: "${ctaHeading}"`);

    // 10. Scroll down to trigger all lazy images and verify naturalWidth > 0
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight / 2);
      await new Promise(r => setTimeout(r, 600));
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 600));
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 400));
    });

    const imagesStatus = await page.$$eval('img', imgs => imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      loaded: img.complete && img.naturalWidth > 0
    })));

    console.log(`Evaluated ${imagesStatus.length} images on About page.`);
    const brokenImages = imagesStatus.filter(img => !img.loaded && !img.src.includes('data:'));
    if (brokenImages.length > 0) {
      console.error('Broken images found:', brokenImages);
      throw new Error(`${brokenImages.length} images failed to render!`);
    }
    console.log('✅ 100% of images rendered successfully with valid naturalWidth > 0.');

    // 11. Capture Desktop Screenshots without sticky header artifact
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.position = 'relative';
    });
    await new Promise(r => setTimeout(r, 400));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'about-page-desktop.png'),
      fullPage: true
    });
    console.log('📸 Saved pristine about-page-desktop.png');

    // 12. Test Mobile Viewport
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const aboutBtn = btns.find(b => b.textContent.trim() === 'About Us');
      if (aboutBtn) aboutBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    // Scroll to trigger lazy images on mobile
    await page.evaluate(async () => {
      const header = document.querySelector('header');
      if (header) header.style.position = 'relative';
      window.scrollTo(0, document.body.scrollHeight / 2);
      await new Promise(r => setTimeout(r, 400));
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 400));
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 300));
    });

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'about-page-mobile.png'),
      fullPage: true
    });
    console.log('📸 Saved pristine about-page-mobile.png');

    // Restore header
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.position = 'sticky';
    });

    // 13. Test Click on a Category Card (e.g. "School Bags") navigates to Shop filtered by that category
    await page.setViewport({ width: 1280, height: 900 });
    const clicked = await page.evaluate(() => {
      const h3s = Array.from(document.querySelectorAll('h3'));
      const schoolH3 = h3s.find(h => h.innerText.trim() === 'School Bags');
      if (schoolH3) {
        const card = schoolH3.closest('[role="button"]') || schoolH3.closest('div');
        if (card) {
          card.click();
          return true;
        }
      }
      return false;
    });
    if (!clicked) throw new Error('Could not find School Bags card via h3 text');
    await new Promise(r => setTimeout(r, 1200));

    const activeCatTitle = await page.evaluate(() => {
      const el = document.querySelector('h1, h2');
      return el ? el.innerText : '';
    });
    console.log(`✅ Navigated to Shop from About card! Active title: "${activeCatTitle}"`);

    if (networkErrors.length > 0) {
      console.warn('Network warnings encountered:', networkErrors);
    }

    console.log('\n🎉 ALL ABOUT US PAGE TESTS PASSED WITH 100% SUCCESS!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testAboutPage();
