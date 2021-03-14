class Users {

    md5 = require('md5');

    constructor({ io, MESSAGES, db }) {
        this.io = io;
        this.MESSAGES = MESSAGES;
        this.db = db;
        this.users = [];
        // обработчик соединения для КАЖДОГО клиента
        io.on('connection', socket => {
            socket.on(MESSAGES.SEND_LOGIN, data => this.checkLogin(data, socket));
            socket.on(MESSAGES.LOGIN, data => this.login(data, socket));
            socket.on(MESSAGES.REGISTRATION, data => this.registrtion(data, socket));

            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });
    }

    /* login(data, socket) {
        const { login, passHash, token, num } = data;
        console.log(data);
        if (login && passHash && token && num) {
            if (token === this.md5(passHash + num)) {
                const result = this.db.addUser(login, passHash, token);
                console.log(result);
                socket.emit(this.MESSAGES.REGISTRATION, data);
            }
        }
        socket.emit(this.MESSAGES.LOGIN, data);
    } */

    async registrtion(data, socket) {
        const { login, nickname, passHash, token, num } = data;
        console.log(data);
        if (login && nickname && passHash && token && num) {
            if (token === this.md5(passHash + num)) {
                const user = await this.db.getUserByLogin(login, this.registrationAnswer);
                if (!user) {
                    const result = this.db.addUser(login, nickname, passHash, token);
                    if (result) {
                        socket.emit(this.MESSAGES.REGISTRATION, token);
                    }
                }
            }
        }
    }
}

module.exports = Users;