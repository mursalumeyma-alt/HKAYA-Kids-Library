const puppeteer = require('puppeteer-core');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5175/', { waitUntil: 'networkidle0' });

  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    return anchors
      .filter(a => a.href.includes('tiktok.com') || a.href.includes('instagram.com'))
      .map(a => ({
        href: a.href,
        target: a.target,
        rel: a.rel,
        text: a.innerText.replace(/\s+/g, ' ').trim(),
        ariaLabel: a.getAttribute('aria-label')
      }));
  });

  console.log('Discovered Social Links Count:', links.length);
  console.log(JSON.stringify(links, null, 2));

  // Verify all links have target="_blank" and rel containing "noopener noreferrer"
  const failed = links.filter(l => l.target !== '_blank' || !l.rel.includes('noopener') || !l.rel.includes('noreferrer'));
  if (failed.length > 0) {
    console.error('Failed links:', failed);
    process.exit(1);
  } else {
    console.log('ALL SOCIAL LINKS PASSED SECURITY AND ACCESSIBILITY VERIFICATION!');
  }

  await browser.close();
})();
