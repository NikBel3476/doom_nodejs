const SETTINGS = {
    PORT: 3001,

    // все события, котореы есть в сокетах
    MESSAGES: {
        GET_MESSAGE: 'GET_MESSAGE', // получить все сообщения
        SEND_MESSAGE: 'SEND_MESSAGE', // послать сообщение
        LOGIN: 'LOGIN',
        REGISTRATION: 'REGISTRATION',
        USER_ONLINE: 'USER_ONLINE', // пользователь успешно авторизовался и стал онлайн
    },

    MEDIATOR: {
        EVENTS: {
            TEST_EVENT: 'TEST_EVENT',
            USER_LOGIN: 'USER_LOGIN', // пользователь авторизовался
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