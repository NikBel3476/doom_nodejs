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
            new Game({ 
                callbacks: { updateCb: (gameData) => {}},
                db: this.db,
                name: 'secondGame'
            }),
            new Game({ 
                callbacks: { updateCb: (gameData) => {}},
                db: this.db,
                name: 'thirdGame'
            }),
            //new Game({ callbacks: { updateCb: (gameData) => {}} })
        ];

        this.io.on('connection', socket => {
            socket.on(this.MESSAGES.MOVE, (data) => this.moveGamer(data));
            socket.on(this.MESSAGES.MOVE, () => this.stopMove(socket));
            socket.on(this.MESSAGES.CHANGEDIRECTION, (data) => this.changeDireciton(data));
        });
    }

    moveGamer({ direction, token }) {
        console.log(gameName, direction, token);
        const game = this.games.find((game) => game.name === gameName);
        if (game) {
            game.move(direction, token);
        }
    }

    stopMove(socketId) {

    }

    changeDireciton({ x, y }) {
        
    }
}

module.exports = GameManager;