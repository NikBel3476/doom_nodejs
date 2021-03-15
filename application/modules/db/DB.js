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

    addUser(login, name, password, token) {
        const result = this.db.run(
            `INSERT INTO user (login, name, password, token, status) VALUES (?, ?, ?, ?, ?)`,
            [login, name, password, token, 'online']
        );
        return result;
    }

    addMessage(message, date, userId) {
        const result = this.db.run(
            `INSERT INTO message (date, user_id, message) VALUES (?, ?, ?)`,
            [date, userId, message]
        );
        return result;
    }

    updateUserToken(id, token) {
        const result = this.db.run(
            `UPDATE user SET token=? WHERE id=?`,
            [token, id]
        );
        return result;
    }

    changeUserStatus(id, status) {
        const result = this.db.run(
            `UPDATE user SET status=? WHERE id=?`,
            [status, id]
        );
        return result;
    }
}

module.exports = DB;