import * as sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

export async function connectAndPopulateDatabase() {
    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database,
      });
      await db.migrate();
      await checkAndUpdatePeriod(db);
      return db;
}

async function checkAndUpdatePeriod(db: Database): Promise<void> {
    const periods = await db.all(`SELECT * FROM tracking_period`);
    if (periods.length === 0) {
        await db.run(`INSERT INTO tracking_period ('start_y', 'start_m', 'start_d') VALUES ('2022','6','1')`)
    }
}