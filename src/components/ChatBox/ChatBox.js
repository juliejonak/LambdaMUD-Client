import React from "react";
import config from "../../config/index";
import { ChatWrapper } from "../CustomComponents/index";
// rendered by Game
class ChatBox extends React.Component {
  state = {
    userInput: ""
  };
  handleChange = e => {
    this.setState({ userInput: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { userInput } = this.state;
    config
      .axiosWithAuth()
      .post("/api/adv/say/", userInput)
      .then(({ data }) => {
        console.log("hi", data);
        // TO DO,
        // find out what we intend to do after a user has submit an input
      })
      .catch(err => console.log(err));
  };
  render() {
    const { userInput } = this.state;
    return (
      <ChatWrapper>
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="userInput">Say something...</label>
          <input
            type="text"
            id="userInput"
            value={userInput}
            onChange={this.handleChange}
          />
        </form>
      </ChatWrapper>
    );
  }
}

export default ChatBox;
