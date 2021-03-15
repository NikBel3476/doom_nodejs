class Chat {
    constructor({ io, MESSAGES, db }) {
        this.io = io;
        this.MESSAGES = MESSAGES;
        this.users = [];
        this.db = db;
        // обработчик соединения для КАЖДОГО клиента
        io.on('connection', socket => {
            socket.on(MESSAGES.SEND_MESSAGE, data => this.sendMessage(data, socket));

            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });
    }

    sendMessage(data, socket) {
        socket.emit(this.MESSAGES.GET_MESSAGE, data);
    }

    /*
const date = new Date();
        const info = {
            year: date.getFullYear(),
            day: date.getDate(),
            month: date.getMonth(),
            time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        };
    */
}

module.exports = Chat;