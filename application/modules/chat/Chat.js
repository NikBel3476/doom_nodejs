const Module = require('../Module');

class Chat extends Module {
    constructor(options) {
        super(options);
        // обработчик соединения для КАЖДОГО клиента
        this.io.on('connection', socket => {
            socket.on(this.MESSAGES.SEND_MESSAGE, data => this.saveMessage(data));

            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });

        console.log(this.mediator.get(this.TRIGGERS.GET_ALL_USERS));
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