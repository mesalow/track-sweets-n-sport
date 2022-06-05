import { IpcMainInvokeEvent, IpcRendererEvent } from "electron";
import { Database } from "sqlite"

export interface StatisticsDTO {
    sweets: {
        longestRunWithout: number,
        meanRunWithout: number,
        currentRunLength: number
    }
} 


export const getStatistics = (dbConnection: Database) => async function (event: IpcMainInvokeEvent): Promise<StatisticsDTO> {
    return {
        sweets: {
            longestRunWithout: 0,
            meanRunWithout: 0,
            currentRunLength: 0,
        }   
    };
}