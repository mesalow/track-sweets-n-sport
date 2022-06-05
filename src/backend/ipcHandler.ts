import { IpcMain } from "electron";
import { Database } from "sqlite";

export function handleIpcCommunication(dbConnection: Database, ipcMain: IpcMain): void {
    ipcMain.on('someEvent', () => {
        console.log('bla');
    })
}