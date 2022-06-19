import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { electronAPI } from '../preload';
import { DayDTO } from '../backend/api/updateDay';
import { Calendar } from './components/calendar';
import { getNumberOfDays, monthFromDate } from './components/calendar/helper';

declare global {
    interface Window {
        myAPI: electronAPI;
    }
}
const containerElement = document.getElementById('app')
if (!containerElement) {
    throw new Error('did not find root container with id "app"');
}
const root = ReactDOM.createRoot(containerElement);
function App() {
    const [days, setDays ] = useState([] as DayDTO[]);
    const [year, setYear] = useState(2022);
    const [month, setMonth] = useState(6);
    const [userHasUpdated, setUserHasUpdated] = useState(0);
    const updateDays = async(month: number): Promise<any> => {
        console.log('call to myApi with month', month);
        const daysFromAPI = await window.myAPI.getAllDays(year, month);
        if (daysFromAPI.length === 0) {
            await window.myAPI.fillMonth(year, month, getNumberOfDays(monthFromDate(new Date(year, month - 1, 15))));
            return await updateDays(month);
        }
        console.log('received days %o', daysFromAPI);
        setDays(daysFromAPI);
    }
    const onDayUpdate = () => {
        setUserHasUpdated(userHasUpdated+1);
    }
    useEffect(() => {
        updateDays(month);
    }, [month, userHasUpdated])
    return (<div>
        <h2>Die Sticker App</h2>
        <p>Current month is June</p>
        <select value={month} onChange={(event) => { setMonth(parseInt(event.target.value,10)); }}>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((monthNumber, idx) => (<option key={idx}>{monthNumber}</option>))}
        </select>
        <Calendar days={days} monthInCalendar={monthFromDate(new Date(year, month - 1, 15))} onChange={onDayUpdate}></Calendar>
        </div>);
}

root.render(<App></App>)