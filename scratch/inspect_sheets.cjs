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

function printSheet(sheetPath, label) {
  const xml = fs.readFileSync(sheetPath, 'utf8');
  console.log('=== ' + label + ' ===');
  const rowRegex = /<row[^>]*>([\s\S]*?)<\/row>/g;
  let rMatch;
  while ((rMatch = rowRegex.exec(xml)) !== null) {
    const rowContent = rMatch[1];
    const cRegex = /<c r="([A-Z0-9]+)"(?: t="([a-z]+)")?>([\s\S]*?)<\/c>/g;
    let cMatch;
    const rowObj = {};
    while ((cMatch = cRegex.exec(rowContent)) !== null) {
      const cellRef = cMatch[1];
      const type = cMatch[2];
      const valMatch = cMatch[3].match(/<v>([\s\S]*?)<\/v>/);
      let val = valMatch ? valMatch[1] : '';
      if (type === 's') {
        val = strings[parseInt(val, 10)];
      }
      rowObj[cellRef] = val;
    }
    console.log(JSON.stringify(rowObj));
  }
}

printSheet('scratch/excel_extracted/xl/worksheets/sheet2.xml', 'Sheet 2');
printSheet('scratch/excel_extracted/xl/worksheets/sheet3.xml', 'Sheet 3');
