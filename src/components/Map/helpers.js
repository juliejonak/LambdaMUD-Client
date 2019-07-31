/**
 * Creates a new Map instance
 * @param Integer : number of rows in the map
 * @param Integer : number of columns in the map
 * @param Integer : height/width of the square tile in pixels
 * @param Array : an array with an array of each layer of the map. Each array is composed of rows * columns items, each representing a numerical integer referencing the 64px tile of the source image used to draw the canvas of this map instance.
 */
export class MapCreator {
    constructor(rows, columns, tile_size, layers){
        this.rows = rows;
        this.columns = columns;
        this.tile_size = tile_size;
        this.layers = layers;
    };

    /**
     * Fetches the tile of a specific area on the Map instance
     * @param Integer : index of layers array of Map instance
     * @param Integer : column of the Map instance
     * @param Integer : row of the Map instance
     * @returns Integer representing the tile
     */
    getTile = (layer, column, row) => {
        return this.layers[layer][row * this.columns + column];
    };

    /**
     * Fetches the column where the x coordinate is located
     * @param Integer : x coordinate
     * @returns Integer representing the column
     */
    getColumn = (x) => {
        return Math.floor(x / this.tile_size);
    };

    /**
     * Fetches the column where the y coordinate is located
     * @param Integer : y coordinate
     * @returns Integer representing the column
     */
    getRow = (y) => {
        return Math.floor(y / this.tile_size);
    };

    /**
     * Fetches the x coordinate where the column is located
     * @param Integer : Column number
     * @returns x coordinate in pixels
     */
    getX = (column) => {
        return column * this.tile_size;
    };

    /**
     * Fetches the y coordinate where the row is located
     * @param Integer : Row number
     * @returns y coordinate in pixels
     */
    getY = (row) => {
        return row * this.tile_size;
    };

    /**
     * Checks if a tile is a solid obstacle that will prevent the sprite from walking through
     * @param Integer : x coordinate
     * @param Integer : y coordinate
     */
    isSolidTileAtXY = (x, y) => {
        const column = Math.floor(x / this.tile_size);
        const row = Math.floor(y / this.tile_size);

        return this.layers.reduce((res, layer, index) => {
            // Fetches each tile while working through each layer to check for solid tiles that the Sprite cannot pass.
            const tile = this.getTile(index, column, row);
            // Sets Tiles 3, 4 and 5 as "solid" obstacle tiles that the Sprite cannot walk through.
            const isSolid = tile === 3 || tile === 4 || tile === 5;

            // If True, will return true; else default to false
            return res || isSolid;
        }, false);
    }

};

