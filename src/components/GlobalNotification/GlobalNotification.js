import React, { Component } from "react";
import Notification from "../Notification/Notification";
import Pusher from "pusher-js";
// rendered by Game
class GlobalNotification extends Component {
  state = {
    notifications: this.props.notifications,
    input: ""
  };
  componentDidMount() {
    // const pusher = new Pusher(process.env.REACT_APP_PUSHER_API_KEY, {
    //   cluster: process.env.REACT_APP_PUSHER_CLUSTER
    // });
    // const channel = pusher.subscribe("channel");
    // channel.bind("notification", data => {
    //   this.setState({
    //     notifications: [...this.state.notifications]
    //   });
    // });
    console.log("Component did mount")
  }
  render() {
    const { notifications } = this.state;
    return (
      <>
        <h1>test</h1>
        {notifications &&
          notifications.map(notification => {
            return <Notification key={notification.id} {...notification} />;
          })}
      </>
    );
  }
}

export default GlobalNotification;
GlobalNotification.defaultProps = {
  notifications: [
    { id: 1, username: "Julie", room: "cave entrance" },
    { id: 2, username: "Winston", room: "infirmary" },
    { id: 3, username: "Curtis", room: "room with statues" },
    { id: 4, username: "Latifah", room: "treasure room" },
    { id: 5, username: "Ben", room: "boss room" }
  ]
};
