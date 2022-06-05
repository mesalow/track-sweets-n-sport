import { IpcMainInvokeEvent } from 'electron';
import { useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { DayDTO } from '../backend/api/updateDay';

type electronAPI = {
    getAllDays:(month: number) =>Promise<DayDTO[]>
}
declare global {
    interface Window {
        myAPI: electronAPI;
    }
}
const root = ReactDOM.createRoot(document.getElementById('app'));
function App() {
    const [days, setDays ] = useState([]);
    window.myAPI.getAllDays(3).then(daysFromAPI => {
        setDays(daysFromAPI);
    });
    return (<div>
        <h2>Hello from React!</h2>
        <p>Current month is June</p>
        <ul>{days.map((day: DayDTO) => { return (<li>{day.year}</li>)})}</ul></div>);
}

root.render(<App></App>)