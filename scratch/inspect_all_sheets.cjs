const fs = require('fs');

const sharedStringsXml = fs.readFileSync('scratch/excel_extracted/xl/sharedStrings.xml', 'utf8');
const strings = [];
const siRegex = /<si>([\s\S]*?)<\/si>/g;
let match;
while ((match = siRegex.exec(sharedStringsXml)) !== null) {
  const siContent = match[1];
  const tMatches = [...siContent.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(m => m[1]).join('');
  strings.push(tMatches);
}

function parseSheetRows(sheetPath, label, limit = 50) {
  if (!fs.existsSync(sheetPath)) return;
  console.log('=== ' + label + ' ===');
  const xml = fs.readFileSync(sheetPath, 'utf8');
  const rowRegex = /<row[^>]*>([\s\S]*?)<\/row>/g;
  let rMatch;
  let count = 0;
  while ((rMatch = rowRegex.exec(xml)) !== null && count < limit) {
    count++;
    const rowContent = rMatch[1];
    const cRegex = /<c\s+([^>]*?)>([\s\S]*?)<\/c>/g;
    let cMatch;
    const rowObj = {};
    while ((cMatch = cRegex.exec(rowContent)) !== null) {
      const attrs = cMatch[1];
      const cellBody = cMatch[2];
      const rVal = (attrs.match(/r="([A-Z0-9]+)"/) || [])[1];
      const tVal = (attrs.match(/t="([a-z]+)"/) || [])[1];
      const vVal = (cellBody.match(/<v>([\s\S]*?)<\/v>/) || [])[1] || '';
      let text = vVal;
      if (tVal === 's') {
        text = strings[parseInt(vVal, 10)] || '';
      }
      rowObj[rVal] = text;
    }
    console.log(JSON.stringify(rowObj));
  }
}

parseSheetRows('scratch/excel_extracted/xl/worksheets/sheet1.xml', 'Sheet 1 (Rows 1 to 50)', 50);
