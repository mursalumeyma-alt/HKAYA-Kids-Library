import https from 'node:https';
import fs from 'node:fs';

const log = fs.readFileSync('C:/Users/Administrator/.gemini/antigravity/brain/38a965c7-b7e8-4a02-b66c-f0270195c951/.system_generated/tasks/task-3130.log', 'utf8');
const tokenMatch = log.match(/"AccessToken":"([^"]+)"/);
if (!tokenMatch) {
  console.log('No token found');
  process.exit(1);
}
const token = tokenMatch[1];
console.log('Token found! Length:', token.length);

const wopiUrl = 'https://my.microsoftpersonalcontent.com/personal/5F1FC2D3F1DDF0D9/_vti_bin/wopi.ashx/files/6571c9e464114246ba8fc24d09f513f4/contents?access_token=' + token;

console.log('Requesting WOPI contents...');
const req = https.get(wopiUrl, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  const chunks = [];
  res.on('data', c => chunks.push(c));
  res.on('end', () => {
    const buf = Buffer.concat(chunks);
    console.log('Downloaded bytes:', buf.length);
    if (res.statusCode === 200) {
      if (!fs.existsSync('scratch')) fs.mkdirSync('scratch', { recursive: true });
      fs.writeFileSync('scratch/Hikaya_China_Sourcing_Checklist.xlsx', buf);
      console.log('SUCCESSFULLY SAVED TO scratch/Hikaya_China_Sourcing_Checklist.xlsx!');
    } else {
      console.log('Response body:', buf.toString('utf8').slice(0, 500));
    }
  });
});
req.on('error', e => console.error('Error:', e));
