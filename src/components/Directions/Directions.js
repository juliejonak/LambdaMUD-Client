import React from "react";
import { DirectionWrapper } from "../CustomComponents/index";

// rendered by Game
// TO DO
// replace directions from text to images
const Directions = ({ handleMovement }) => {
  return (
    <DirectionWrapper>
      <div onClick={() => handleMovement("n")} />
      <div onClick={() => handleMovement("w")} />
      <div onClick={() => handleMovement("s")} />
      <div onClick={() => handleMovement("e")} />
    </DirectionWrapper>
  );
};

export default Directions;
Directions.defaultProps = {
  handleMovement: () => "moved"
};
