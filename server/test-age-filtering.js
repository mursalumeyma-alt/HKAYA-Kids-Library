import { db } from './db/database.js';
import { matchesAgeGroup, AGE_GROUPS } from '../src/data/categories.js';
import { PRODUCTS } from '../src/data/products.js';

console.log('--- Testing Age Filtering & Mixed Collections ---');

const testBrackets = ['0-2', '3-5', '6-8', '9-12', '13+'];

for (const bracketId of testBrackets) {
  const bracket = AGE_GROUPS.find(b => b.id === bracketId);
  if (!bracket) throw new Error(`Bracket ${bracketId} not found`);

  // Test 1: In-memory product matching
  const matchedInMemory = PRODUCTS.filter(p => matchesAgeGroup(p, bracketId));
  const inMemoryCategories = [...new Set(matchedInMemory.map(p => p.category))];

  // Test 2: Database product matching
  const matchedInDb = db.prepare(`
    SELECT * FROM products
    WHERE active = 1 AND age_min <= ? AND age_max >= ?
  `).all(bracket.maxAge, bracket.minAge);
  const dbCategories = [...new Set(matchedInDb.map(p => p.category))];

  console.log(`\n✓ Age Bracket ${bracket.label} (${bracketId}):`);
  console.log(`  - In-Memory: ${matchedInMemory.length} products across ${inMemoryCategories.length} categories: [${inMemoryCategories.join(', ')}]`);
  console.log(`  - Database:  ${matchedInDb.length} products across ${dbCategories.length} categories: [${dbCategories.join(', ')}]`);

  if (matchedInDb.length === 0) {
    throw new Error(`Age bracket ${bracketId} returned 0 products!`);
  }
  if (dbCategories.length < 2) {
    throw new Error(`Age bracket ${bracketId} does not have mixed categories!`);
  }
}

// Test Overlap behavior: Product with Age 5–9 must appear in 3-5, 6-8, and 9-12
console.log('\n--- Testing Overlap Rules ---');
const testProduct5to9 = { ageMin: 5, ageMax: 9, ageRange: '5–9 Years' };
console.log('Product [5–9 Years] in 3-5:', matchesAgeGroup(testProduct5to9, '3-5') ? 'PASS (True)' : 'FAIL');
console.log('Product [5–9 Years] in 6-8:', matchesAgeGroup(testProduct5to9, '6-8') ? 'PASS (True)' : 'FAIL');
console.log('Product [5–9 Years] in 9-12:', matchesAgeGroup(testProduct5to9, '9-12') ? 'PASS (True)' : 'FAIL');
console.log('Product [5–9 Years] in 0-2:', !matchesAgeGroup(testProduct5to9, '0-2') ? 'PASS (False)' : 'FAIL');

if (!matchesAgeGroup(testProduct5to9, '3-5') || !matchesAgeGroup(testProduct5to9, '6-8') || !matchesAgeGroup(testProduct5to9, '9-12') || matchesAgeGroup(testProduct5to9, '0-2')) {
  throw new Error('Overlap test failed for [5–9 Years]');
}

// Test Product with Age 6–12 must appear in 6-8 and 9-12, but not 3-5
const testProduct6to12 = { ageMin: 6, ageMax: 12, ageRange: '6–12 Years' };
console.log('Product [6–12 Years] in 6-8:', matchesAgeGroup(testProduct6to12, '6-8') ? 'PASS (True)' : 'FAIL');
console.log('Product [6–12 Years] in 9-12:', matchesAgeGroup(testProduct6to12, '9-12') ? 'PASS (True)' : 'FAIL');
console.log('Product [6–12 Years] in 3-5:', !matchesAgeGroup(testProduct6to12, '3-5') ? 'PASS (False)' : 'FAIL');

if (!matchesAgeGroup(testProduct6to12, '6-8') || !matchesAgeGroup(testProduct6to12, '9-12') || matchesAgeGroup(testProduct6to12, '3-5')) {
  throw new Error('Overlap test failed for [6–12 Years]');
}

// Test Coexistence: Age 6-8 + Category 'school-learning-essentials'
const age6to8School = db.prepare(`
  SELECT * FROM products
  WHERE active = 1 AND age_min <= 8 AND age_max >= 6 AND category = 'school-learning-essentials'
`).all();
console.log(`\n✓ Age 6-8 + Category school-learning-essentials: ${age6to8School.length} products`);
if (age6to8School.length === 0) throw new Error('Coexistence test failed');

console.log('\n===========================================');
console.log('ALL AGE FILTERING & OVERLAP TESTS PASSED! ✓');
console.log('===========================================');
