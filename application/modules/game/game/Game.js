const Gamer = require('./entities/Gamer');

class Game {
    constructor({ callbacks } = {}) {
        const { updateCb } = callbacks;
        this.updateCb = updateCb;
        // запустить игру
        setInterval(() => this.update(), 50);
    }

    join(user) {
        //...
        return this.getScene();
    }
    leave(user) {}
    die(gamer) {}
    respawn(gamer) {}

    move(user, direction, speed) {}
    shot(user, alphaV) {}
    //jump(user) {}

    getScene() {
        // вернуть сцену
        return null;
    }

    getGameData() {
        // вернуть позиции игроков и выстрелов
        return null;
    }

    update() {
        // обсчитать изменения, произошедшие на арене (движение игроков и полёт пуль)
        // выяснить, кто помер, кого ударили, в кого что попало и т.д.
        this.updateCb(this.getGameData());
    }
}

module.exports = Game;