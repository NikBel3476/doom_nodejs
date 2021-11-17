const SETTINGS = {
    HOST: 'http://localhost',
    PORT: 3001,

    DATABASE: {
        HOST: 'localhost',
        PORT: 5432,
        NAME: 'vm21-db',
        USER: 'vm21-user',
        PASS: 'postgres'
    },

    // все события, котореы есть в сокетах
    MESSAGES: {
        GET_MESSAGE: 'GET_MESSAGE',
        SEND_MESSAGE: 'SEND_MESSAGE',
        LOGIN: 'LOGIN',
        REGISTRATION: 'REGISTRATION',
        LOGOUT: 'LOGOUT',
        USER_ONLINE: 'USER_ONLINE',
        USER_OFFLINE: 'USER_OFFLINE',
        CREATE_ROOM: 'CREATE_ROOM',
        JOIN_GAME: 'JOIN_GAME',
        LEAVE_GAME: 'LEAVE_GAME',
        GET_GAMES: 'GET_GAMES',
        USER_ENTER_CHAT: 'USER_ENTER_CHAT',
        USER_LEAVE_CHAT: 'USER_LEAVE_CHAT',
        MOVE: 'MOVE',
        STOP_MOVE: 'STOP_MOVE',
        CHANGE_DIRECTION: 'CHANGE_DIRECTION',
        GET_SCENE: 'GET_SCENE',
        GET_NAMES: 'GET_NAMES',
        SPEED_UP: 'SPEED_UP',
        SPEED_DOWN: 'SPEED_DOWN',
        SPEED_CHANGE: 'SPEED_CHANGE',
        CHANGE_PASSWORD: 'CHANGE_PASSWORD',
        LOGOUT_ALL_USERS: 'LOGOUT_ALL_USERS'
    },

    MEDIATOR: {
        EVENTS: {
            TEST_EVENT: 'TEST_EVENT',
            USER_LOGIN: 'USER_LOGIN',
            USER_LOGOUT: 'USER_LOGOUT',
            USER_REGISTRATION: 'USER_REGISTRATION',
            USER_ENTER_ROOM: 'USER_ENTER_ROOM',
            USER_LEAVE_ROOM: 'USER_LEAVE_ROOM'
        },
        TRIGGERS: {
            TEST_TRIGGER: 'TEST_TRIGGER',
            GET_ALL_USERS: 'GET_ALL_USERS',
            GET_ALL_ROOMS: 'GET_ALL_ROOMS'
        }
    }
};

module.exports = SETTINGS;
