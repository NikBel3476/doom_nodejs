const md5 = require('md5');
const Module = require('../Module');
const User = require('./User');

class UserManager extends Module {

    constructor(options) {
        super(options);
        this.users = {};
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
        const user = new User(this.db);
        if (await user.login(data)) {
            this.users[user.id] = user;
            socket.emit(this.MESSAGES.LOGIN, user.self().token);
            this.mediator.call(this.EVENTS.USER_LOGIN, user.get());
            return;
        }
        socket.emit(this.MESSAGES.LOGIN, false);
    }

    async logout(token, socket) {
        const user = this.getUserByToken(token);
        if (user && user.logout()) {
            this.mediator.call(this.EVENTS.USER_LOGOUT, user.get());
            delete this.users[user.id];
            socket.emit(this.MESSAGES.LOGOUT, true);
            return;
        }
        socket.emit(this.MESSAGES.LOGOUT, false);
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

module.exports = UserManager;