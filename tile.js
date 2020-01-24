class Tile {

    constructor(color) {
        this.color = color;
    }

    draw(i, j) {
        ctx.fillStyle = this.color;
        ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
    }
    
}