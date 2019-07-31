import React from "react";
import { MapCreator } from './helpers';

// rendered by Game

// Creates a Map instance with array (layers). 
// Each array within layers represents a layer of tiles drawn onto the canvas
// 0 means nothing is drawn on
const Map = MapCreator(5, 10, 64, [[
  2, 2, 2, 1, 2, 1, 1, 1, 2, 2,
  1, 2, 1, 2, 1, 2, 2, 1, 1, 1,
  2, 1, 2, 1, 1, 2, 1, 2, 2, 2,
  1, 2, 2, 2, 1, 1, 2, 1, 2, 1,
  2, 1, 2, 1, 1, 2, 1, 1, 2, 2
], [
  0, 4, 0, 7, 0, 6, 9, 8, 0, 0,
  8, 0, 9, 0, 9, 3, 0, 8, 6, 9,
  0, 0, 5, 8, 0, 0, 6, 0, 3, 0,
  8, 0, 4, 0, 6, 6, 5, 8, 0, 9,
  0, 6, 0, 6, 6, 0, 6, 9, 0, 4
], [
  10, 0, 16, 0, 19, 7, 7, 7, 16, 18,
  0, 15, 0, 17, 0, 0, 11, 0, 0, 0,
  11, 0, 0, 0, 0, 20, 0, 12, 0, 19,
  9, 14, 0, 18, 0, 9, 0, 0, 10, 6,
  12, 7, 13, 0, 7, 10, 7, 6, 14, 0
]]);

const MapComponent = () => {
  return (
    <div>
      <h1>Map</h1>
    </div>
  );
};

export default MapComponent;