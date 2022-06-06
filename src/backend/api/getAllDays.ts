import { IpcMainInvokeEvent } from "electron";
import { Database } from "sqlite";
import { DayDTO } from "./updateDay";

export const getAllDays =  (dbConnection: Database) => async function (event: IpcMainInvokeEvent, year: number, month: number): Promise<DayDTO[]> {
    console.log('getAllDays, args:', year, month);
    const rows = await dbConnection.all(`SELECT * FROM tracked_day WHERE y = ${year} AND m = ${month};`);
    return rows.map((row) => {
        return {
            year: row.y,
            month: row.m,
            day: row.d,
            sweetConsumption: row.sweet_intake === 1,
            sportActivity: row.sport_activity === 1,
            currentWeight: row.current_weight
        }
    });
} 