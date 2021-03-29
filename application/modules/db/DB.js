const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

class DB {

    constructor() {
        // sqlite connect to db
        (async () => {
            // open the database
            this.db = await open({
                filename: './application/modules/db/vm21.db',
                driver: sqlite3.Database
            })
        })();
    }

    getUserByLogin(login) {
        return this.db.get(
            'SELECT * FROM user WHERE login=?',
            [login]
        );
    }

    getUserByToken(token) {
        return this.db.get(
            'SELECT * FROM user WHERE token=?',
            [token]
        );
    }

    getAllUsers() {
        return this.db.get(
            'SELECT * FROM user'
        );
    }

    addUser(login, name, password, token) {
        return this.db.run(
            'INSERT INTO user (login, name, password, token, status) VALUES (?, ?, ?, ?, ?)',
            [login, name, password, token, 'online']
        );
    }

    addMessage(id, message, date, time) {
        return this.db.run(
            'INSERT INTO message (user_id, message, date, time) VALUES (?,?,?,?)',
            [id, message, date, time]
        );
    }

    updateUserToken(id, token) {
        return this.db.run(
            'UPDATE user SET token=? WHERE id=?',
            [token, id]
        );
    }

    updateUserStatus(id, status) {
        return this.db.run(
            'UPDATE user SET status=? WHERE id=?',
            [status, id]
        );
    }
}

module.exports = DB;