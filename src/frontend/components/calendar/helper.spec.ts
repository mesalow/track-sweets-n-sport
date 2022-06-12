import "mocha";
import  {expect}from 'chai';

import { DayInMonth, getNumberOfWeeks, getWeeks, isInMonth, monthFromDate } from "./helper";

describe('getWeekNumber', () => {
    it('should work correctly for monday as start', () => {
        const result = getNumberOfWeeks([0, 30]);
        expect(result).to.be.equal(5);
    })
    it('should work correctly for sunday as start', () => {
        const result = getNumberOfWeeks([6, 30]);
        expect(result).to.be.equal(6);
    })
    it('should work correctly with start in the middle', () => {
        const result = getNumberOfWeeks([3, 30]);
        expect(result).to.be.equal(5);
    })
    it('should work correctly for Monday as start with february', () => {
        console.log('monday, feb');
        const result = getNumberOfWeeks([0, 28]);
        expect(result).to.be.equal(4);
    })
    it('should work correctly for sunday as start with february', () => {
        const result = getNumberOfWeeks([6, 28]);
        expect(result).to.be.equal(5);
    })
})
describe('monthFromDate', () => {
    it('should work correctly for Febuary', () => {
        const dateOfFeb2022 = new Date(2022, 1, 1);
        const result = monthFromDate(dateOfFeb2022);
        const expected = [1, 28];
        expect(result).to.be.deep.equal(expected);
    })
    
    it('should work correctly for June', () => {
        const dateOfJune2022 = new Date(2022, 5, 1);
        const result = monthFromDate(dateOfJune2022);
        const expected = [2, 30];
        expect(result).to.be.deep.equal(expected);
    })
    it('should work correctly for July', () => {
        const dateOfJuly2022 = new Date(2022, 6, 1);
        const result = monthFromDate(dateOfJuly2022);
        const expected = [4, 31];
        expect(result).to.be.deep.equal(expected);
    })

})

describe('isInMonth', () => {
    it('should return true for June and 01.06', () => {
        const month = monthFromDate(new Date(2022,5,1)); // returns 3, 30
        const day = [0,2] as DayInMonth; // first week, third day
        const result = isInMonth(month, day);
        expect(result).to.be.equal(true);
    });
    it('should return false for June and 31.05', () => {
        const month = monthFromDate(new Date(2022,5,1)); // returns 3, 30
        const day = [0,1] as DayInMonth; // first week, second day
        const result = isInMonth(month, day);
        expect(result).to.be.equal(false);
    });
    it('should return false for June and 01.07', () => {
        const month = monthFromDate(new Date(2022,5,1)); // returns 3, 30
        console.log('month',month);
        const day = [4,4] as DayInMonth; // fifth week, fifth day should be 01.07.
        const result = isInMonth(month, day);
        expect(result).to.be.equal(false);
    });
})
describe('getWeeks', () => {
    it('should work correctly for June', () => {
        const firstOfJune2022 = new Date(2022, 5, 1);
        const result = getWeeks(monthFromDate(firstOfJune2022));
        const expected: DayInMonth[] = [
        [ 0, 0],
           [ 0, 1],
           [ 0, 2],
           [ 0, 3],
           [ 0, 4],
           [ 0, 5],
           [ 0, 6],
            [ 1, 0],
           [ 1, 1],
           [ 1, 2],
           [ 1, 3],
           [ 1, 4],
           [ 1, 5],
           [ 1, 6],
            [ 2, 0],
           [ 2, 1],
           [ 2, 2],
           [ 2, 3],
           [ 2, 4],
           [ 2, 5],
           [ 2, 6],
            [ 3, 0],
           [ 3, 1],
           [ 3, 2],
           [ 3, 3],
           [ 3, 4],
           [ 3, 5],
           [ 3, 6],
            [ 4, 0],
           [ 4, 1],
           [ 4, 2],
           [ 4, 3],
           [ 4, 4],
           [ 4, 5],
           [ 4, 6],
        ];
       expect(result).to.deep.equal(expected);
    })
    
})