class Users {

    md5 = require('md5');

    constructor({ io, MESSAGES, db }) {
        this.io = io;
        this.MESSAGES = MESSAGES;
        this.db = db;
        this.users = [];
        // обработчик соединения для КАЖДОГО клиента
        io.on('connection', socket => {
            socket.on(MESSAGES.LOGIN, data => this.login(data, socket));
            socket.on(MESSAGES.REGISTRATION, data => this.registrtion(data, socket));

            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });
    }

    async login(data, socket) {
        const { login, passHash, token, num } = data;
        if (login && passHash && token && num) {
            if (token === this.md5(passHash + num)) {
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
            if (token === this.md5(passHash + num)) {
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