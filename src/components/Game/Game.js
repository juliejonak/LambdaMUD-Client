import React, { Component } from "react";
import Map from "../Map/Map";
import Directions from "../Directions/Directions";
import InputBox from "../InputBox/InputBox";
import GlobalNotification from "../GlobalNotification/GlobalNotification";
import config from "../../config";
import Pusher from "pusher-js";

// rendered by App
export default class Game extends Component {
  state = {
    uuid: "",
    name: "",
    title: "",
    description: "",
    players: [],
    notifications: "",
    userInput: "",
    error_msg: "",
    possibleMovments: []
  };
  // TO DO,
  handleChange = e => {
    this.setState({ userInput: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { userInput } = this.state;
    config
      .axiosWithAuth("/api/adv/say/", userInput)
      .then(({ data }) => {
        // TO DO,
        // find out what we intend to do after a user has submit an input
      })
      .catch(err => console.log(err));
  };
  /**
   * Updates the user's character placement in the game,
   * @param: direction,, string, can only be n,e,w,s
   */
  handleMovement = direction => {
    config
      .axiosWithAuth()
      .post("/api/adv/move/", { direction })
      .then(({ data: { title, description, players, error_msg } }) => {
        this.setState({
          title,
          description,
          players: [...this.state.players, ...players],
          error_msg
        });
        // iterate through possible movements
        // check if its' in there, then pass them down down to MapComponent
      })
      .catch(err => console.log(err));
  };

  /**
   * Initializes the user's character into the game,
   *@param: none
   */
  initializeGame = () => {
    config
      .axiosWithAuth()
      .get(`/api/adv/init/`)
      .then(({ data: { uuid, name, title, description, players } }) => {
        this.setState({
          uuid,
          name,
          title,
          description,
          players
        });
        this.subscribeToChannel(uuid);
      })
      .catch(err => {
        console.log(err);
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
    /*
    binds to broadcast event to the channel, what this actually does is just
    basically adding an ongoing event listener, setState gets called whenever
    the event gets triggered in the back end.
    */
    channel.bind("broadcast", data => {
      this.setState({
        notifications: data.message
      });
    });
  };
  componentDidMount() {
    this.initializeGame();
    config
      .axiosWithAuth()
      .get("/api/adv/map/")
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  render() {
    const { notifications } = this.state;
    return (
      <div>
        <Map />
        <Directions handleMovement={this.handleMovement} />
        <InputBox
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <GlobalNotification notifications={notifications} />
      </div>
    );
  }
}
