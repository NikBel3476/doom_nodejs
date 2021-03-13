class Users {
    constructor({ io, MESSAGES }) {
        this.io = io;
        this.MESSAGES = MESSAGES;
        this.users = [];
        // обработчик соединения для КАЖДОГО клиента
        io.on('connection', socket => {
            socket.on(MESSAGES.SEND_LOGIN, data => this.checkLogin(data, socket));
            socket.on(MESSAGES.LOGIN, data => this.login(data, socket));
            socket.on(MESSAGES.REGISTRATION, data => this.registrtion(data, socket));

            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });
    }

    login(data, socket) {
        socket.emit(this.MESSAGES.LOGIN, data);
    }

    registrtion(data, socket) {
        socket.emit(this.MESSAGES.REGISTRATION, data);
    }
}

module.exports = Users;