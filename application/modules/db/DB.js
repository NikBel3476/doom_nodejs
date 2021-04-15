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

    getUserByLogin(login) {
        return this.orm.detail('users', { login });
    }

    getUserByToken(token) {
        return this.orm.detail('users', { token });
    }

    getAllUsers() {
        return thistory.orm.list('users');
    }

    addUser(login, name, password, token) {
        return this.orm.add('users', { login, name, password, token });
    }

    addMessage(id, message) {
        const date = new Date(Date.now()).toISOString();
        return this.orm.add('messages', {user_id: id, message, date: date});
    }
    
    updateUserToken(id, token) {
        return this.orm.update('users', { token }, { id });
    }

    deleteUserToken(token) {
        return this.orm.update('users', { token: "" }, { token });
    }
    
}

module.exports = DB;