import { setBreedIcon } from '../../src/helper/textHelper'

test('Converting expected text', () => {
    const testCase = ['normal', 'premium', 'champion']
    const expectedIcon = [ '🥉', '🥈', '🥇']
    
    testCase.forEach((testCase, index) => {
        expect(setBreedIcon(testCase)).toEqual(expectedIcon[index]);
    });
});

test('Converting unexpected text', () => {
    const testCases = [
        '1 2 3 4 5 6 7 8 9 0',
        `! @ # $ % ^ & * ( ) [ ] ; ' , . / - +`,
        'Timotius Wirawan'
      ]
    
    testCases.forEach((testCase) => {
        expect(setBreedIcon(testCase)).toEqual(null);
    });
});