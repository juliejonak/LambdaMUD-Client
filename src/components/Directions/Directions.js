import React from "react";
// rendered by Game
// TO DO
// replace directions from text to images
const Directions = ({ handleMovement }) => {
  return (
    <>
      <div onClick={() => handleMovement("n")}>N</div>
      <div onClick={() => handleMovement("e")}>E</div>
      <div onClick={() => handleMovement("w")}>W</div>
      <div onClick={() => handleMovement("s")}>S</div>
    </>
  );
};

export default Directions;
Directions.defaultProps = {
  handleMovement: () => "moved"
};
