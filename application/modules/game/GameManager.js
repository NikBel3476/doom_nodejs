const Module = require('../Module');
const Game = require('./game/Game'); // конструктор арены

class GameManager extends Module {
    constructor(options) {
        super(options);

        this.games = [
            new Game({ 
                callbacks: { updateCb: (gameData) => {} },
                db: this.db,
                name: 'firstGame'
            }),
            new Game({ 
                callbacks: { updateCb: (gameData) => {} },
                db: this.db,
                name: 'secondGame'
            }),
            new Game({ 
                callbacks: { updateCb: (gameData) => {} },
                db: this.db,
                name: 'thirdGame'
            })
        ];

        this.io.on('connection', socket => {
            socket.on(this.MESSAGES.MOVE, (data) => this.moveGamer(data));
            socket.on(this.MESSAGES.STOP_MOVE, () => this.stopMove(socket));
            socket.on(this.MESSAGES.CHANGE_DIRECTION, (data) => this.changeDireciton(data));
            socket.on(this.MESSAGES.GET_GAMES, () => this.getGames(socket));
            socket.on(this.MESSAGES.JOIN_GAME, (data) => this.joinGame(data, socket));
            socket.on(this.MESSAGES.LEAVE_GAME, (data) => this.leaveGame(data, socket));
            socket.on(this.MESSAGES.SPEED_UP, () => this.speedUp(socket));
            socket.on(this.MESSAGES.SPEED_DOWN, () => this.speedDown(socket));
            socket.on(this.MESSAGES.CHANGE_CAMERA_ROTATION, (data) => this.changeCameraRotation(data));
            socket.on(this.MESSAGES.CHANGE_POSITION, (data) => this.changePosition(data));

            socket.on('disconnect', () => {
               
            });
        });
    }


    changeCameraRotation(data) {
        const { rotationParams, gameName, token } = data;
        const game = this.games.find((game) => game.name === gameName);
        if(game) {
            game.changeCameraRotationGamer(rotationParams, token);
            for(let gamer in game) {
                if(gamer) {
                    
                }
            }
        }
    }

    changePosition(data) {
        const { position, gameName, token } = data;
        const game = this.games.find((game) => game.name === gameName);
        if(game) {
            game.changePositionGamer(position, token);
            for(let gamer in game) {
                if(gamer) {
                    
                }
            }
        }
    }

    speedUp(socket) {
        socket.emit(this.MESSAGES.SPEED_CHANGE, {result: 'up'});
    }

    speedDown(socket) {
        socket.emit(this.MESSAGES.SPEED_CHANGE, {result: 'down'});
    }


    getGames(socket) {
        const games = this.games.map((elem) => elem.getData());
        socket.emit(this.MESSAGES.GET_GAMES, games);
    }

    joinGame(data, socket) {
        const { gameName, token } = data;
        const game = this.games.find((game) => game.name === gameName);
        if (game) {
            game.joinGame(token);
            const games = this.games.map((game) => game.getData());
            this.io.emit(this.MESSAGES.GET_GAMES, games);
            return socket.emit(this.MESSAGES.JOIN_GAME, { result: true, gameName, scene: game.getScene() });
        }
        return socket.emit(this.MESSAGES.JOIN_GAME, { result: false });
    }

    leaveGame({ gameName, token }, socket) {
        const game = this.games.find((game) => game.name === gameName);
        if (game) {
            const result = game.leaveGame(token);
            if (result) {
                const games = this.games.map((elem) => elem.getData());
                this.io.emit(this.MESSAGES.GET_GAMES, games);
                return socket.emit(this.MESSAGES.LEAVE_GAME, { result });
            }
        }
        return socket.emit(this.MESSAGES.LEAVE_GAME, { result: false });
    }

    moveGamer({ gameName, direction, token }) {
        if (gameName && direction && token) {
            const game = this.games.find((game) => game.name === gameName);
            if (game) {
                game.moveGamer(direction, token);
            }
        }
    }

    stopMove(socketId) {

    }

    changeDireciton({ x, y }) {
        
    }

    getScene() {

    }
}

module.exports = GameManager;
