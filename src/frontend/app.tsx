import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { electronAPI } from '../preload';
import { DayDTO } from '../backend/api/updateDay';

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
    const [month, setMonth] = useState(6);
    const updateDays = async(month: number) => {
        console.log('call to myApi with month', month);
        const daysFromAPI = await window.myAPI.getAllDays(2022, month);
        console.log('received days %o', daysFromAPI);
        setDays(daysFromAPI);
    }
    useEffect(() => {
        updateDays(month);
    }, [month])
    return (<div>
        <h2>Hello from React!</h2>
        <p>Current month is June</p>
        <select onChange={(event) => setMonth(parseInt(event.target.value,10))}>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(monthNumber => (<option>{monthNumber}</option>))}
        </select>
        <ul>{days.map((day: DayDTO) => {  return (<li style={day.sweetConsumption ? {backgroundColor: 'red'} : {}}>{day.year} {day.month} {day.day} {day.sweetConsumption}</li>)})}</ul></div>);
}

root.render(<App></App>)