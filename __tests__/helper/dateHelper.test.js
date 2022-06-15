import { diffTwoDateInMonths, dateTimeToISO } from '../../src/helper/dateHelper'

describe('Testing dateHelper function', () => {
    /* Function: diffTwoDateInMonths */
    // Positive testing
    test('Calculate differences two expected date', () => {
        const testDate = [new Date('2022-06-15T09:25:51.448Z'), new Date('2022-08-10T09:25:51.448Z')]
        const expectedDate = 2
        expect(diffTwoDateInMonths( testDate[0],testDate[1] )).toEqual(expectedDate);
    });
    
    // Negative Testing
    test('Calculate differences two unexpected date', () => {
        const testDate = [new Date('2022-08-10T09:25:51.448Z'), new Date('2022-06-15T09:25:51.448Z')]
        const expectedDate = null
        expect(diffTwoDateInMonths( testDate[0],testDate[1] )).toEqual(expectedDate);
    });
    
    /* Function: dateTimeToISO */
    // Positive testing
    test('Convert JS date time to ISO time', () => {
        const testDate = new Date('2022-06-15T09:37:48.921Z')
        const expectedDate = [ '6/15/2022,', '16:37:48' ]
        expect(dateTimeToISO( testDate )).toEqual(expectedDate);
    });
})