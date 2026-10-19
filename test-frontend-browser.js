import puppeteer from 'puppeteer-core';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function verifySite() {
  console.log('--- Launching Comprehensive Browser Verification ---');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  try {
    // 1. Homepage Verification
    console.log('1. Loading Homepage http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

    const pageText = await page.evaluate(() => document.body.innerText);
    
    // Check Branding & Tagline
    if (!pageText.includes('Hikaya') || !pageText.includes('حكاية')) {
      throw new Error('Branding "Hikaya حكاية" not found on page');
    }
    console.log('✓ Brand name "Hikaya حكاية" confirmed');

    if (!pageText.includes('Little minds.') || !pageText.includes('Big dreams.')) {
      throw new Error('Tagline "Little minds. Big dreams." not found on page');
    }
    console.log('✓ Tagline "Little minds. Big dreams." confirmed');

    // Check Search bar in header & hero
    const searchInputs = await page.evaluate(() => document.querySelectorAll('input[type="text"]').length);
    if (searchInputs < 2) throw new Error('Search bars missing');
    console.log(`✓ Found ${searchInputs} search input bars (Header + Hero)`);

    // Verify Department Navigation Bar in Header
    const desktopDepartments = await page.evaluate(() => {
      const navButtons = Array.from(document.querySelectorAll('nav .group button'));
      return navButtons.map(b => b.innerText.trim());
    });
    console.log('Desktop Navigation Departments:', desktopDepartments);

    const expectedDepartments = [
      'Books & Reading',
      'Stationery & Art Supplies',
      'School Bags',
      'Lunch Boxes & Bottles',
      'Educational Toys',
      'Gifts & Accessories',
      'Islamic & Arabic Learning'
    ];

    if (desktopDepartments.length !== 7) {
      throw new Error(`Expected 7 main shopping departments in desktop nav, got ${desktopDepartments.length}`);
    }
    for (const dept of expectedDepartments) {
      if (!desktopDepartments.some(d => d.includes(dept))) {
        throw new Error(`Department missing from desktop nav: ${dept}`);
      }
    }
    console.log('✓ All 7 main shopping departments confirmed in desktop navigation');

    // Verify Peekaboo-style Dropdown on Hover
    console.log('\n2. Testing Peekaboo-style Hover/Dropdown on "Books & Reading"...');
    // Hover over Books & Reading
    const booksNavBtn = await page.$('nav .group:first-child button');
    if (booksNavBtn) {
      await booksNavBtn.hover();
      await new Promise(r => setTimeout(r, 400));
    }

    const dropdownVisible = await page.evaluate(() => {
      return document.body.innerText.includes("Children's Storybooks") &&
             document.body.innerText.includes("Islamic Children's Books") &&
             document.body.innerText.includes("Arabic Learning Books");
    });
    if (!dropdownVisible) throw new Error('Peekaboo-style category dropdown did not reveal subcategories');
    console.log('✓ Peekaboo-style category dropdown successfully revealed subcategories on hover');

    // Move mouse away to close dropdown
    await page.mouse.move(0, 0);
    await new Promise(r => setTimeout(r, 400));

    // Check Homepage Category Cards Grid
    const categoryCardTitles = await page.evaluate(() => {
      const cards = document.querySelectorAll('#shop-by-category h3');
      return Array.from(cards).map(h => h.innerText.trim());
    });
    console.log('Homepage Category Cards:', categoryCardTitles);

    if (categoryCardTitles.length !== 7) {
      throw new Error(`Expected 7 category cards on homepage, found ${categoryCardTitles.length}`);
    }
    console.log('✓ Exactly 7 department cards confirmed on homepage');

    // STRICT CHECK: Zero individual product cards on homepage
    const mainProductCardButtons = await page.evaluate(() => {
      const main = document.querySelector('main');
      if (!main) return 0;
      const addButtons = Array.from(main.querySelectorAll('button')).filter(b => b.innerText.includes('Add to Cart') || b.innerText.includes('Details'));
      return addButtons.length;
    });
    console.log(`Main homepage product card buttons: ${mainProductCardButtons}`);
    if (mainProductCardButtons > 0) {
      throw new Error(`Homepage contains ${mainProductCardButtons} product card buttons! Must be 0.`);
    }
    console.log('✓ STRICT CHECK PASSED: 0 product cards / prices on the homepage');

    // 3. Testing Dedicated Category Page: School Bags
    console.log('\n3. Testing dedicated category page: "School Bags"...');
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#shop-by-category div.group'));
      const schoolBagsCard = cards.find(c => c.innerText.includes('School Bags'));
      if (schoolBagsCard) schoolBagsCard.click();
    });

    await page.waitForFunction(() => document.querySelector('h1')?.innerText.includes('School Bags'), { timeout: 5000 });
    console.log('✓ School Bags category page loaded');

    // Verify all products on this page are School Bags ONLY
    const schoolBagProductNames = await page.evaluate(() => {
      const titles = document.querySelectorAll('main h3');
      return Array.from(titles).map(t => t.innerText.trim());
    });
    console.log(`Products on School Bags page (${schoolBagProductNames.length}):`, schoolBagProductNames);

    // Verify NO books, stationery, or toys leak into School Bags
    const hasUnrelatedProducts = schoolBagProductNames.some(name => {
      const n = name.toLowerCase();
      return n.includes('quran') || n.includes('dua') || n.includes('bento') || n.includes('puzzle') || n.includes('crayons');
    });
    if (hasUnrelatedProducts) {
      throw new Error('Unrelated products leaked into School Bags category page!');
    }
    console.log('✓ ISOLATION CHECK PASSED: School Bags page contains only relevant bag products (no books, toys, or dishes)');

    // Verify Subcategories pills on category page
    const subcategoryPills = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons
        .map(b => b.innerText.trim())
        .filter(t => t.includes('Backpack') || t.includes('Pouches') || t.includes('Book Bags') || t.includes('Tote'));
    });
    console.log('School Bags subcategory pills found:', subcategoryPills);
    if (subcategoryPills.length === 0) {
      throw new Error('Subcategory pills missing on School Bags page');
    }
    console.log('✓ Subcategory filter pills confirmed');

    // 4. Test Subcategory Filter Selection
    console.log('\n4. Testing subcategory filter selection (e.g. "Pencil Pouches")...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const pouchBtn = buttons.find(b => b.innerText.includes('Pencil Pouches'));
      if (pouchBtn) pouchBtn.click();
    });

    await new Promise(r => setTimeout(r, 500));
    const filteredPouchProducts = await page.evaluate(() => {
      const titles = document.querySelectorAll('main h3');
      return Array.from(titles).map(t => t.innerText.trim());
    });
    console.log('Filtered products for "Pencil Pouches":', filteredPouchProducts);
    if (!filteredPouchProducts.some(p => p.toLowerCase().includes('pouch'))) {
      throw new Error('Subcategory filtering failed to isolate pouch products');
    }
    console.log('✓ Subcategory filter successfully refined products');

    // 5. Test Dedicated "Shop by Category" Page
    console.log('\n5. Testing "Shop by Category" Overview Page...');
    await page.evaluate(() => {
      const navButtons = Array.from(document.querySelectorAll('nav button'));
      const catOverviewBtn = navButtons.find(b => b.innerText.includes('Shop by Category'));
      if (catOverviewBtn) catOverviewBtn.click();
    });

    await page.waitForFunction(() => document.body.innerText.includes('Hikaya Shopping Departments') || document.querySelector('h1')?.innerText.includes('Shop by Category'), { timeout: 5000 });
    const overviewCardCount = await page.evaluate(() => {
      return document.querySelectorAll('h2').length;
    });
    console.log(`Overview page departments count: ${overviewCardCount}`);
    if (overviewCardCount < 6) throw new Error('Category overview page missing cards');
    console.log('✓ Dedicated "Shop by Category" page confirmed with all departments');

    // 6. Test Mobile Menu & Expandable Accordion
    console.log('\n6. Testing Mobile Accordion Navigation in 375px mobile viewport...');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

    // Click mobile hamburger button
    const hamburger = await page.$('button[aria-label="Open navigation menu"]');
    if (hamburger) await hamburger.click();
    await new Promise(r => setTimeout(r, 400));

    // Check accordion exists
    const accordionVisible = await page.evaluate(() => {
      return document.body.innerText.toLowerCase().includes('shop by department');
    });
    if (!accordionVisible) throw new Error('Mobile drawer did not open');
    console.log('✓ Mobile drawer opened successfully');

    // Tap first department accordion (Books & Reading) to expand
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('div.rounded-2xl button'));
      if (buttons[0]) buttons[0].click();
    });
    await new Promise(r => setTimeout(r, 400));

    const accordionExpanded = await page.evaluate(() => {
      return document.body.innerText.includes("Children's Storybooks") &&
             document.body.innerText.includes("Islamic Children's Books");
    });
    if (!accordionExpanded) throw new Error('Mobile accordion failed to expand subcategories');
    console.log('✓ Mobile category accordion successfully expanded subcategories on tap');

    // Reset viewport to desktop
    await page.setViewport({ width: 1280, height: 900 });

    // 7. Test Pagination / Load-More on large catalogue
    console.log('\n7. Testing Pagination / Load-More on All Departments view...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    // Navigate to All Departments
    await page.evaluate(() => {
      const navButtons = Array.from(document.querySelectorAll('nav .group button'));
      if (navButtons[0]) navButtons[0].click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Clear category to see all products
    await page.evaluate(() => {
      const clearBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'All Departments');
      if (clearBtn) clearBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const paginationPresent = await page.evaluate(() => {
      const hasLoadMore = Array.from(document.querySelectorAll('button')).some(b => b.innerText.includes('Load More Products'));
      const hasShowingCount = document.body.innerText.includes('Showing 12 of');
      return hasLoadMore && hasShowingCount;
    });
    console.log('Pagination / Load More button present:', paginationPresent);
    if (!paginationPresent) throw new Error('Pagination / Load More was not rendered');
    console.log('✓ Peekaboo-style Pagination & Load More successfully verified');

    // 8. Test Search and Cart
    console.log('\n8. Testing Search & Cart drawer...');
    const searchInput = await page.$('header input[type="text"]');
    if (searchInput) {
      await searchInput.click();
      await searchInput.type('backpack', { delay: 30 });
      await page.keyboard.press('Enter');
    }
    await new Promise(r => setTimeout(r, 800));

    const searchResultOk = await page.evaluate(() => {
      return document.body.innerText.includes('Search Results') && document.body.innerText.includes('backpack');
    });
    if (!searchResultOk) throw new Error('Search did not navigate to search results');
    console.log('✓ Header search successfully navigated to search results');

    // Open Cart drawer
    await page.evaluate(() => {
      const cartBtn = document.querySelector('button[aria-label="View Shopping Cart"]');
      if (cartBtn) cartBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));
    const cartDrawerOk = await page.evaluate(() => {
      return document.body.innerText.includes('Your Shopping Cart') || document.body.innerText.includes('Your cart is empty');
    });
    if (!cartDrawerOk) throw new Error('Cart drawer did not open');
    console.log('✓ Shopping Cart drawer opened successfully');

    console.log('\n======================================================');
    console.log('ALL PEEKABOO-INSPIRED BROWSER TESTS PASSED! ✓');
    console.log('======================================================\n');

  } finally {
    await browser.close();
  }
}

verifySite().catch(err => {
  console.error('Browser Verification Failed:', err);
  process.exit(1);
});
