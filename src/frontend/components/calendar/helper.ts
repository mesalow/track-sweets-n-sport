import { endOfMonth, startOfMonth, getDay, differenceInDays } from 'date-fns'


export type Month =  readonly [startWeekDay: number,  numberOfDays: number];
export type DayInMonth =  readonly [weekIndex: number, dayIndex: number];

export function getNumberOfWeeks(month: Month): number {
    const lengthOfMonth = getNumberOfDays(month);
    let startDayIndex = getStartDayIndex(month);
    // startDayIndex has 0 for sunday -> we want our rows to start on monday 
    if (startDayIndex === 0) {
        startDayIndex = 7;
    }
    startDayIndex--;
    // now it goes from 0 to 6, but starting at monday 
    const rawWeeks = Math.ceil( lengthOfMonth / 7)
    const rest = lengthOfMonth % 7;
    return rawWeeks + Math.floor((rest+startDayIndex+1)/7);
}
function getDayIndex(dayInMonth: DayInMonth) {
    return dayInMonth[1];
}
function getWeekIndex(dayInMonth: DayInMonth) {
    return dayInMonth[0];
}

function getStartDayIndex(month: Month) {
    return month[0];
}
function getNumberOfDays(month: Month) {
    return month[1];
}

function getEndDayIndex(month: Month) {
    const lengthOfMonth = getNumberOfDays(month);
    const startDayIndex = getStartDayIndex(month);
    const rest = lengthOfMonth % 7;
    if (rest + startDayIndex > 7) {
        return (rest+startDayIndex-7);
    }
    return rest + startDayIndex;
}


export function isInMonth(month: Month, dayInMonth: DayInMonth) {
    const weekIndex = getWeekIndex(dayInMonth);
    const dayIndex = getDayIndex(dayInMonth);
    return !( weekIndex === 0 && dayIndex < getStartDayIndex(month) || weekIndex === getNumberOfWeeks(month)-1 && dayIndex > getEndDayIndex(month))
}

export function monthFromDate(currentDate: Date): Month {
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const startDayIndex = getDay(firstDayOfMonth);
    const difference = differenceInDays(lastDayOfMonth, firstDayOfMonth);
    const month: Month = [startDayIndex, difference];
    return month;
}
export function getWeeks(currentDate: Date): DayInMonth[] {
    const month = monthFromDate(currentDate);
    // dayIndex = 0 - 6 , difference = length of month (?) 
    const numberOfWeeks = getNumberOfWeeks(month);
    console.log("getWeeks, numberOfWeeks", numberOfWeeks);
    const weekArray = Array.from(Array(numberOfWeeks), (v: undefined, week: number) => week);
    const result = weekArray.reduce((result, week) => {
        const arrayOfDays = Array.from(Array(7), (v: undefined, day: number) => {
            return [week, day] as DayInMonth;
        })
        return [...result, ...arrayOfDays ];
    }, [] as DayInMonth[]);
    console.log("getWeeks, result:" , result);
    return result;
}