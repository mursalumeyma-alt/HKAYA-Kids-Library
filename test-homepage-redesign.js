import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = "C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\38a965c7-b7e8-4a02-b66c-f0270195c951";

async function verifyHomepageRedesign() {
  console.log('--- Launching Homepage Redesign & Real Image Verification ---');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });

  try {
    console.log('1. Loading Homepage at http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

    // --- Section 1: Header and Navigation ---
    console.log('\n[Section 1: Header and Navigation]');
    const headerInfo = await page.evaluate(() => {
      const navLinks = Array.from(document.querySelectorAll('header nav button, header nav a')).map(el => el.innerText.trim());
      const hasArabic = document.body.innerText.includes('حكاية');
      const hasBrand = document.body.innerText.includes('Hikaya');
      const hasCart = document.querySelector('header button[aria-label="View Shopping Cart"]') !== null;
      const searchInputs = document.querySelectorAll('header input[type="text"]').length;
      return { navLinks, hasArabic, hasBrand, hasCart, searchInputs };
    });

    console.log('Header brand & Arabic:', headerInfo.hasBrand, headerInfo.hasArabic);
    console.log('Search inputs in header:', headerInfo.searchInputs);
    console.log('Cart button present:', headerInfo.hasCart);
    const hasNavLinks = ['Home', 'Shop by Category', 'About Us', 'Contact Us'].every(l => 
      headerInfo.navLinks.some(nl => nl.includes(l))
    );
    console.log('All 4 navigation links present (Home, Shop by Category, About Us, Contact Us):', hasNavLinks);
    if (!hasNavLinks) throw new Error('Header missing required navigation links');

    // --- Section 2: Hero Section ---
    console.log('\n[Section 2: Hero Section]');
    const heroInfo = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.innerText.replace(/\s+/g, ' ').trim();
      const heroText = document.body.innerText;
      const hasHeading = h1?.includes('Little Minds. Big Dreams.') || (heroText.includes('Little Minds.') && heroText.includes('Big Dreams.'));
      const hasSupportText = heroText.includes('Discover inspiring books, creative stationery and educational essentials for every little learner.');
      const heroBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Explore Categories'));
      
      const heroImg = document.querySelector('img[src*="children-reading-hero.jpg"]');
      const heroImgLoaded = heroImg && heroImg.complete && heroImg.naturalWidth > 0;
      return { h1, hasHeading, hasSupportText, hasHeroBtn: !!heroBtn, heroImgLoaded };
    });

    console.log('Hero Heading:', heroInfo.h1, '-> valid:', heroInfo.hasHeading);
    console.log('Hero Supporting text confirmed:', heroInfo.hasSupportText);
    console.log('Hero Explore Categories button:', heroInfo.hasHeroBtn);
    console.log('Hero real lifestyle photograph loaded:', heroInfo.heroImgLoaded);
    if (!heroInfo.hasHeading || !heroInfo.hasSupportText || !heroInfo.hasHeroBtn || !heroInfo.heroImgLoaded) {
      throw new Error('Hero section validation failed');
    }

    // --- Section 3: Shop by Category Section ---
    console.log('\n[Section 3: Shop by Category Section]');
    const categoryInfo = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#shop-by-category div[data-category-card]'));
      const catDetails = cards.map(c => {
        const title = c.querySelector('h3')?.innerText.trim();
        const desc = c.querySelector('p')?.innerText.trim();
        const img = c.querySelector('img');
        const imgLoaded = img && img.complete && img.naturalWidth > 0;
        const btn = Array.from(c.querySelectorAll('button')).find(b => b.innerText.includes('Explore Category'))?.innerText.trim();
        return { title, desc, imgSrc: img?.src, imgLoaded, btn };
      });
      return catDetails;
    });

    console.log(`Found ${categoryInfo.length} Category Cards:`);
    categoryInfo.forEach((c, i) => {
      console.log(`  ${i+1}. ${c.title} -> Img loaded: ${c.imgLoaded} [${c.btn}]`);
    });

    if (categoryInfo.length !== 7) throw new Error(`Expected 7 category cards, got ${categoryInfo.length}`);
    const allImagesLoaded = categoryInfo.every(c => c.imgLoaded);
    if (!allImagesLoaded) throw new Error('Not all category card images loaded');

    // --- Section 4: Short introduction to Hikaya ---
    console.log('\n[Section 4: Short introduction to Hikaya]');
    await page.evaluate(() => {
      const el = document.getElementById('hikaya-introduction');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1000));

    const introInfo = await page.evaluate(() => {
      const section = document.getElementById('hikaya-introduction');
      if (!section) return { exists: false };
      const text = section.innerText;
      const mentionsKenya = text.includes('Kenya');
      const mentionsSchools = text.includes('schools');
      const mentionsReaders = text.includes('readers');
      const mentionsParents = text.includes('parents');
      const img = section.querySelector('img');
      const imgLoaded = img && img.complete && img.naturalWidth > 0;
      return { exists: true, mentionsKenya, mentionsSchools, mentionsReaders, mentionsParents, imgLoaded, naturalWidth: img?.naturalWidth };
    });

    console.log('Introduction Section exists:', introInfo.exists);
    console.log('Mentions Kenya, schools, readers, parents:', introInfo.mentionsKenya, introInfo.mentionsSchools, introInfo.mentionsReaders, introInfo.mentionsParents);
    console.log('Intro real photo loaded:', introInfo.imgLoaded);
    if (!introInfo.exists || !introInfo.mentionsKenya || !introInfo.imgLoaded) {
      throw new Error('Introduction section validation failed');
    }

    // --- Section 5: Small brand-purpose section ---
    console.log('\n[Section 5: Small brand-purpose section]');
    const purposeInfo = await page.evaluate(() => {
      const section = document.getElementById('brand-purpose');
      if (!section) return { exists: false };
      const titles = Array.from(section.querySelectorAll('h3')).map(h => h.innerText.trim());
      return { exists: true, titles };
    });

    console.log('Brand Purpose section exists:', purposeInfo.exists);
    console.log('Brand Purpose feature boxes:', purposeInfo.titles);
    const expectedPurposes = [
      'Carefully Selected Stories',
      'Learning Beyond the Classroom',
      'Practical School Essentials',
      'Family-Centred Service'
    ];
    const hasAllPurposes = expectedPurposes.every(p => purposeInfo.titles.includes(p));
    console.log('All 4 feature boxes confirmed:', hasAllPurposes);
    if (!purposeInfo.exists || !hasAllPurposes) {
      throw new Error('Brand purpose section validation failed');
    }

    // --- Section 6: Contact and social media links ---
    console.log('\n[Section 6: Contact and social media links]');
    const contactInfo = await page.evaluate(() => {
      const section = document.getElementById('home-contact-social');
      if (!section) return { exists: false };
      const text = section.innerText;
      const mailto = section.querySelector('a[href^="mailto:"]')?.href;
      const tel = section.querySelector('a[href^="tel:"]')?.href;
      const wa = section.querySelector('a[href*="wa.me"]')?.href;
      const ig = section.querySelector('a[href*="instagram.com"]')?.href;
      const tt = section.querySelector('a[href*="tiktok.com"]')?.href;
      return { exists: true, mailto, tel, wa, ig, tt };
    });

    console.log('Contact & Social section exists:', contactInfo.exists);
    console.log('Email mailto:', contactInfo.mailto);
    console.log('Phone tel:', contactInfo.tel);
    console.log('WhatsApp link:', contactInfo.wa);
    console.log('Instagram link:', contactInfo.ig);
    console.log('TikTok link:', contactInfo.tt);
    if (!contactInfo.exists || !contactInfo.mailto || !contactInfo.wa || !contactInfo.ig || !contactInfo.tt) {
      throw new Error('Contact and social links section validation failed');
    }

    // --- Section 7: Footer ---
    console.log('\n[Section 7: Footer with policies and customer support]');
    const footerInfo = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return { exists: false };
      const text = footer.innerText;
      const hasPrivacy = text.includes('Privacy Policy');
      const hasTerms = text.includes('Terms & Conditions') || text.includes('Terms and Conditions');
      const hasShipping = text.includes('Shipping & Delivery') || text.includes('Shipping and Delivery');
      const hasReturns = text.includes('Returns & Refunds') || text.includes('Returns and Refunds');
      const hasPayment = text.includes('Payment Policy');
      const hasContact = text.includes('Contact Us') || text.includes('Contact');
      return { exists: true, hasPrivacy, hasTerms, hasShipping, hasReturns, hasPayment, hasContact };
    });

    console.log('Footer policies confirmed:', footerInfo);
    if (!footerInfo.exists || !footerInfo.hasPrivacy || !footerInfo.hasTerms || !footerInfo.hasPayment) {
      throw new Error('Footer validation failed');
    }

    // --- Strict Rule: 0 Product Cards on Homepage ---
    console.log('\n[Strict Rule: 0 Product Cards on Homepage]');
    const productCardsCount = await page.evaluate(() => {
      // Look for individual product cards (which have price tags, add to cart buttons, etc.)
      const priceRegex = /KSh\s*\d+/;
      const buttons = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.toLowerCase().includes('add to cart'));
      const prices = Array.from(document.querySelectorAll('span, p, div')).filter(el => {
        // Exclude footer/header text
        if (el.closest('header') || el.closest('footer')) return false;
        return priceRegex.test(el.innerText) && el.children.length === 0;
      });
      return { addToCartButtons: buttons.length, prices: prices.length };
    });

    console.log('Homepage Add to Cart buttons:', productCardsCount.addToCartButtons);
    console.log('Homepage Product price tags:', productCardsCount.prices);
    if (productCardsCount.addToCartButtons > 0 || productCardsCount.prices > 0) {
      throw new Error('VIOLATION: Individual product cards or prices detected on Homepage!');
    }
    console.log('✓ STRICT RULE VERIFIED: 0 product cards, 0 prices on homepage!');

    // --- Capture High-Resolution Screenshots for Artifacts ---
    console.log('\nCapturing Desktop Screenshot...');
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'homepage-desktop-redesign.png'),
      fullPage: true
    });
    console.log('✓ Desktop screenshot saved to homepage-desktop-redesign.png');

    // Mobile Viewport (iPhone 14 / modern Android)
    console.log('\nCapturing Mobile Screenshot (390 x 844)...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'homepage-mobile-redesign.png'),
      fullPage: true
    });
    console.log('✓ Mobile screenshot saved to homepage-mobile-redesign.png');

    console.log('\n======================================================');
    console.log('ALL 7 HOMEPAGE SECTIONS & REAL IMAGES FULLY VERIFIED! ✓');
    console.log('======================================================');

  } catch (err) {
    console.error('VERIFICATION ERROR:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyHomepageRedesign();
