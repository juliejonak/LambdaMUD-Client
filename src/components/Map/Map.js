import React, { Component } from "react";
import { MapCreator } from "./helpers";
import tileMap from "../../assets/MUD_Tile_Set.png";
import sprite from "../../assets/sprite.png";
import { MapWrapper } from "../CustomComponents";

/**
 * Map.js is our instance of the MapCreator, used to dictate the size of the game board, individual tiles, and to create the layers of the graphical game board.
 * It initializes the canvas layers and draws the game board and sprite onto those canvases.
 */
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
      width: 640,
      height: 320,
      userX: 320,
      userY: 128
    };
    this.canvasRef = React.createRef();
    this.canvasRef2 = React.createRef();
  }
  updateMap() {
    const image = new Image();
    const userCharacter = new Image();
    image.src = tileMap;
    userCharacter.src = sprite;
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
    const { userX, userY } = this.state;
    userCharacter.onload = () => {
      // based on direction
      switch (this.props.moveDirection) {
        case "n":
          this.setState(
            {
              ...this.state,
              userY: this.state.userY - 64
            },
            () => draw(this.state.userX, this.state.userY)
          );
          break;
        case "e":
          this.setState(
            {
              ...this.state,
              userX: this.state.userX + 64
            },
            () => draw(this.state.userX, this.state.userY)
          );
          break;
        case "w":
          this.setState(
            {
              ...this.state,
              userX: this.state.userX - 64
            },
            () => draw(this.state.userX, this.state.userY)
          );
          break;
        case "s":
          this.setState(
            {
              ...this.state,
              userY: this.state.userY + 64
            },
            () => draw(this.state.userX, this.state.userY)
          );
          break;
        default:
          console.log(`can't move that way`);
          draw(userX, userY);
      }
    };
    function draw(x, y) {
      ctx2.clearRect(0, 0, 640, 320);
      ctx2.drawImage(userCharacter, 0, 0, 64, 64, x, y, 64, 64);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.updateMap();
    }
  }

  getContext = () => this.canvasRef.current.getContext("2d");

  componentDidMount() {
    this.updateMap();
  }
  render() {
    const { width, height } = this.state;
    return (
      <MapWrapper>
        <canvas ref={this.canvasRef} width={width} height={height} />
        <canvas
          ref={this.canvasRef2}
          width={width}
          height={height}
          style={{ position: "absolute", top: "0", left: "0" }}
        />
      </MapWrapper>
    );
  }
}

export default MapComponent;
