import React from "react";
import Notification from "../Notification/Notification";
// rendered by Game
const GlobalNotification = ({ notifications }) => {
  return (
    <>
      {notifications.map(notification => {
        return <Notification key={notification.id} {...notification} />;
      })}
    </>
  );
};

export default GlobalNotification;
GlobalNotification.defaultProps = {};
