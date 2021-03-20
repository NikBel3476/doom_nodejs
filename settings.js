const SETTINGS = {
    PORT: 3001,

    // все события, котореы есть в сокетах
    MESSAGES: {
        GET_MESSAGE: 'GET_MESSAGE', // получить все сообщения
        SEND_MESSAGE: 'SEND_MESSAGE', // послать сообщение
        LOGIN: 'LOGIN',
        REGISTRATION: 'REGISTRATION'
    },

    MEDIATOR: {
        EVENTS: {
            TEST_EVENT: 'TEST_EVENT',
            //...
        },
        TRIGGERS: {
            TEST_TRIGGER: 'TEST_TRIGGER',
            GET_ALL_USERS: 'GET_ALL_USERS'
            //...
        }
    }
};

module.exports = SETTINGS;