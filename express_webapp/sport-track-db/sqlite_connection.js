const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Sport_track.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});
module.exports = db;