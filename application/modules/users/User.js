const md5 = require('md5');

class User {
    constructor(db) {
        this.db = db;
    }

    fill({ id, login, password, name, token }) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.name = name;
        this.token = token;
    }

    // возвращает самого юзера для внутреннего использования
    self() {
        return {
            id: this.id,
            login: this.login,
            password: this.password,
            name: this.name,
            token: this.token
        }
    }

    // возвращает сериализованный объект для любого другого пользователя
    get() {
        return {
            id: this.id,
            name: this.name
        }
    }

    async auth(data = {}) {
        const { login, passHash, token, num } = data;
        if (login && passHash && token && num) {
            if (token === md5(passHash + num)) {
                const userData = await this.db.getUserByLogin(login);
                if (userData && passHash === userData.password) {
                    await this.db.updateUserToken(userData.id, token);
                    this.fill({ ...userData, token });
                    return true;
                }
            }
        }
        return false;
    }

    async registration(data = {}) {
        const { login, name, passHash, token, num } = data;
        if (login && name && passHash && token && num && token === md5(passHash + num)) {
            const userData = await this.db.getUserByLogin(login);
            if (!userData) {
                const result = await this.db.addUser(login, name, passHash, token);
                if (result) {
                    this.fill({ login, password: passHash, name, token });
                    return true;
                }
            }
        }
        return false;
    }

    async logout(token) {
        if(token) {
            await this.db.deleteUserToken(token);
            return true;
        }
        return false;
    }
}

module.exports = User;