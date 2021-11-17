const md5 = require('md5');

class User {
    constructor({ db }) {
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

    async auth({ login, hash, num } = {}) {
        if(login && hash && num) {
            const userData = await this.db.getUserByLogin(login);
            if(userData && hash === md5(userData.password + String(num))) {
                const token = md5(hash + Math.round(Math.random() * 1000000));
                await this.db.updateUserToken(userData.id, token);
                this.fill({ ...userData, token });
                return true;
            }
        }
        return false;
    }

    async registration({ login, nickname, passHash} = {}) {
        if (login && nickname && passHash) {
            const data = await this.db.getUserByLogin(login);
            if (!data) {
                const result = await this.db.addUser(login, nickname, passHash);
                if (result) {
                    const token = md5(passHash + Math.round(Math.random() * 1000000));
                    const userData = await this.db.getUserByLogin(login);
                    await this.db.updateUserToken(userData.id, token);
                    this.fill({ ...userData, token });
                    return true;
                }
            }
        }
        return false;
    }

    async logout() {
        return true;
    }

    move() {
        return null;
    }
}

module.exports = User;
