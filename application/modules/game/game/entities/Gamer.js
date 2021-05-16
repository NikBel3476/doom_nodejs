class Gamer {
    constructor({ x, y, z, hp = 100, direction = {x:0, y:0} }) {
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.z = z;
        this.direction = direction;
    }
}

module.exports = Gamer;