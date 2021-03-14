const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

class DB {

    constructor() {
        (async () => {
        // open the database
            this.db = await open({
                filename: './application/modules/db/vm21.db',
                driver: sqlite3.Database
            })
        })()
    }

    async getUserByLogin(login) {
        const user = await this.db.get(
            'SELECT * FROM users WHERE login=?', 
            [login]    
        );
        return user;
    }

    addUser(login, name, password, token) {
        this.db.run(
            `INSERT INTO users (login, name, password, token) VALUES (?, ?, ?, ?)`,
            [login, name, password, token],
        );
        return true;
    }
}

module.exports = DB;