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
            'INSERT INTO user (login, name, password, token) VALUES (?, ?, ?, ?)',
            [login, name, password, token]
        );
    }

    addMessage(id, message) {
        return this.db.run(
            'INSERT INTO message (user_id, message) VALUES (?,?)',
            [id, message]
        );
    }

    updateUserToken(id, token) {
        return this.db.run(
            'UPDATE user SET token=? WHERE id=?',
            [token, id]
        );
    }

    deleteUserToken(token) {
        return this.db.run(
            "UPDATE user SET token='' WHERE token=?",
            [token]
        );
    }
}

module.exports = DB;