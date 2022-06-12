import { DayDTO } from "../../../backend/api/updateDay";
import { DayInMonth, getStartDayIndex, getWeeks, isInMonth, Month } from "./helper";

type CalendarProps = {
    days: DayDTO[],
    monthInCalendar: Month,
    onChange: () => void,
}

const weekDays = [
     'Montag',
     'Dienstag',
 'Mittwoch',
     'Donnerstag',
    'Freitag',
    'Samstag',
     'Sonntag'
]

export function Calendar(props: CalendarProps) {
    const calendarDays = getWeeks(props.monthInCalendar);
    // split calendarDays in sub-arrays of seven
    
    const weekArray = calendarDays.reduce((result: DayInMonth[][], dayInMonth, index) => {
        const currentSubArray = Math.floor(index / 7); 
        // create a new array
        if (index % 7 === 0) {
            result.push([]);
        }
        result[currentSubArray] = [...result[currentSubArray], dayInMonth];
        return result;
    }, [] );
    const getCurrentDayIndex = (weekIndex: number, dayIndex: number) => {
        return weekIndex * 7 +  dayIndex - getStartDayIndex(props.monthInCalendar) ;
    }
    console.log('days', props.days);
    const getDayInfo = (weekIndex: number, dayIndex: number): DayDTO => {
        console.log('getDayInfo, weekIndex', weekIndex, 'dayIndex', dayIndex);
        const currentIndex = getCurrentDayIndex(weekIndex, dayIndex);
        console.log('getDayInfo, trying to return currentIndex', currentIndex);
        return props.days.length === 0 ? {} as DayDTO : props.days[currentIndex];
    }
    const saveSweet = async (year: number, month:number, day: number) => {
        console.log('saveSweet');
        const currentDay = props.days.find((dayDTO) => dayDTO.year === year && dayDTO.month === month && dayDTO.day === day);
        if (!currentDay) throw new Error('did not find day in month to update, something went very wrong');

        await window.myAPI.updateDay({year, month, day, sweetConsumption: !currentDay.sweetConsumption, sportActivity: false, currentWeight: 0});
        props.onChange();
    }
    return (<div>
        <table>
            <thead><tr>
                {weekDays.map((dayName:string, dayIndex) => (
                    <th key={dayIndex}>{dayName}</th> ))}
            </tr></thead>
            <tbody>
            {weekArray.map((week, weekIndex) => (<tr key={weekIndex}>
                {week.map((dayInWeek, dayIndex) => {
                        if (!isInMonth(props.monthInCalendar, dayInWeek)) {
                            return <td key={dayIndex} style={{backgroundColor: 'grey'}}></td>
                        }
                        const dayInfo = getDayInfo(weekIndex, dayIndex);
                        return (
                        <td key={dayIndex} onClick={() => saveSweet(dayInfo.year, dayInfo.month, dayInfo.day)} style={{backgroundColor: dayInfo.sweetConsumption ? 'red' : 'white' }}>{
                            dayInfo.day
                        }</td>)
                    })}
            </tr>))}
            </tbody>
        </table>
        </div>)
}