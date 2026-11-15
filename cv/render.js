// Renders a CV page to PDF: node cv/render.js "$PWD/cv/general.html" "$PWD/public/cv-myrzan-izimbetov.pdf"
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: process.argv[3], format: 'A4', preferCSSPageSize: true, printBackground: true });
  await b.close();
})();
