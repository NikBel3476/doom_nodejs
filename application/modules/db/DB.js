const { Client } = require('pg');

class DB {
    constructor() {
        this.db = new Client({
            host: 'localhost',
            port: 5433,
            database: 'vm21-db',
            user: 'vm21-user',
            password: '123456'
        });
        // connect to db
        (async () => {
            await this.db.connect();

            const query = 'SELECT * FROM users WHERE id=$1';
            const result = await this.db.query(query, [2]);

            console.log(result.rows);
        })();
    }

    destructor() {
        if (this.db) {
            this.db.end();
            this.db = null;
        }
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