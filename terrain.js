function generateTerrain() {
    var simplex = new SimplexNoise();
    var value;

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            value = Math.abs(simplex.noise2D(i, j)); 
            console.log(value);
        }
    }
}