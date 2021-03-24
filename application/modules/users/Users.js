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
        this.io.on('connect', (socket) => console.log(`${socket.id} connected`));
        this.io.on('connection', socket => {
            socket.on(this.MESSAGES.LOGIN, data => this.login(data, socket));
            socket.on(this.MESSAGES.REGISTRATION, data => this.registrtion(data, socket));

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
                    const result = await this.db.updateUserToken(user.id, token);
                    if (result) {
                        this.db.updateUserStatus(user.id, 'online');
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

    async getAllUsers() {
        const users = await this.db.getAllUsers();
        return users;
    }
}

module.exports = Users;