const Direction = Object.freeze({
    Forward: 0,
    Back: 1,
    Right: 2,
    Left: 3
})

class Gamer {
    constructor({ x, y, z }, hp = 100, direction = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0 }) {
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.z = z;
        this.direction = direction;
        this.rotation = rotation;
    }

    move(direction) {
        switch (direction) {
            case Direction.Forward: {
                this.x++;
                break;
            }
            case Direction.Back: {
                this.x--;
                break;
            }
            case Direction.Right: {
                this.z++;
                break;
            }
            case Direction.Left: {
                this.z--;
                break;
            }
        }
    }

    changeCameraRotation(rotationParams) {
        // rotationParams { x, y }
        this.rotation = rotationParams;
    }

    changePosition(position) {
        // position { x, z }
        this.x = position.x;
        this.z = position.z;
    }

}

module.exports = Gamer;
