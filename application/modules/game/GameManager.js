const Module = require('../Module');
const Game = require('./game/Game'); // конструктор арены

class GameManager extends Module {
    constructor(options) {
        super(options);

        this.games = [
            new Game({ callbacks: { updateCb: (gameData) => {}} }),
            //new Game({ callbacks: { updateCb: (gameData) => {}} })
        ];

        // обработчик соединения для КАЖДОГО клиента
        this.io.on('connection', socket => {
        });
    }
}

module.exports = GameManager;