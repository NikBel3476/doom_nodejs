const SETTINGS = {
    PORT: 3001,

    DATABASE: {
        HOST: 'localhost',
        PORT: 5433,
        NAME: 'vm21-db',
        USER: 'vm21-user',
        PASS: '123456'
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
        GET_ROOMS: 'GET_ROOMS'
    },

    MEDIATOR: {
        EVENTS: {
            TEST_EVENT: 'TEST_EVENT',
            USER_LOGIN: 'USER_LOGIN', // пользователь авторизовался
            USER_LOGOUT: 'USER_LOGOUT', // пользователь разлогинился
            USER_REGISTRATION: 'USER_REGISTRATION'
            //...
        },
        TRIGGERS: {
            TEST_TRIGGER: 'TEST_TRIGGER',
            GET_ALL_USERS: 'GET_ALL_USERS',
            //...
        }
    }
};

module.exports = SETTINGS;