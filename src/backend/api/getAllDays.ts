import { IpcMainInvokeEvent } from "electron";
import { Database } from "sqlite";
import { DayDTO } from "./updateDay";

export const getAllDays =  (dbConnection: Database) => async function (event: IpcMainInvokeEvent, month: number): Promise<DayDTO[]> {
    return [
        { year: 2022, month: 6, day: 1, sweetConsumption: true, sportActivity: true, currentWeight: 100},
        { year: 2022, month: 6, day: 2, sweetConsumption: false, sportActivity: true, currentWeight: 100},
    ];
} 