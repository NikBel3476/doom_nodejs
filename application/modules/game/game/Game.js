const Gamer = require('./entities/Gamer');

const Direction = Object.freeze({
    Forward: 0,
    Back: 1,
    Right: 2,
    Left: 3
})

class Game {

    gamers = [];

    constructor({ callbacks, db } = {}) {
        this.db = db;
        const { updateCb } = callbacks;
        this.updateCb = updateCb;
        // запустить игру
        setInterval(() => this.update(), 1000);
    }

    join(user) {
        const token = user.token;
        const { x, y, z} = this.db.getGamerByUserToken(token);
        this.gamers.push(new Gamer({ token, x, y, z }));
        //...
        return this.getScene();
    }
    
    leave(user) {
        const token = user.token;
        this.gamers = this.gamers.splice(
            this.gamers.findIndex((gemer) => gamer.token === token), 1);
    }
    die(gamer) {}
    respawn(gamer) {}

    move(user, direction, speed) {
        switch (direction) {
            case Direction.Forward: {
                
            }
            case Direction.Back: {

            }
            case Direction.Right: {

            }
            case Direction.Left: {

            }
        }
    }
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