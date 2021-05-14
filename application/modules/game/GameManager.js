const Module = require('../Module');
const Game = require('./game/Game'); // конструктор арены

class GameManager extends Module {
    constructor(options) {
        super(options);

        this.games = [
            new Game({ 
                callbacks: { updateCb: (gameData) => {}},
                db: this.db,
                name: 'firstGame'
            }),
            //new Game({ callbacks: { updateCb: (gameData) => {}} })
        ];

        this.io.on('connection', socket => {
            socket.on(this.MESSAGES.MOVE, (data) => this.moveGamer(data))
        });
    }

    moveGamer({ gameName, direction, token }) {
        console.log(gameName, direction, token);
        const game = this.games.find((game) => game.name === gameName);
        if (game) {
            game.move(direction, token);
        }
    }
}

module.exports = GameManager;