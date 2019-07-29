import React, { Component } from "react";
import Map from "../Map/Map";
import Directions from "../Directions/Directions";
import InputBox from "../InputBox/InputBox";
import GlobalNotification from "../GlobalNotification/GlobalNotification";
export default class Game extends Component {
  render() {
    return (
      <div>
        <Map />
        <Directions />
        <InputBox />
        <GlobalNotification />
      </div>
    );
  }
}
