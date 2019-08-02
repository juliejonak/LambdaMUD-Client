import React from "react";
import { NotificationWrapper } from "../CustomComponents/index";
// rendered by GlobalNotification
const Notification = ({ username, room }) => {
  return (
    <NotificationWrapper>
      <h1>
        {username} has moved to {room}
      </h1>
    </NotificationWrapper>
  );
};

export default Notification;
Notification.defaultProps = {
  username: "Ben",
  room: "nowhere"
};
