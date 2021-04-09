const { Client } = require('pg');
const ORM = require('./ORM');

class DB {
    constructor({ HOST, PORT, NAME, USER, PASS }) {
        this.db = new Client({
            host: HOST,
            port: PORT,
            database: NAME,
            user: USER,
            password: PASS
        });
        this.orm = new ORM(this.db);
        // connect to db
        (async () => {
            await this.db.connect();
        })();
    }

    destructor() {
        if (this.db) {
            this.db.end();
            this.db = null;
        }
    }

    async getUserByLogin(login) {
        const result = this.db.query(
            'SELECT * FROM users WHERE login=$1',
            [login]
        );
        return (await result).rows[0];
    }
    /*getUserByLogin(login) {
        return this.orm.detail('users', { login });
    }*/

    async getUserByToken(token) {
        const result = this.db.query(
            'SELECT * FROM users WHERE token=$1',
            [token]
        );
        return (await result).rows[0];
    }

    async getAllUsers() {
        const result = this.db.query(
            'SELECT * FROM users'
        );
        return (await result).rows;
    }

    async addUser(login, name, password, token) {
        try {
            this.db.query(
                'INSERT INTO users (login, name, password, token) VALUES ($1, $2, $3, $4)',
                [login, name, password, token]
            );
            return true;
        } catch (err) {
            console.log(err.stack);
        }
    }

    async addMessage(id, message) {
        try {
            this.db.query(
                `INSERT INTO messages (user_id, message, date) VALUES ($1, $2, to_timestamp(${Date.now() / 1000}))`,
                [id, message]
            );
            return true;
        } catch (err) {
            console.log(err.stack);
            return false;
        }
    }

    updateUserToken(id, token) {
        try {
            this.db.query(
                'UPDATE users SET token=$1 WHERE id=$2',
                [token, id]
            );
            return true;
        } catch (err) {
            console.log(err.stack);
            return false;
        }
    }

    deleteUserToken(token) {
        try {
            this.db.query(
                "UPDATE users SET token='' WHERE token=$1",
                [token]
            );
            return true;
        } catch (err) {
            console.log(err.stack);
            return false;
        }
    }
}

module.exports = DB;