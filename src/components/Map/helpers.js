  
export class MapCreator {
    constructor(rows, columns, tile_size, layers){
        this.rows = rows;
        this.columns = columns;
        this.tile_size = tile_size;
        this.layers = layers;
    }

    getTile = (layer, column, row) => {
        return this.layers[layer][row * this.columns + column];
    };

    getColumn = (x) => {
        return Math.floor(x / this.tile_size);
    };

    getRow = (y) => {
        return Math.floor(y / this.tile_size);
    };

    getX = (column) => {
        return column * this.tile_size;
    };

    getY = (row) => {
        return row * this.tile_size;
    };

};