const SETTINGS = {
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
    },

    MEDIATOR: {
        EVENTS: {
            TEST_EVENT: 'TEST_EVENT',
            USER_LOGIN: 'USER_LOGIN', // пользователь авторизовался
            USER_LOGOUT: 'USER_LOGOUT', // пользователь разлогинился
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