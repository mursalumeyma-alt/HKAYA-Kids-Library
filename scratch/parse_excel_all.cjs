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

function dumpSheet(sheetPath, name) {
  if (!fs.existsSync(sheetPath)) return;
  console.log(`\n=== ${name} ===`);
  const sheetXml = fs.readFileSync(sheetPath, 'utf8');
  const rows = sheetXml.match(/<row[\s\S]*?<\/row>/g) || [];
  rows.forEach((r, idx) => {
    const cMatches = [...r.matchAll(/<c r="([A-Z0-9]+)"(?: t="([a-z]+)")?>([\s\S]*?)<\/c>/g)];
    const rowData = {};
    cMatches.forEach(c => {
      const cellRef = c[1];
      const type = c[2];
      const valMatch = c[3].match(/<v>([\s\S]*?)<\/v>/);
      let val = valMatch ? valMatch[1] : '';
      if (type === 's') {
        val = strings[parseInt(val, 10)];
      }
      rowData[cellRef] = val;
    });
    if (Object.keys(rowData).length > 0) {
      console.log(`Row in ${name}:`, JSON.stringify(rowData));
    }
  });
}

dumpSheet('scratch/excel_extracted/xl/worksheets/sheet2.xml', 'Sheet 2');
dumpSheet('scratch/excel_extracted/xl/worksheets/sheet3.xml', 'Sheet 3');
