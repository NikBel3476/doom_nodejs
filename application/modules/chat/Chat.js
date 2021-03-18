class Chat {
    constructor({ io, MESSAGES, db }) {
        this.io = io;
        this.MESSAGES = MESSAGES;
        this.users = [];
        this.db = db;
        // обработчик соединения для КАЖДОГО клиента
        io.on('connection', socket => {
            socket.on(MESSAGES.SEND_MESSAGE, data => this.saveMessage(data));

            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });
    }

    async saveMessage(data) {
        if (data) {
            const { message, token } = data;
            const user = await this.db.getUserByToken(token);
            if (user) {
                const date = new Date();
                const arr = date.toLocaleString("ru").split(', ');
                const messageDate = arr[0];
                const messageTime = arr[1]
                this.db.addMessage(user.id, message, messageDate, messageTime);
                const result = {
                    message: message,
                    messageTime: messageTime,
                    login: user.login
                };
                this.io.emit(this.MESSAGES.GET_MESSAGE, result);
            }
        }
    }

}

module.exports = Chat;