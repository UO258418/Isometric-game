class Grid {
    
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.fill();
        this.selectedTile = null;
    }

    fill() {
        for(let j = 0; j < this.rows; j++) {
            var row = [];
            for(let i = 0; i < this.cols; i++) {
                row.push(this.randomTile());
            }
            this.grid.push(row);
        }
    }

    draw() {
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++) {
                var tile = this.grid[j][i];
                tile.draw(i, j);
            }
        }
        this.drawSelected();
    }

    drawSelected() {
        if(this.selectedTile != null) {
            ctx.lineWidth = 4;
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(this.selectedTile.i * tileSize, this.selectedTile.j * tileSize, tileSize, tileSize);
        }
    }

    randomTile() {
        var tiles = [() => new GrassTile(), () => new DirtTile(), () => new WaterTile()];
        var rn = Math.floor(Math.random() * tiles.length);
        return tiles[rn](); 
    }

}