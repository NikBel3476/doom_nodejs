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
        GET_MESSAGE: 'GET_MESSAGE', // получить все сообщения
        SEND_MESSAGE: 'SEND_MESSAGE', // послать сообщение
        LOGIN: 'LOGIN',
        REGISTRATION: 'REGISTRATION',
        LOGOUT: 'LOGOUT',
        USER_ONLINE: 'USER_ONLINE', // пользователь успешно авторизовался и стал онлайн
        USER_OFFLINE: 'USER_OFFLINE', // пользователь успешно разлогинился и стал оффлайн
        CREATE_ROOM: 'CREATE_ROOM',
        JOIN_ROOM: 'JOIN_ROOM',
        LEAVE_ROOM: 'LEAVE_ROOM',
        GET_ROOMS: 'GET_ROOMS',
        USER_ENTER_CHAT: 'USER_ENTER_CHAT',
        USER_LEAVE_CHAT: 'USER_LEAVE_CHAT',
        MOVE: 'MOVE'
    },

    MEDIATOR: {
        EVENTS: {
            TEST_EVENT: 'TEST_EVENT',
            USER_LOGIN: 'USER_LOGIN', // пользователь авторизовался
            USER_LOGOUT: 'USER_LOGOUT', // пользователь разлогинился
            USER_REGISTRATION: 'USER_REGISTRATION',
            USER_ENTER_ROOM: 'USER_ENTER_ROOM',
            USER_LEAVE_ROOM: 'USER_LEAVE_ROOM'
            //...
        },
        TRIGGERS: {
            TEST_TRIGGER: 'TEST_TRIGGER',
            GET_ALL_USERS: 'GET_ALL_USERS',
            GET_ALL_ROOMS: 'GET_ALL_ROOMS'
            //...
        }
    }
};

module.exports = SETTINGS;