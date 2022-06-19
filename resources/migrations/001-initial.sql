--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tracked_day (
    day_id INTEGER PRIMARY KEY,
    y INTEGER NOT NULL,
    m INTEGER NOT NULL,
    d INTEGER NOT NULL,
    sweet_intake NUMERIC NOT NULL DEFAULT 0 CHECK(sweet_intake == 0 or sweet_intake == 1),
    sport_activity NUMERIC NOT NULL DEFAULT 0 CHECK(sport_activity == 0 or sport_activity == 1),
    current_weight NUMERIC
);


CREATE TABLE IF NOT EXISTS tracking_period (
    period_id INTEGER PRIMARY KEY,
    start_y INTEGER NOT NULL,
    start_m INTEGER NOT NULL,
    start_d INTEGER NOT NULL,
    end_y INTEGER,
    end_m INTEGER,
    end_d INTEGER
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE day;
DROP TABLE period;