import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Administrator/.gemini/antigravity/brain/38a965c7-b7e8-4a02-b66c-f0270195c951';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testPoliciesPage() {
  console.log('🚀 Starting Policies Page Automated Browser Test...');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const networkErrors = [];
  page.on('response', (response) => {
    const url = response.url();
    const status = response.status();
    if (!response.ok() && status !== 304 && !url.includes('favicon')) {
      networkErrors.push({ url, status });
    }
  });

  try {
    // 1. Load preview server
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    console.log('✅ App loaded.');

    // 2. Test Footer navigation to Shipping & Delivery policy
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise(r => setTimeout(r, 600));

    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('footer button'));
      const shippingBtn = btns.find(b => b.innerText.trim() === 'Shipping & Delivery');
      if (shippingBtn) shippingBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    // 3. Verify Policies Page Header
    const pageHeading = await page.$eval('h1', el => el.innerText.trim());
    console.log(`✅ Policies Page Heading: "${pageHeading}"`);
    if (pageHeading !== 'Our Policies') {
      throw new Error(`Expected heading "Our Policies", got "${pageHeading}"`);
    }

    const pageIntro = await page.$eval('p ::-p-text(We want shopping with Hikaya)', el => el.innerText.trim());
    console.log(`✅ Policies Introduction verified: "${pageIntro}"`);
    if (!pageIntro.includes('Please review our policies before placing an order.')) {
      throw new Error(`Policies intro mismatch: "${pageIntro}"`);
    }

    const lastUpdated = await page.$eval('span ::-p-text(Last updated:)', el => el.innerText.trim());
    console.log(`✅ Last updated date verified: "${lastUpdated}"`);
    if (!lastUpdated.includes('October 18, 2026')) {
      throw new Error(`Last updated date mismatch: "${lastUpdated}"`);
    }

    // 4. Verify all 5 policy sections exist
    const expectedPolicies = ['privacy', 'terms', 'shipping', 'returns', 'payments'];
    for (const pId of expectedPolicies) {
      const sectionExists = await page.$eval(`#${pId}`, el => !!el);
      if (!sectionExists) throw new Error(`Missing policy section #${pId}!`);
    }
    console.log('✅ All 5 policy sections (#privacy, #terms, #shipping, #returns, #payments) verified.');

    // 5. Verify Content of Specific Policies:
    // Privacy: Kenya Data Protection Act, 2019
    const privacyText = await page.$eval('#privacy', el => el.innerText);
    if (!privacyText.includes('Kenya Data Protection Act, 2019') || !privacyText.includes('M-Pesa PIN')) {
      throw new Error('Privacy Policy missing Data Protection Act or M-Pesa PIN security disclosure!');
    }
    console.log('✅ Privacy Policy verified with Kenya Data Protection Act & PIN security.');

    // Terms: Consumer Protection Act, 2012
    const termsText = await page.$eval('#terms', el => el.innerText);
    if (!termsText.includes('Consumer Protection Act, 2012') || !termsText.includes('Kenyan Shillings')) {
      throw new Error('Terms & Conditions missing Consumer Protection Act or KSh pricing!');
    }
    console.log('✅ Terms & Conditions verified with Consumer Protection Act & KSh pricing.');

    // Shipping: 47 counties and Nairobi standard fee
    const shippingText = await page.$eval('#shipping', el => el.innerText);
    if (!shippingText.includes('47 Counties') || !shippingText.includes('KSh 350')) {
      throw new Error('Shipping Policy missing 47 counties or standard fee!');
    }
    console.log('✅ Shipping & Delivery verified with 47 counties & fee breakdown.');

    // Returns: 48 hours notice and Consumer Protection merchantable quality
    const returnsText = await page.$eval('#returns', el => el.innerText);
    if (!returnsText.includes('48 hours') || !returnsText.includes('Consumer Protection Act, 2012')) {
      throw new Error('Returns Policy missing 48h reporting or consumer protection law!');
    }
    console.log('✅ Returns, Exchanges & Refunds verified with 48h reporting & statutory protections.');

    // Payments: Safaricom Daraja STK Push & PIN on phone screen only
    const paymentsText = await page.$eval('#payments', el => el.innerText);
    if (!paymentsText.includes('Safaricom Daraja API') || !paymentsText.toLowerCase().includes('never ask you for your m-pesa pin')) {
      throw new Error('Payment Policy missing Safaricom Daraja or PIN protection notice!');
    }
    console.log('✅ Payment Policy verified with Safaricom Daraja STK Push & PIN protection.');

    // 6. Verify Section 7: Need help? Call to action
    const helpHeading = await page.$eval('#policies-help-heading', el => el.innerText.trim());
    if (helpHeading !== 'Need help?') {
      throw new Error(`Expected help heading "Need help?", got "${helpHeading}"`);
    }

    const helpCopy = await page.$eval('p ::-p-text(If you have questions about an order or any of our policies)', el => el.innerText.trim());
    console.log(`✅ Need help text verified: "${helpCopy}"`);

    // Verify Contact Us button inside Need help section
    const contactUsBtn = await page.$eval('#policies-help-heading ~ div button ::-p-text(Contact Us)', el => !!el);
    if (!contactUsBtn) throw new Error('Need help section missing Contact Us button!');
    console.log('✅ Contact Us button verified in Need help section.');

    // 7. Verify Sidebar Navigation & Tab Switching
    console.log('\n--- Testing Sidebar Navigation & Tab Switching ---');
    await page.evaluate(() => {
      const navLinks = Array.from(document.querySelectorAll('aside nav button'));
      const termsLink = navLinks.find(b => b.innerText.includes('Terms & Conditions'));
      if (termsLink) termsLink.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const activeAriaCurrent = await page.$eval('aside nav button[aria-current="true"]', el => el.innerText.trim());
    console.log(`✅ Active sidebar item after click: "${activeAriaCurrent}"`);
    if (!activeAriaCurrent.includes('Terms & Conditions')) {
      throw new Error(`Expected Terms & Conditions to be active, got "${activeAriaCurrent}"`);
    }

    // 8. Capture Desktop Screenshot
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.position = 'relative';
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 400));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'policies-page-desktop.png'),
      fullPage: true
    });
    console.log('📸 Saved policies-page-desktop.png');

    // 9. Test Mobile Viewport (390px)
    console.log('\n--- Testing Mobile Viewport (390px) ---');
    await page.setViewport({ width: 390, height: 844 });
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const retBtn = btns.find(b => b.innerText.trim() === 'Returns & Refunds');
      if (retBtn) retBtn.click();
      const header = document.querySelector('header');
      if (header) header.style.position = 'relative';
      const bottomNav = document.querySelector('.sm\\:hidden.fixed.bottom-0');
      if (bottomNav) bottomNav.style.display = 'none';
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'policies-page-mobile.png'),
      fullPage: true
    });
    console.log('📸 Saved policies-page-mobile.png');

    // 10. Test clicking Contact Us in Need help navigates to Contact page
    await page.setViewport({ width: 1280, height: 900 });
    await page.evaluate(() => {
      const heading = document.getElementById('policies-help-heading');
      if (heading) {
        const contactBtn = Array.from(heading.parentElement.querySelectorAll('button')).find(b => b.innerText.includes('Contact Us'));
        if (contactBtn) contactBtn.click();
      }
    });
    await new Promise(r => setTimeout(r, 1000));

    const currentTitle = await page.$eval('h1', el => el.innerText.trim());
    console.log(`✅ Navigated to Contact page via Need Help CTA! Title: "${currentTitle}"`);
    if (!currentTitle.includes("We'd Love to Hear from You!")) {
      throw new Error(`Expected Contact page title, got "${currentTitle}"`);
    }

    console.log('\n🎉 ALL POLICIES PAGE TESTS PASSED 100%!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testPoliciesPage();
