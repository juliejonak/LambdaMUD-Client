import React from "react";

const Directions = ({ directions: [north, east, west, south] }) => {
  return (
    <>
      <div>{north}</div>
      <div>{east}</div>
      <div>{west}</div>
      <div>{south}</div>
    </>
  );
};

export default Directions;
Directions.defaultProps = {
  directions: ["north", "east", "west", "south"]
};
