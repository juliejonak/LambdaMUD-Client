import React, { Component } from "react";
import { MapCreator } from "./helpers";
import tileMap from "../../assets/MUD_Tile_Set.png";
// rendered by Game

// Creates a Map instance with array (layers).
// Each array within layers represents a layer of tiles drawn onto the canvas
// 0 means nothing is drawn on

const Map = new MapCreator(5, 10, 64, [
  // Grass or road
  [
    2,
    2,
    2,
    1,
    2,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    2,
    1,
    1,
    1,
    2,
    1,
    2,
    1,
    1,
    2,
    1,
    2,
    2,
    2,
    1,
    2,
    2,
    2,
    1,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    1,
    2,
    1,
    1,
    2,
    2
  ],
  [
    // Obstacles and grass edging
    0,
    4,
    0,
    7,
    0,
    6,
    9,
    8,
    0,
    0,
    8,
    0,
    9,
    0,
    9,
    3,
    0,
    8,
    6,
    9,
    0,
    0,
    5,
    8,
    0,
    0,
    6,
    0,
    3,
    0,
    8,
    0,
    4,
    0,
    6,
    6,
    5,
    8,
    0,
    9,
    0,
    6,
    0,
    6,
    6,
    0,
    6,
    9,
    0,
    4
  ],
  [
    // Rooms and grass edging
    10,
    0,
    16,
    0,
    19,
    7,
    7,
    7,
    16,
    18,
    0,
    15,
    0,
    17,
    0,
    0,
    11,
    0,
    0,
    0,
    11,
    0,
    0,
    0,
    0,
    20,
    0,
    12,
    0,
    19,
    9,
    14,
    0,
    18,
    0,
    9,
    0,
    0,
    10,
    6,
    12,
    7,
    13,
    0,
    7,
    10,
    7,
    6,
    14,
    0
  ]
]);

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 800,
      height: 800
    };
    this.canvasRef = React.createRef();
  }

  updateMap() {
    const image = new Image();
    image.src = tileMap;
    const ctx = this.canvasRef.current.getContext("2d");
    // image,x coord,y coord,tile width,tile height,x-coord,y-coord,
    image.onload = () => {
      for (let i = 0; i < 3; i++) {
        for (var c = 0; c < Map.columns; c++) {
          for (var r = 0; r < Map.rows; r++) {
            var tile = Map.getTile(i, c, r);
            if (tile !== 0) {
              // 0 => empty tile
              console.log("1", tile);
              ctx.drawImage(
                image, // image
                (tile - 1) * Map.tile_size, // source x
                0, // source y
                Map.tile_size, // source width
                Map.tile_size, // source height
                c * Map.tile_size, // target x
                r * Map.tile_size, // target y
                Map.tile_size, // target width
                Map.tile_size // target height
              );
              console.log("4");
            }
          }
        }
      }
    };
  }
  getContext = () => this.canvasRef.current.getContext("2d");
  componentDidMount() {
    this.updateMap();
  }
  render() {
    const { width, height } = this.state;
    return (
      <div>
        <canvas ref={this.canvasRef} width={width} height={height} />
      </div>
    );
  }
}

export default MapComponent;
