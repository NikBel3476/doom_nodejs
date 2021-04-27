const { createServer } = require("http");
const io = require('socket.io-client');
const SETTINGS = require('../../settings');

describe('check socket requests', () => {

    let socket = io.connect('http://localhost:3001');

    /* it('login', () => {
        expect(

        ).toBe();
    }); */
});