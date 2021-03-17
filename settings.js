const SETTINGS = {
    PORT: 3001,

    // все события, котореы есть в сокетах
    MESSAGES: {
        GET_MESSAGE: 'GET_MESSAGE', // получить все сообщения
        SEND_MESSAGE: 'SEND_MESSAGE', // послать сообщение
        LOGIN: 'LOGIN',
        REGISTRATION: 'REGISTRATION'
    }
};

module.exports = SETTINGS;