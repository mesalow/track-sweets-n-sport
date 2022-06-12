import { IpcMainInvokeEvent } from "electron";
import { Database } from "sqlite";

export interface DayDTO {
    year: number,
    month: number,
    day: number,
    sweetConsumption: boolean,
    sportActivity: boolean,
    currentWeight: number
} 

export interface UpdateResponse {
    status: "OK" | "NOTOK",
    error?: any,
    data?: any
}

export const  updateDay = (dbConnection: Database) => async function (event: IpcMainInvokeEvent,day: DayDTO): Promise<UpdateResponse> {
    console.log('updateDay', day);
    await dbConnection.run(`UPDATE tracked_day SET 'sweet_intake' = ${day.sweetConsumption ? 1: 0} WHERE tracked_day.y = ${day.year} AND tracked_day.m = ${day.month} AND tracked_day.d = ${day.day}`)
    return {status: "OK"};
}