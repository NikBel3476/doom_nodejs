const sqlite3 = require('sqlite3').verbose();

class DB {
    constructor() {
        this.db = new sqlite3.Database('./application/modules/db/vm21.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to vm21.db');
        });
    }

    getAllUsers(cb) {
        this.db.all('SELECT * FROM users', (err, rows) => cb(rows));
    }

    getUserByLogin(login, cb) {
        this.db.get(
            'SELECT * FROM users WHERE login=?', 
            [login], 
            (err, row) => cb(row)
        );
    }
}

module.exports = DB;