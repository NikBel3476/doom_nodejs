const md5 = require("md5");
const io = require('socket.io-client');
const SETTINGS = require('../../settings');

describe('check socket requests', () => {

    const socket = io(`${SETTINGS.HOST}:${SETTINGS.PORT}`);

    const randNum = Math.random();
    const testMessge = 'test message';

    socket.on('connect', () => {
        console.log('succefully connection');
    });

    afterAll(() => {
        socket.close();
    });
    
    it('send message', () => {
        socket.on(SETTINGS.MESSAGES.GET_MESSAGE, ({ message, name }) => {
            expect({message, token}).toBe({});
            expect(token).toBe(md5(randNum + 1));      
        });
        socket.emit(SETTINGS.MESSAGES.SEND_MESSAGE, { message: '123123', token: md5(randNum) });
    });
});