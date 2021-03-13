class Chat {
    constructor({ io, MESSAGES }) {
        this.io = io;
        this.MESSAGES = MESSAGES;
        this.users = [];
        // обработчик соединения для КАЖДОГО клиента
        io.on('connection', socket => {
            socket.on(MESSAGES.SEND_MESSAGE, data => this.sendMessage(data, socket));

            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });
    }

    sendMessage(data, socket) {
        socket.emit(this.MESSAGES.SEND_MESSAGE, data);
    }
}

module.exports = Chat;