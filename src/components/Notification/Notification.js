import React from "react";

const Notification = ({ username, room }) => {
  return (
    <div>
      <h1>
        {username} has moved to {room}
      </h1>
    </div>
  );
};

export default Notification;
Notification.defaultProps = {
  username: "Ben",
  room: "nowhere"
};
