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

    getUserByLogin(login) {
        const user = this.db.get(
            'SELECT * FROM user WHERE login=?',
            [login]
        );
        return user;
    }

    getUserByToken(token) {
        const user = this.db.get(
            'SELECT * FROM user WHERE token=?',
            [token]
        );
        return user;
    }

    addUser(login, name, password, token) {
        const result = this.db.run(
            'INSERT INTO user (login, name, password, token, status) VALUES (?, ?, ?, ?, ?)',
            [login, name, password, token, 'online']
        );
        return result;
    }

    addMessage(id, message, date, time) {
        const result = this.db.run(
            'INSERT INTO message (user_id, message, date, time) VALUES (?,?,?,?)',
            [id, message, date, time]
        );
    }

    updateUserToken(id, token) {
        const result = this.db.run(
            'UPDATE user SET token=? WHERE id=?',
            [token, id]
        );
        return result;
    }

    changeUserStatus(id, status) {
        const result = this.db.run(
            'UPDATE user SET status=? WHERE id=?',
            [status, id]
        );
        return result;
    }
}

module.exports = DB;