class Camera {

    constructor(x, y) {
        this.pos = {x, y};
        this.speed = 10;
    }

    moveUp() {
        this.pos.y += this.speed;
    }

    moveLeft() {
        this.pos.x += this.speed; 
    }

    moveDown() {
        this.pos.y -= this.speed;
    }

    moveRight() {
        this.pos.x -= this.speed;
    }

}