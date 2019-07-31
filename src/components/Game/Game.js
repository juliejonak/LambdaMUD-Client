import React, { Component } from "react";
import Map from "../Map/Map";
import Directions from "../Directions/Directions";
import InputBox from "../InputBox/InputBox";
import GlobalNotification from "../GlobalNotification/GlobalNotification";
import axios from "axios";

// rendered by App
export default class Game extends Component {
  componentDidMount() {}

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
