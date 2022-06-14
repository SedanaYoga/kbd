import { camelToNormalUpperCase } from '../../src/helper/textHelper'

// Positive testing
test('Separate expected text', () => {
  const testName = 'timotiusWirawan'
  const expectedName = 'Timotius Wirawan'
  expect(camelToNormalUpperCase(testName)).toEqual(expectedName);
});

// Negative Testing
test('Separate unexpected text', () => {
  const testCases = [
    '1 2 3 4 5 6 7 8 9 0',
    `! @ # $ % ^ & * ( ) [ ] ; ' , . / - +`,
    'Timotius Wirawan'
  ]
  testCases.forEach(testCase => {
    expect(camelToNormalUpperCase(testCase)).toEqual(testCase);
  });
});