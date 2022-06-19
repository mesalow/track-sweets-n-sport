import * as sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import { app } from "electron";
import path from "path";


export async function connectAndPopulateDatabase() {
    const userDir = app.getPath('userData');
    const pathToDatabase = path.join(userDir,"database.db");
    console.log('opening or creating database at path', pathToDatabase);
    const db = await open({
        filename: pathToDatabase,
        driver: sqlite3.Database,
      });
      await db.migrate({migrationsPath: path.join("resources", "migrations")});
      await checkAndUpdatePeriod(db);
      return db;
}

async function checkAndUpdatePeriod(db: Database): Promise<void> {
    const periods = await db.all(`SELECT * FROM tracking_period`);
    if (periods.length === 0) {
        await db.run(`INSERT INTO tracking_period ('start_y', 'start_m', 'start_d') VALUES ('2022','6','1')`)
    }
}