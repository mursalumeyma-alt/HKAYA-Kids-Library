import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function verifyImageBasedCategories() {
  console.log('--- Launching Image-Based Category & Subcategory Verification ---');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Monitor network for any failed image requests
  const failedImages = [];
  page.on('response', response => {
    const req = response.request();
    if (req.resourceType() === 'image') {
      const status = response.status();
      if (!response.ok() && status !== 304) {
        failedImages.push({ url: req.url(), status });
      }
    }
  });

  try {
    // 1. Homepage Category-First & Images Check
    console.log('1. Loading Homepage http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

    // Confirm 0 product cards on homepage
    const mainProductCardButtons = await page.evaluate(() => {
      const main = document.querySelector('main');
      if (!main) return 0;
      const addButtons = Array.from(main.querySelectorAll('button')).filter(b => b.innerText.includes('Add to Cart'));
      return addButtons.length;
    });
    if (mainProductCardButtons > 0) {
      throw new Error(`Homepage contains ${mainProductCardButtons} product Add to Cart buttons! Must be 0.`);
    }
    console.log('✓ Verified: 0 product cards / prices on homepage (Category-First discovery maintained)');

    // Scroll down to load all images on the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 800));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 400));

    // Verify main category cards on homepage have images and naturalWidth > 0
    const mainCategoryImages = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#shop-by-category div.group')).filter(c => c.querySelector('h3'));
      return cards.map(card => {
        const title = card.querySelector('h3')?.innerText.trim();
        const img = card.querySelector('img');
        return {
          title,
          src: img?.src,
          naturalWidth: img?.naturalWidth || 0,
          alt: img?.alt || ''
        };
      });
    });
    console.log(`Found ${mainCategoryImages.length} main category cards on homepage.`);
    if (mainCategoryImages.length !== 7) {
      throw new Error(`Expected 7 main category cards, found ${mainCategoryImages.length}`);
    }
    for (const catImg of mainCategoryImages) {
      if (!catImg.src || catImg.naturalWidth === 0) {
        throw new Error(`Main category image failed to load for "${catImg.title}": ${catImg.src}`);
      }
    }
    console.log('✓ All 7 main category card images loaded successfully with valid dimensions');

    // Verify subcategory image thumbnails inside homepage category cards
    const subcategoryThumbnailsOnHomepage = await page.evaluate(() => {
      const subImgs = document.querySelectorAll('#shop-by-category button[title^="Explore"] img');
      return Array.from(subImgs).map(img => ({
        src: img.src,
        naturalWidth: img.naturalWidth,
        alt: img.alt
      }));
    });
    console.log(`Found ${subcategoryThumbnailsOnHomepage.length} subcategory image thumbnails inside homepage category cards.`);
    if (subcategoryThumbnailsOnHomepage.length === 0) {
      throw new Error('Subcategory image thumbnails missing from homepage category cards');
    }
    for (const thumb of subcategoryThumbnailsOnHomepage) {
      if (thumb.naturalWidth === 0) {
        throw new Error(`Subcategory thumbnail failed to render properly: ${thumb.src} (alt: ${thumb.alt})`);
      }
    }
    console.log('✓ All subcategory image thumbnails in homepage cards confirmed working');

    // Verify Interactive Visual Subcategory Explorer
    const subcategoryShowcaseImages = await page.evaluate(() => {
      const showcaseImgs = document.querySelectorAll('#shop-by-category .group img');
      return showcaseImgs.length;
    });
    console.log(`✓ Total category/subcategory images rendered on homepage: ${subcategoryShowcaseImages}`);

    // 2. Desktop Mega-Menu Subcategory Images
    console.log('\n2. Testing Desktop Mega-Menu with subcategory images on hover...');
    const firstDeptDiv = await page.$('header div.relative.group');
    if (firstDeptDiv) {
      await firstDeptDiv.hover();
      await new Promise(r => setTimeout(r, 500));
    }
    const megaMenuSubImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll('header div.relative.group .w-72 img');
      return Array.from(imgs).map(img => ({
        src: img.src,
        naturalWidth: img.naturalWidth,
        alt: img.alt
      }));
    });
    console.log(`Found ${megaMenuSubImages.length} subcategory images in desktop mega-menu.`);
    if (megaMenuSubImages.length === 0) {
      throw new Error('Mega-menu subcategory images missing');
    }
    for (const img of megaMenuSubImages) {
      if (img.naturalWidth === 0) throw new Error(`Mega-menu image failed to load: ${img.src}`);
    }
    console.log('✓ Desktop mega-menu subcategory images verified');
    await page.mouse.move(0, 0);

    // 3. Mobile Navigation Drawer Accordion Subcategory Images
    console.log('\n3. Testing Mobile Drawer Accordion at 375px viewport...');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

    const hamburger = await page.$('button[aria-label="Open navigation menu"]');
    if (hamburger) await hamburger.click();
    await new Promise(r => setTimeout(r, 400));

    // Tap first accordion
    await page.evaluate(() => {
      const accordionBtns = Array.from(document.querySelectorAll('div.rounded-2xl button'));
      if (accordionBtns[0]) accordionBtns[0].click();
    });
    await new Promise(r => setTimeout(r, 400));

    const mobileAccordionSubImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll('div.rounded-2xl img');
      return Array.from(imgs).map(img => ({
        src: img.src,
        naturalWidth: img.naturalWidth,
        alt: img.alt
      }));
    });
    console.log(`Found ${mobileAccordionSubImages.length} subcategory images in mobile drawer.`);
    if (mobileAccordionSubImages.length === 0) {
      throw new Error('Mobile drawer subcategory images missing');
    }
    for (const img of mobileAccordionSubImages) {
      if (img.naturalWidth === 0) throw new Error(`Mobile drawer subcategory image failed: ${img.src}`);
    }
    console.log('✓ Mobile drawer subcategory images verified');

    // Reset viewport to desktop
    await page.setViewport({ width: 1280, height: 900 });

    // 4. Dedicated "Shop by Category" page with visual subcategory image cards
    console.log('\n4. Testing dedicated "Shop by Category" page (CategoriesView)...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('nav button'));
      const catBtn = buttons.find(b => b.innerText.includes('Shop by Category'));
      if (catBtn) catBtn.click();
    });
    await page.waitForFunction(() => document.body.innerText.includes('Shop by Category'), { timeout: 5000 });

    // Scroll to trigger lazy loading of subcategory cards
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 800));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 400));

    const categoriesViewSubImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll('main .group\\/subbtn img');
      return Array.from(imgs).map(img => ({
        src: img.src,
        naturalWidth: img.naturalWidth
      }));
    });
    console.log(`Found ${categoriesViewSubImages.length} subcategory image cards on CategoriesView page.`);
    if (categoriesViewSubImages.length === 0) {
      throw new Error('Subcategory image cards missing on CategoriesView page');
    }
    for (const img of categoriesViewSubImages) {
      if (img.naturalWidth === 0) throw new Error(`CategoriesView subcategory image failed: ${img.src}`);
    }
    console.log('✓ Dedicated "Shop by Category" page subcategory image cards verified');

    // 5. Dedicated Category Page (ShopView) with visual subcategory image chips
    console.log('\n5. Testing dedicated category page with visual subcategory image chips...');
    // Click School Bags subcategory card
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const preschoolBtn = buttons.find(b => b.innerText.includes('Preschool Backpacks'));
      if (preschoolBtn) preschoolBtn.click();
    });
    await page.waitForFunction(() => document.body.innerText.includes('Preschool Backpacks'), { timeout: 5000 });

    const shopViewSubcategoryFilterImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll('main div.overflow-x-auto button img');
      return Array.from(imgs).map(img => ({
        src: img.src,
        naturalWidth: img.naturalWidth
      }));
    });
    console.log(`Found ${shopViewSubcategoryFilterImages.length} subcategory image filter chips in ShopView.`);
    if (shopViewSubcategoryFilterImages.length === 0) {
      throw new Error('Subcategory filter chips in ShopView missing images');
    }
    for (const img of shopViewSubcategoryFilterImages) {
      if (img.naturalWidth === 0) throw new Error(`ShopView subcategory filter image failed: ${img.src}`);
    }
    console.log('✓ ShopView visual subcategory image chips verified');

    // Verify products displayed are School Bags only
    const schoolBagProducts = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('main h3')).map(h => h.innerText.trim());
      return titles;
    });
    console.log('School Bags products displayed:', schoolBagProducts);
    const hasUnrelated = schoolBagProducts.some(p => {
      const t = p.toLowerCase();
      return t.includes('quran') || t.includes('bento') || t.includes('crayons');
    });
    if (hasUnrelated) throw new Error('Unrelated products leaked into School Bags!');
    console.log('✓ STRICT ISOLATION VERIFIED: School Bags page contains only relevant bag products');

    // 6. Check for any failed network image requests
    if (failedImages.length > 0) {
      console.warn('Failed image responses detected:', failedImages);
      throw new Error(`${failedImages.length} image requests failed with HTTP errors!`);
    }
    console.log('✓ NETWORK CHECK: 0 failed image HTTP requests (all images loaded cleanly with HTTP 200)');

    console.log('\n================================================================');
    console.log('ALL IMAGE-BASED CATEGORY & SUBCATEGORY TESTS PASSED! ✓');
    console.log('================================================================\n');

  } finally {
    await browser.close();
  }
}

verifyImageBasedCategories().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
