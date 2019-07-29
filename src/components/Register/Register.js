import React, {Component} from "react";
import axios from "axios";
import config from "config";

/**
 * Register Component allowa a user to register for a new account
 * Sends a credentials object to the API with username, password1, and password2, where password1 and password2 should match
 * Awaits an object response from API with a key to set to user's localStorage, to verify they are a valid registered user
 */

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password1: "",
            password2: "",
            loading: false
        }
    };

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();

        // TODO: Verify passwords match
        // TODO: Add any FE type checking for password security

        const credentials = {
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2
        };

        this.setState({
            loading: true
        });

        axios.post(`${config.apiUrl}/api/registration`, credentials)
            .then( res => {
                console.log(res);
                // SET KEY TO localStorage?
                // Verify return format of res {key: 12345}
                localStorage.setItem("authToken", res.data.key);
                this.setState({
                    username: "",
                    password1: "",
                    password2: "",
                    loading: false
                });
                // ROUTE TO GAME
            })
            .catch( err => {
                console.err(err);
                // TODO: Find out expected errors and format
            })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleInput} type="text" name="username" placeholder="Username" value={this.state.username}></input>
                <input onChange={this.handleInput} type="password" name="password1" placeholder="Password" value={this.state.password1}></input>
                <input onChange={this.handleInput} type="password" name="password2" placeholder="Repeat Password" value={this.state.password2}></input>
                <button type="submit">Register</button>
            </form>
        )
    }
};

export default Register;