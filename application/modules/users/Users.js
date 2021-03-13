class Users {
    constructor({ io, MESSAGES }) {
        this.io = io;
        this.MESSAGES = MESSAGES;
        this.users = [];
        // обработчик соединения для КАЖДОГО клиента
        io.on('connection', socket => {
            socket.on(MESSAGES.SEND_LOGIN, data => this.checkLogin(data, socket));

            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });
    }

    checkLogin(data, socket) {
        let isDuplicate = false;
        this.users.forEach((elem) => {
            if (elem === data.name) {
                isDuplicate = true;
            }
        });
        if (!isDuplicate) {
            this.users.push(data.name);
            socket.emit(this.MESSAGES.SEND_LOGIN, { result: data.name });
        } else {
            socket.emit(this.MESSAGES.SEND_LOGIN, { result: false });
        }
    }
}

module.exports = Users;