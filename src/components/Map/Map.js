import React, { Component } from "react";
import { MapCreator } from "./helpers";
import tileMap from "../../assets/MUD_Tile_Set.png";
import tRex from "../../assets/trex.png";
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
    this.canvasRef2 = React.createRef();
  }

  async updateMap() {
    const image = new Image();
    const userCharacter = new Image();
    image.src = tileMap;
    userCharacter.src = tRex;
    const ctx = this.canvasRef.current.getContext("2d");
    const ctx2 = this.canvasRef2.current.getContext("2d");

    // only draw the canvas after the image has been loaded
    const background = () => {
      return new Promise(resolve => {
        image.onload = () => {
          for (var i = 0; i < 3; i++) {
            for (var c = 0; c < Map.columns; c++) {
              for (var r = 0; r < Map.rows; r++) {
                var tile = Map.getTile(i, c, r);
                if (tile !== 0) {
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
                }
              }
            }
          }
        };
        resolve("hi");
      });
    };
    background();
    userCharacter.onload = () => {
      ctx2.drawImage(userCharacter, 0, 0);
    };

    // background().then(
    // res =>
    // );
    // background(0);
    // background(1);
    // background(0)
    //   .then(res => {
    //     console.log("*****res", res);
    //     ctx.globalCompositeOperation = "source-over";
    //     userCharacter.onload = () => {
    //       ctx.drawImage(userCharacter, 0, 0);
    //     };
    //     console.log("works");
    //   })
    //   .catch(err => console.log(err));
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
        <canvas
          ref={this.canvasRef2}
          width={width}
          height={height}
          style={{ position: "absolute", top: "0" }}
        />
      </div>
    );
  }
}

export default MapComponent;
