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
    console.log(day);
    return {status: "OK"};
}