import React, { Component } from "react";
import Notification from "../Notification/Notification";
import { NotificationWrapper } from "../CustomComponents/index";
// rendered by Game
class GlobalNotification extends Component {
  render() {
    const { notifications, name, description, players } = this.props;
    return (
      <NotificationWrapper>
        <p>
          <span>{name} </span>
          <span>{description}</span>
        </p>
        <div>{players && players.map(player => `${player}`)}</div>
        <p>
          {notifications &&
            notifications.map(notification => {
              return <Notification key={notification.id} {...notification} />;
            })}
        </p>
      </NotificationWrapper>
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
