import React, { Component } from "react";
import Map from "../Map/Map";
import Directions from "../Directions/Directions";
import ChatBox from "../ChatBox/ChatBox";
import GlobalNotification from "../GlobalNotification/GlobalNotification";
import config from "../../config";
import Pusher from "pusher-js";
import Instructions from "../Instructions/Instructions";
import {
  AppBody,
  GameWrapper,
  ViewWrapper,
  ControlWrapper,
  InstructionDirectionWrapper
} from "../CustomComponents/index";
/**
 * Game holds the entire game that the user interacts with and is the component that communicates with the API endpoints to send and receive data about the user's interaction and movements.
 */

// rendered by App
export default class Game extends Component {
  state = {
    uuid: "",
    name: "",
    title: "",
    description: "",
    players: [],
    notifications: "",
    error_msg: "",
    moveDirection: ""
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
        error_msg
          ? this.setState({
              title,
              description,
              players: [...players],
              error_msg,
              moveDirection: ""
            })
          : this.setState({
              title,
              description,
              players: [...players],
              error_msg,
              moveDirection: direction
            });
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
        notifications: [...this.state.notifications, data.message]
      });
    });
  };

  componentDidMount() {
    this.initializeGame();
  }

  render() {
    let { moveDirection } = this.state;

    return (
      <AppBody>
        <GameWrapper>
          <ViewWrapper>
            <Map moveDirection={moveDirection} />
            <InstructionDirectionWrapper>
              <Instructions />
              <Directions handleMovement={this.handleMovement} />
            </InstructionDirectionWrapper>
            <ChatBox />
          </ViewWrapper>
          <ControlWrapper>
            <GlobalNotification {...this.state} />
          </ControlWrapper>
        </GameWrapper>
      </AppBody>
    );
  }
}
