import { capitalizeFirst } from '../../src/helper/textHelper'

// Positive testing
test('Capitalize expected text', () => {
  const testName = 'timotius wirawan'
  const expectedName = 'Timotius Wirawan'
  expect(capitalizeFirst(testName)).toEqual(expectedName);
});

// Negative Testing
test('Capitalize unexpected text', () => {
  const testCases = [
    '1 2 3 4 5 6 7 8 9 0',
    `! @ # $ % ^ & * ( ) [ ] ; ' , . / - +`,
    'Timotius Wirawan'
  ]
  testCases.forEach(testCase => {
    expect(capitalizeFirst(testCase)).toEqual(testCase);
  });
});