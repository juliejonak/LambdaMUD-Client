import React, { Component } from "react";
import axios from "axios";
import config from "../../config/index";
import {
  Form,
  FormInput,
  FormSubmit,
  FormText,
  FormLabel,
  FormHeader
} from "../CustomComponents/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pusher from "pusher-js";
/**
 * Login Component allows user to login to their existing account
 * Sends credentials object to the API with a username and password
 * Expects from the API a response with a key, validating they are a registered user
 */
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loading: false
    };
  }

  /**
   * handleInput sets user input to state, to accurately reflect their input and save for form submission
   * @param: Event, that triggers the function from user action.
   */
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /**
   * Submits user inputs to the API endpoint to login
   * If successful, sets the user's key to localStorage. If unsuccessful, logs error.
   * @param {*} Event that triggers the function from user submitting form
   */
  handleSubmit = e => {
    e.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    this.setState({
      // TODO: Can add a loading spinner for improved UI
      loading: true
    });

    axios
      .post(`${config.apiUrl}/api/login/`, credentials)
      .then(({ data }) => {
        // SET KEY TO localStorage?
        // Verify return format of res {key: 12345}
        console.log(data);
        localStorage.setItem("authToken", data.key);
        this.setState({
          username: "",
          password: "",
          loading: false
        });
        this.initializeGame(data.key);
        console.log(data.key);
        // ROUTE TO GAME
      })
      .catch(err => {
        console.error(err);
        // TODO: Find out expected errors and format
      });
  };
  /**
   * Initializes the user's character into the game,
   *@param: key, the authToken required to initialize the user, received from login/register endpoints
   */
  initializeGame = key => {
    axios
      .get(`${config.apiUrl}/api/adv/init/`, {
        headers: { Authorization: `Token ${key}` }
      })
        .then(({ data: { uuid, name, title, description, players }}) => {
            console.log(uuid, name, title, description, players)
              this.subscribeToChannel(uuid)
        })
        .catch(err => {
            console.log(err.response.data);
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
    channel.bind("broadcast", data => {
      console.log("broadcast response", data.message);
      //     this.setState({

      //   });
    });
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormHeader>Login to Lambda MUD</FormHeader>
        <FormLabel name="username">
          <FontAwesomeIcon icon={faUser} />
          <FormInput
            onChange={this.handleInput}
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
          />
        </FormLabel>

        <FormLabel name="password">
          <FontAwesomeIcon icon={faLock} />
          <FormInput
            onChange={this.handleInput}
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
          />
        </FormLabel>

        <FormSubmit type="submit" disabled={!this.state.password}>
          Login
        </FormSubmit>
        <Link to="/register">
          <FormText>Not yet registered?</FormText>
        </Link>
      </Form>
    );
  }
}

export default Login;
