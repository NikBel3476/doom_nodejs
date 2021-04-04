const Module = require('../Module');

class ChatManager extends Module {
    constructor(options) {
        super(options);
        // обработчик соединения для КАЖДОГО клиента
        this.io.on('connection', socket => {
            socket.on(this.MESSAGES.SEND_MESSAGE, data => this.saveMessage(data));
            // enter to chat
            // leave chat
            // set online

            // set offline

            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });

        //this.getAllUsers = this.mediator.get(this.TRIGGERS.GET_ALL_USERS);
        this.mediator.subscribe(this.EVENTS.USER_LOGIN, user => this.userLogin(user));
        this.mediator.subscribe(this.EVENTS.USER_LOGOUT, user => this.userLogout(user));
    }

    userLogin(user) {
        this.io.emit(this.MESSAGES.USER_ONLINE, user);
    }

    userLogout(user) {
        this.io.emit(this.MESSAGES.USER_OFFLINE, user);
    }

    async saveMessage(data) {
        if (data) {
            const { message, token } = data;
            const user = await this.db.getUserByToken(token);
            if (user) {
                const messAdded = await this.db.addMessage(user.id, message);
                if (messAdded) {
                    const result = {
                        message,
                        name: user.name
                    };
                    this.io.emit(this.MESSAGES.GET_MESSAGE, result);
                }
            }
        }
    }
}

module.exports = ChatManager;