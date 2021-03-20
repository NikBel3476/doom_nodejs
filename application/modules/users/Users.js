const Module = require('../Module');
const md5 = require('md5');

class Users extends Module {
    constructor(options) {
        super(options);
        this.users = [
            { name: 'Vasya' },
            { name: 'Petya', age: 18 }
        ];
        // обработчик соединения для КАЖДОГО клиента
        this.io.on('connection', socket => {
            socket.on(MESSAGES.LOGIN, data => this.login(data, socket));
            socket.on(MESSAGES.REGISTRATION, data => this.registrtion(data, socket));

            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });
        this.mediator.set(this.TRIGGERS.GET_ALL_USERS, () => this.users);
    }

    async login(data, socket) {
        const { login, passHash, token, num } = data;
        if (login && passHash && token && num) {
            if (token === md5(passHash + num)) {
                const user = await this.db.getUserByLogin(login);
                if (user && passHash === user.password) {
                    const result = this.db.updateUserToken(user.id, token);
                    if (result) {
                        this.db.changeUserStatus(user.id, 'online');
                        socket.emit(this.MESSAGES.LOGIN, token);
                    }
                }
            }
        }
    }

    async registrtion(data, socket) {
        const { login, nickname, passHash, token, num } = data;
        if (login && nickname && passHash && token && num) {
            if (token === md5(passHash + num)) {
                const user = await this.db.getUserByLogin(login);
                if (!user) {
                    const result = await this.db.addUser(login, nickname, passHash, token);
                    if (result) {
                        socket.emit(this.MESSAGES.REGISTRATION, token);
                    }
                }
            }
        }
    }
}

module.exports = Users;