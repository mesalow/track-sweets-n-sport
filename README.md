# track-sweets-n-sport
A simple app to track days with sweets consumption and sport activity. Also provide some basic data aggregation like longest run without sweets or similar.

## Stack
React + Electron + SQLite
## Frontend
Basically one page with the following elements:
- A month picker to choose which month to look at. Default should be current month.
- A calendar view of the picked month. Each day can have different markings representing sweet consumption, sports activity etc. (can be added later, e.g. weight at the day, calorie intake, mood, steps per day etc.)
- A table or list of aggregated statistics. These can be added in later. E.g. current days without sweets, longest run without sweets, mean run lenght etc.

## Backend
Three use cases:
- update a day with new activity or marker
- load all days and their markers for a given month
- generate statistics (could also be done in the frontend? but in the backend we can juggle a bit with the SQL-queries)