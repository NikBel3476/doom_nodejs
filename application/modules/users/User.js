const md5 = require('md5');

class User {
    constructor(db) {
        this.db = db;
    }

    fill({ id, login, password, name, token, status }) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.name = name;
        this.token = token;
        this.status = status;
    }

    // возвращает самого юзера для внутреннего использования
    self() {
        return {
            id: this.id,
            login: this.login,
            password: this.password,
            name: this.name,
            token: this.token,
            status: this.status,
        }
    }

    // возвращает сериализованный объект для любого другого пользователя
    get() {
        return {
            id: this.id,
            name: this.name
        }
    }

    async login(data = {}) {
        const { login, passHash, token, num } = data;
        if (login && passHash && token && num) {
            if (token === md5(passHash + num)) {
                const userData = await this.db.getUserByLogin(login);
                if (userData && passHash === userData.password) {
                    await this.db.updateUserToken(userData.id, token);
                    await this.db.updateUserStatus(userData.id, 'online');
                    this.fill({ ...userData, token, status: 'online' });
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports = User;