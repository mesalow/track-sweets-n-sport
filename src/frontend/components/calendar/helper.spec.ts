import "mocha";
import  {expect}from 'chai';

import { DayInMonth, getNumberOfWeeks, getWeeks } from "./helper";

describe('getWeekNumber', () => {
    it('should work correctly for monday as start', () => {
        const result = getNumberOfWeeks([1, 30]);
        expect(result).to.be.equal(5);
    })
    it('should work correctly for sunday as start', () => {
        const result = getNumberOfWeeks([0, 30]);
        expect(result).to.be.equal(6);
    })
    it('should work correctly with start in the middle', () => {
        const result = getNumberOfWeeks([4, 30]);
        expect(result).to.be.equal(5);
    })
    it('should work correctly for Monday as start with february', () => {
        console.log('monday, feb');
        const result = getNumberOfWeeks([1, 28]);
        expect(result).to.be.equal(4);
    })
    it('should work correctly for sunday as start with february', () => {
        const result = getNumberOfWeeks([0, 28]);
        expect(result).to.be.equal(5);
    })
})

describe('getWeeks', () => {
    it('should work correctly', () => {
        const firstOfJune2022 = new Date(2022, 5, 1);
        const result = getWeeks(firstOfJune2022);
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