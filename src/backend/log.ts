import { app } from "electron";
import { appendFileSync } from "fs";
import path from "path";

export function log(string: string) 
{
    const appDataDir = app.getPath('userData');
    const logFilePath = path.join(appDataDir, 'log.txt');
    appendFileSync(logFilePath, string);
}