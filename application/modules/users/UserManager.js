const Module = require('../Module');
const User = require('./User');

class UserManager extends Module {

    constructor(options) {
        super(options);
        // обработчик соединения для КАЖДОГО клиента
        this.io.on('connect', (socket) => console.log(`${socket.id} connected`));
        this.io.on('connection', socket => {
            socket.on(this.MESSAGES.LOGIN, data => this.login(data, socket));
            socket.on(this.MESSAGES.REGISTRATION, data => this.registration(data, socket));
            socket.on(this.MESSAGES.LOGOUT, token => this.logout(token, socket));
            socket.on(this.MESSAGES.GET_NAMES, () => this.getNames(socket));
            socket.on(this.MESSAGES.CHANGE_PASSWORD, ({ login, oldHash, newHash }) => this.changePassword({ login, oldHash, newHash }, socket));
            socket.on(this.MESSAGES.LOGOUT_ALL_USERS, ({ secretWord }) => this.logoutAllUsers(secretWord, socket));

            socket.on('disconnect', () => {
                for (let id in this.users) {
                    if (id === socket.id) {
                        delete this.users[id];
                        break;
                    }
                }
                console.log(`${socket.id} disconnected!`);
            });
        });

        this.users = {};
        this.authAttemptsAmount = {};
        this.bannedUsers = {};
        this.rooms = this.mediator.get(this.TRIGGERS.GET_ALL_ROOMS);
        this.mediator.set(this.TRIGGERS.GET_ALL_USERS, () => this.users);
    }

    async getNames(socket) {
        const userNames = await this.db.getNames();
        socket.emit(this.MESSAGES.GET_NAMES, userNames);
    }

    timeoutBan(login) {
        this.bannedUsers[login] = true;
        console.log(this.bannedUsers);
        setTimeout(() => this.unban(login), 5000);
        console.log(`Пользователь ${login} заблокирован`);
    }

    unban(login) {
        delete this.bannedUsers[login];
        console.log(`Пользователь ${login} разблокирован`);
    }

    async changePassword({ login, oldHash, newHash }, socket) {
        const userData = await this.db.getUserByLogin(login);
        console.log(userData);
        if (userData && oldHash === userData.password) {
            const result = this.db.updateUserPassword(userData.id, newHash);
            result ? 
                socket.emit(this.MESSAGES.CHANGE_PASSWORD, { result: true }) :
                socket.emit(this.MESSAGES.CHANGE_PASSWORD, { result: false })
        }
    }

    async login(data, socket) {
        const user = new User({ db: this.db });
        if (data.login in this.bannedUsers) {
            return socket.emit(this.MESSAGES.LOGIN, { result: false, text: 'Временная блокировка' });
        }
        if (await user.auth(data)) {
            if (!this.users[socket.id]) {
                this.users[socket.id] = user;
                console.log(`${user.name} авторизовался`);
                return socket.emit(this.MESSAGES.LOGIN, { result: true, token: user.self().token });
            }
        } else {
            if (data.login in this.authAttemptsAmount) {
                this.authAttemptsAmount[data.login]++;
            } else {
                this.authAttemptsAmount[data.login] = 1;
            }
            console.log(`${data.login} : ${this.authAttemptsAmount[data.login]} attempts`);
            if (this.authAttemptsAmount[data.login] >= 3) {
                this.timeoutBan(data.login);
            }       
        }
        return socket.emit(this.MESSAGES.LOGIN, { result: false });
    }
    
    async registration(data, socket) {
        const user = new User({ db: this.db, socketId: socket.id });
        if (await user.registration(data)) {
            this.users[user.id] = user;
            return socket.emit(this.MESSAGES.REGISTRATION, user.self().token);
        }
        return false;
    }

    async logout(token, socket) {
        if (this.users[socket.id]) {
            delete this.users[socket.id];
            return socket.emit(this.MESSAGES.LOGOUT, true);
        }
        return socket.emit(this.MESSAGES.LOGOUT, false);
    }

    async logoutAllUsers(secretWord, socket) {
        if (secretWord === "logout") {
            return this.io.emit(this.MESSAGES.LOGOUT, true);
        }
        return socket.emit(this.MESSAGES.LOGOUT_ALL_USERS, { data: "Неверное кодовое слово"});
    }

    async getAllUsers() {
        const users = await this.db.getAllUsers();
        return users;
    }
}

module.exports = UserManager;
