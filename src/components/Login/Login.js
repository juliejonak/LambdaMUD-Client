import React, { Component } from "react";
import axios from "axios";
import config from "../../config/index";
import {
  Form,
  FormInput,
  FormSubmit,
  FormText,
  FormLabel,
  FormHeader,
  Background,
  Body,
  FormBackground
} from "../CustomComponents/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
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

    config
      .axiosWithAuth()
      .post(`/api/login/`, credentials)
      .then(({ data }) => {
        // SET KEY TO localStorage?
        // Verify return format of res {key: 12345}
        localStorage.setItem("authToken", data.key);
        this.setState({
          username: "",
          password: "",
          loading: false
        });
        // ROUTE TO GAME
      })
      .catch(err => {
        console.error(err);
        // TODO: Find out expected errors and format
      });
  };

  render() {
    return (
      <Body>
        <Background>
          <Form onSubmit={this.handleSubmit}>
            <FormHeader>Lambda MUD</FormHeader>
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
        </Background>
      </Body>
    );
  }
}

export default Login;
