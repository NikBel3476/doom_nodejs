const Gamer = require('./entities/Gamer');

class Game {

    constructor({ callbacks, db, name } = {}) {
        this.db = db;
        this.name = name;
        this.gamers = {};
        const { updateCb } = callbacks;
        this.updateCb = updateCb;
        const mainLoop = setInterval(() => this.update(), 1000);
    }

    changeCameraRotationGamer( rotationParams, token) {
        this.gamers[token].changeCameraRotation(rotationParams);
    }

    changePositionGamer(position, token) {
        this.gamers[token].changePosition(position);
    }

    moveGamer(direction, token) {
        this.gamers[token].move(direction);
    }

    getData() {
        return {
            name: this.name,
            gamersCount: Object.keys(this.gamers).length
        }
    }

    joinGame(token) {
        const x = 5;
        const y = 10;
        const z = 30;
        this.gamers[token] = new Gamer({ x, y, z }, 100);
        return this.getData();
    }
    
    leaveGame(token) {
        if (token in this.gamers) {
            delete this.gamers[token];
            return true;
        }
        return false;
    }

    die(gamer) {}

    respawn(gamer) {}

    shoot(user, alphaV) {}
    //jump(user) {}

    getScene() {
        return {
            gamers: this.gamers
        };
    }

    getGameData() {
        // вернуть позиции игроков и выстрелов
        return {
            gamers: this.gamers
        };
    }

    update() {
        // обсчитать изменения, произошедшие на арене (движение игроков и полёт пуль)
        // выяснить, кто помер, кого ударили, в кого что попало и т.д.
        this.updateCb(this.getGameData());
    }
}

module.exports = Game;
