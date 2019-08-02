import React, { Component } from "react";
import Notification from "../Notification/Notification";
import { NotificationWrapper, LogOut } from "../CustomComponents/index";
import { withRouter } from "react-router-dom";
// import logOut from "../../assets/exit.png";

// rendered by Game
class GlobalNotification extends Component {
  handleLogOut = e => {
    localStorage.clear();
    this.props.history.push("/login");
  };
  render() {
    const { notifications, name, description, players } = this.props;
    console.log(players);
    return (
      <NotificationWrapper>
        <LogOut onClick={this.handleLogOut} />
        {/* <img src={logOut} alt="logout" onClick={this.handleLogOut} /> */}
        <h2>{name} is here</h2>
        <p>{description}</p>
        <div>
          {players.length ? (
            <>
              Others in this room:
              {players.map(player => (
                <div key={player}>
                  <br />
                  Name: {`${player}`}
                </div>
              ))}
            </>
          ) : (
            "You are the only one here..."
          )}
        </div>
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

export default withRouter(GlobalNotification);
GlobalNotification.defaultProps = {
  notifications: [
    { id: 1, username: "Julie", room: "cave entrance" },
    { id: 2, username: "Winston", room: "infirmary" },
    { id: 3, username: "Curtis", room: "room with statues" },
    { id: 4, username: "Latifah", room: "treasure room" },
    { id: 5, username: "Ben", room: "boss room" }
  ]
};
