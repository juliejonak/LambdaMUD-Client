import React, { Component } from "react";
import Notification from "../Notification/Notification";

// rendered by Game
class GlobalNotification extends Component {
  state = {
    notifications: this.props.notifications,
    input: ""
  };
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
