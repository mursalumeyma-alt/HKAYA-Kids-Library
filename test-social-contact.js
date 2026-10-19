import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Administrator/.gemini/antigravity/brain/38a965c7-b7e8-4a02-b66c-f0270195c951';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testSocialAndContact() {
  console.log('🚀 Starting Social Media & Business Contact Verification Test...');

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
    console.log('✅ App loaded at http://localhost:5173/');

    // 2. Scroll to footer
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise(r => setTimeout(r, 600));

    // 3. Verify Footer Contact Hikaya Section
    const footerEmail = await page.$eval('footer a[href^="mailto:"]', el => ({
      href: el.getAttribute('href'),
      text: el.innerText.trim()
    }));
    console.log('✅ Footer Email link:', footerEmail);
    if (!footerEmail.href.includes('mailto:hello@hkayalibrary.co.ke')) {
      throw new Error(`Footer mailto link invalid: ${footerEmail.href}`);
    }

    const footerPhone = await page.$eval('footer a[href^="tel:"]', el => ({
      href: el.getAttribute('href'),
      text: el.innerText.trim()
    }));
    console.log('✅ Footer Phone link:', footerPhone);
    if (!footerPhone.href.includes('tel:')) {
      throw new Error(`Footer tel link invalid: ${footerPhone.href}`);
    }

    const footerWhatsApp = await page.$eval('footer a[href*="wa.me"]', el => ({
      href: el.getAttribute('href'),
      text: el.innerText.trim(),
      target: el.getAttribute('target'),
      rel: el.getAttribute('rel')
    }));
    console.log('✅ Footer WhatsApp link:', footerWhatsApp);
    if (footerWhatsApp.target !== '_blank' || !footerWhatsApp.rel.includes('noopener')) {
      throw new Error('Footer WhatsApp link missing security attributes!');
    }

    // 4. Verify Footer Social Media (Instagram and TikTok)
    const footerInstagram = await page.$eval('footer a[href*="instagram.com"]', el => ({
      href: el.getAttribute('href'),
      target: el.getAttribute('target'),
      rel: el.getAttribute('rel'),
      ariaLabel: el.getAttribute('aria-label')
    }));
    console.log('✅ Footer Instagram link:', footerInstagram);
    if (footerInstagram.target !== '_blank' || !footerInstagram.rel.includes('noopener')) {
      throw new Error('Footer Instagram link missing security attributes!');
    }

    const footerTikTok = await page.$eval('footer a[href*="tiktok.com"]', el => ({
      href: el.getAttribute('href'),
      target: el.getAttribute('target'),
      rel: el.getAttribute('rel'),
      ariaLabel: el.getAttribute('aria-label')
    }));
    console.log('✅ Footer TikTok link:', footerTikTok);
    if (footerTikTok.target !== '_blank' || !footerTikTok.rel.includes('noopener')) {
      throw new Error('Footer TikTok link missing security attributes!');
    }

    // 5. Verify Footer Customer Information Links
    const expectedCustomerLinks = [
      'About Us',
      'Contact Us',
      'Privacy Policy',
      'Terms & Conditions',
      'Shipping & Delivery',
      'Returns & Refunds',
      'Payment Policy'
    ];
    const footerCustomerButtons = await page.$$eval('footer ul button', els => els.map(e => e.innerText.trim()));
    console.log('Found footer customer buttons:', footerCustomerButtons);
    for (const link of expectedCustomerLinks) {
      if (!footerCustomerButtons.includes(link)) {
        throw new Error(`Footer missing expected customer information link: "${link}"`);
      }
    }
    console.log('✅ All 7 Customer Information links confirmed in Footer.');

    // 6. Test Policy Navigation to Dedicated Policies Page
    // Test Privacy Policy link
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('footer button'));
      const privBtn = btns.find(b => b.innerText.trim() === 'Privacy Policy');
      if (privBtn) privBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const policiesPageHeading = await page.$eval('h1', el => el.innerText.trim());
    console.log(`✅ Navigated to Policies page: "${policiesPageHeading}"`);
    if (policiesPageHeading !== 'Our Policies') {
      throw new Error(`Expected page heading "Our Policies", got "${policiesPageHeading}"`);
    }

    const privacySection = await page.$('#privacy');
    if (!privacySection) throw new Error('#privacy section not found on Policies page!');
    console.log('✅ Privacy Policy section verified on Policies page.');

    // 7. Test Returns & Refunds Policy Navigation
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('footer button'));
      const retBtn = btns.find(b => b.innerText.trim() === 'Returns & Refunds');
      if (retBtn) retBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const returnsSection = await page.$('#returns');
    if (!returnsSection) throw new Error('#returns section not found on Policies page!');
    console.log('✅ Returns & Refunds Policy section verified on Policies page.');

    await new Promise(r => setTimeout(r, 400));

    // Capture Footer Screenshot
    const footerEl = await page.$('footer');
    if (footerEl) {
      await footerEl.screenshot({
        path: path.join(ARTIFACT_DIR, 'footer-social-contact.png')
      });
      console.log('📸 Saved footer-social-contact.png');
    }

    // 8. Navigate to Contact Us Page
    console.log('\n--- Testing Contact Us Page ---');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('footer button, nav button'));
      const contactBtn = btns.find(b => b.innerText.trim() === 'Contact Us');
      if (contactBtn) contactBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    // Verify Main Heading: "We'd Love to Hear from You!"
    const contactHeading = await page.$eval('h1', el => el.innerText.trim());
    console.log(`✅ Contact Page Main Heading: "${contactHeading}"`);
    if (!contactHeading.includes("We'd Love to Hear from You!")) {
      throw new Error(`Expected heading "We'd Love to Hear from You!", got "${contactHeading}"`);
    }

    // Verify Supporting Text: “Have a question about a book, school essential, order, or delivery? Get in touch with Hikaya.”
    const supportingText = await page.$eval('p ::-p-text(Have a question about a book)', el => el.innerText.trim());
    console.log(`✅ Supporting text verified: "${supportingText}"`);
    if (!supportingText.includes("Get in touch with Hikaya")) {
      throw new Error(`Supporting text mismatch: "${supportingText}"`);
    }

    // Verify Contact page email link
    const contactEmail = await page.$eval('a[href^="mailto:hello@hkayalibrary.co.ke"]', el => el.getAttribute('href'));
    console.log('✅ Contact Page Email link verified:', contactEmail);

    // Verify Contact page phone link
    const contactPhone = await page.$eval('a[href^="tel:"]', el => el.getAttribute('href'));
    console.log('✅ Contact Page Phone link verified:', contactPhone);

    // Verify Contact page WhatsApp link
    const contactWhatsApp = await page.$eval('a[href*="wa.me"]', el => ({
      href: el.getAttribute('href'),
      target: el.getAttribute('target'),
      rel: el.getAttribute('rel')
    }));
    console.log('✅ Contact Page WhatsApp link verified:', contactWhatsApp);
    if (contactWhatsApp.target !== '_blank' || !contactWhatsApp.rel.includes('noopener')) {
      throw new Error('Contact Page WhatsApp link missing security attributes!');
    }

    // Verify Contact page Instagram & TikTok links
    const contactInstagram = await page.$eval('a[href*="instagram.com"]', el => ({
      href: el.getAttribute('href'),
      target: el.getAttribute('target'),
      rel: el.getAttribute('rel')
    }));
    console.log('✅ Contact Page Instagram link verified:', contactInstagram);
    if (contactInstagram.target !== '_blank' || !contactInstagram.rel.includes('noopener')) {
      throw new Error('Contact Page Instagram link missing security attributes!');
    }

    const contactTikTok = await page.$eval('a[href*="tiktok.com"]', el => ({
      href: el.getAttribute('href'),
      target: el.getAttribute('target'),
      rel: el.getAttribute('rel')
    }));
    console.log('✅ Contact Page TikTok link verified:', contactTikTok);
    if (contactTikTok.target !== '_blank' || !contactTikTok.rel.includes('noopener')) {
      throw new Error('Contact Page TikTok link missing security attributes!');
    }

    // Verify Customer-support hours: since isConfirmed is false, ensure no unconfirmed hours block is shown
    const unconfirmedHoursFound = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      return headings.some(h => h.innerText.includes('Customer Support Hours'));
    });
    if (unconfirmedHoursFound) {
      throw new Error('Unconfirmed customer support hours were displayed on Contact page!');
    }
    console.log('✅ Unconfirmed customer support hours are safely hidden per requirement.');

    // 9. Capture Contact Page Desktop Screenshot
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.position = 'relative';
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'contact-page-desktop.png'),
      fullPage: true
    });
    console.log('📸 Saved contact-page-desktop.png');

    // 10. Test Mobile Viewport (390px)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('footer button, button'));
      const contactBtn = btns.find(b => b.innerText.trim() === 'Contact Us');
      if (contactBtn) contactBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'contact-page-mobile.png'),
      fullPage: true
    });
    console.log('📸 Saved contact-page-mobile.png');

    console.log('\n🎉 ALL SOCIAL MEDIA & BUSINESS CONTACT TESTS PASSED 100%!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testSocialAndContact();
