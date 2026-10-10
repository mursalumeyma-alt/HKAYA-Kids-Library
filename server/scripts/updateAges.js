import fs from 'node:fs';

const ageMap = {
  'hk-ib-01': { min: 1, max: 5 },
  'hk-ib-02': { min: 5, max: 8 },
  'hk-ib-03': { min: 6, max: 10 },
  'hk-ib-04': { min: 8, max: 15 },
  'hk-qa-01': { min: 4, max: 8 },
  'hk-qa-02': { min: 2, max: 6 },
  'hk-qa-03': { min: 4, max: 8 },
  'hk-qa-04': { min: 6, max: 12 },
  'hk-sb-01': { min: 4, max: 8 },
  'hk-sb-02': { min: 5, max: 9 },
  'hk-sb-03': { min: 2, max: 6 },
  'hk-sb-04': { min: 4, max: 8 },
  'hk-ac-01': { min: 2, max: 5 },
  'hk-ac-02': { min: 3, max: 7 },
  'hk-ac-03': { min: 5, max: 9 },
  'hk-ac-04': { min: 7, max: 14 },
  'hk-lk-01': { min: 3, max: 7 },
  'hk-lk-02': { min: 4, max: 8 },
  'hk-lk-03': { min: 5, max: 10 },
  'hk-lk-04': { min: 6, max: 12 },
  'hk-pg-01': { min: 4, max: 8 },
  'hk-pg-02': { min: 2, max: 6 },
  'hk-pg-03': { min: 5, max: 9 },
  'hk-pg-04': { min: 2, max: 6 },
  'hk-fc-01': { min: 2, max: 6 },
  'hk-fc-02': { min: 4, max: 8 },
  'hk-fc-03': { min: 1, max: 5 },
  'hk-fc-04': { min: 4, max: 9 },
  'hk-et-01': { min: 2, max: 6 },
  'hk-et-02': { min: 3, max: 7 },
  'hk-et-03': { min: 1, max: 5 },
  'hk-et-04': { min: 1, max: 5 },
  'hk-re-01': { min: 4, max: 9 },
  'hk-re-02': { min: 4, max: 11 },
  'hk-re-03': { min: 3, max: 9 },
  'hk-re-04': { min: 5, max: 11 },
  'hk-se-01': { min: 4, max: 8 },
  'hk-se-02': { min: 5, max: 9 },
  'hk-se-03': { min: 6, max: 11 },
  'hk-se-04': { min: 6, max: 16 },
  'hk-gk-01': { min: 3, max: 8 },
  'hk-gk-02': { min: 5, max: 11 },
  'hk-gk-03': { min: 7, max: 15 },
  'hk-gk-04': { min: 4, max: 11 }
};

let content = fs.readFileSync('src/data/products.js', 'utf8');

for (const [id, bounds] of Object.entries(ageMap)) {
  const pattern = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?ageRange:\\s*"[^"]+")`, 'm');
  content = content.replace(pattern, (match) => {
    if (!match.includes('ageMin:')) {
      return `${match},\n    ageMin: ${bounds.min},\n    ageMax: ${bounds.max}`;
    }
    return match;
  });
}

fs.writeFileSync('src/data/products.js', content, 'utf8');
console.log('Successfully updated src/data/products.js with ageMin and ageMax!');
