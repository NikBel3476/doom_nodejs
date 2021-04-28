const Module = require('../Module');

class ChatManager extends Module {
    constructor(options) {
        super(options);
        // обработчик соединения для КАЖДОГО клиента
        this.io.on('connection', socket => {
            socket.on(this.MESSAGES.SEND_MESSAGE, data => this.saveMessage(data, socket.rooms));
            socket.on('disconnect', () => console.log(`${socket.id} disconnected!`));
        });

        this.rooms = this.mediator.get(this.TRIGGERS.GET_ALL_ROOMS);
        //this.getAllUsers = this.mediator.get(this.TRIGGERS.GET_ALL_USERS);
        /* this.mediator.subscribe(this.EVENTS.USER_LOGIN, user => this.userLogin(user));
        this.mediator.subscribe(this.EVENTS.USER_REGISTRATION, user => this.userLogin(user));
        this.mediator.subscribe(this.EVENTS.USER_LOGOUT, user => this.userLogout(user)); */
        this.mediator.subscribe(this.EVENTS.USER_ENTER_ROOM, data => this.userEnterRoom(data));
        this.mediator.subscribe(this.EVENTS.USER_LEAVE_ROOM, data => this.userLeaveRoom(data));
    }

    /* userLogin(user) {
        this.io.emit(this.MESSAGES.USER_ONLINE, user);
    }

    userLogout(user) {
        this.io.emit(this.MESSAGES.USER_OFFLINE, user);
    } */

    async userEnterRoom(data) {
        const user = await this.db.getUserByToken(data.token);
        this.io.to(data.roomName).emit(this.MESSAGES.USER_ENTER_CHAT, user.name);
    }

    async userLeaveRoom(data) {
        const user = await this.db.getUserByToken(data.token); 
        this.io.to(data.roomName).emit(this.MESSAGES.USER_LEAVE_CHAT, user.name);
    }

    async saveMessage(data, rooms) {
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
                    //this.io.to().emit(this.MESSAGES.GET_MESSAGE, result);
                    this.io.emit(this.MESSAGES.GET_MESSAGE, result);
                }
            }
        }
    }
}

module.exports = ChatManager;