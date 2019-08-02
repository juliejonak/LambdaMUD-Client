import React from "react";
import { DirectionWrapper } from "../CustomComponents";
// rendered by Game
// TO DO
// replace directions from text to images
const Directions = ({ handleMovement }) => {
  return (
    <DirectionWrapper>
      <div onClick={() => handleMovement("n")}>N</div>
      <div onClick={() => handleMovement("e")}>E</div>
      <div onClick={() => handleMovement("w")}>W</div>
      <div onClick={() => handleMovement("s")}>S</div>
    </DirectionWrapper>
  );
};

export default Directions;
Directions.defaultProps = {
  handleMovement: () => "moved"
};
