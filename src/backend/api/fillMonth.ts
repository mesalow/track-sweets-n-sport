import { IpcMainInvokeEvent } from "electron";
import { Database } from "sqlite";

export const fillMonth = (dbConnection: Database) =>  async (event: IpcMainInvokeEvent, year:number, month: number, numberOfDays: number): Promise<any> => {
    for (const idx of Array.from(Array(numberOfDays), (v,i) => i+1)) {
        await dbConnection.run(`INSERT INTO tracked_day ('y', 'm', 'd', 'current_weight') VALUES (${year}, ${month}, ${idx}, 0)`)
    } 

}