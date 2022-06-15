import { capitalizeFirst, camelToNormalUpperCase, setBreedIcon } from '../../src/helper/textHelper'

describe('Testing textHelper function', () => {
    /* Function: capitalizeFirst */
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

    /* Function: setBreedIcon */
    // Positive testing
    test('Converting expected text', () => {
        const testCase = ['normal', 'premium', 'champion']
        const expectedIcon = [ '🥉', '🥈', '🥇']
        
        testCase.forEach((testCase, index) => {
            expect(setBreedIcon(testCase)).toEqual(expectedIcon[index]);
        });
    });

    // Negative testing
    test('Converting unexpected text', () => {
        const testCases = [
            '1 2 3 4 5 6 7 8 9 0',
            `! @ # $ % ^ & * ( ) [ ] ; ' , . / - +`,
            'Timotius Wirawan'
        ]
        
        testCases.forEach((testCase) => {
            expect(setBreedIcon(testCase)).toEqual(false);
        });
    });

    /* Function: camelToNormalUpperCase */
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
        ]
        testCases.forEach(testCase => {
            expect(camelToNormalUpperCase(testCase)).toEqual(testCase);
        });
    });
})