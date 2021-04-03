const { Client } = require('pg');

class DB {
    constructor({ HOST, PORT, NAME, USER, PASS }) {
        this.db = new Client({
            host: HOST,
            port: PORT,
            database: NAME,
            user: USER,
            password: PASS
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

    async getUserByLogin(login) {
        const result = this.db.query(
            'SELECT * FROM users WHERE login=$1',
            [login]
        );
        return (await result).rows[0];
    }

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
                'INSERT INTO message (user_id, message) VALUES ($1, $2)',
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