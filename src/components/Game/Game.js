import React, { Component } from "react";
import Map from "../Map/Map";
import Directions from "../Directions/Directions";
import InputBox from "../InputBox/InputBox";
import GlobalNotification from "../GlobalNotification/GlobalNotification";
import config from "../../config";
import Pusher from "pusher-js";
import axios from "axios";

// rendered by App
export default class Game extends Component {
  /**
   * Initializes the user's character into the game,
   *@param: key, the authToken required to initialize the user, received from login/register endpoints
   */
  initializeGame = key => {
    axios
      .get(`${config.apiUrl}/api/adv/init/`, {
        headers: { Authorization: `Token ${key}` }
      })
      .then(({ data: { uuid, name, title, description, players } }) => {
        this.subscribeToChannel(uuid);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
  /**
   * subscribeToChannel subscribes to a pusher channel and bind to broadcast events
   *@param: uuid, subscribe to the uuid channel provided
   */
  subscribeToChannel = uuid => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_API_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER
    });
    const channel = pusher.subscribe(`p-channel-${uuid}`);
    console.log(channel);
    channel.bind("broadcast", data => {
      console.log("broadcast response", data.message);
      //     this.setState({

      //   });
    });
  };
  componentDidMount() {
    const key = localStorage.getItem("authToken");
    this.initializeGame(key);
  }

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
