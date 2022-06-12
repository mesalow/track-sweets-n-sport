import { IpcMain } from "electron";
import { Database } from "sqlite";

import { getAllDays } from './api/getAllDays';
import {  updateDay } from './api/updateDay';
import { getStatistics } from './api/getStatistics';
import { fillMonth } from "./api/fillMonth";


export function handleIpcCommunication(dbConnection: Database, ipcMain: IpcMain): void {
    ipcMain.handle('getAllDays', getAllDays(dbConnection));
    ipcMain.handle('fillMonth', fillMonth(dbConnection));
    ipcMain.handle('updateDay', updateDay(dbConnection));
    ipcMain.handle('getStatistics', getStatistics(dbConnection));
}