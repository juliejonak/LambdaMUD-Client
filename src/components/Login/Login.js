import React, {Component} from "react";
import axios from "axios";
import config from "config";

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
        }
    };

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        const credentials = {
            username: this.state.username,
            password: this.state.password,
        };

        this.setState({
            // TODO: Can add a loading spinner for improved UI
            loading: true
        });

        axios.post(`${config.apiUrl}/api/login`, credentials)
            .then( res => {
                console.log(res);
                // SET KEY TO localStorage?
                // Verify return format of res {key: 12345}
                localStorage.setItem("authToken", res.data.key);
                // ROUTE TO GAME
                this.setState({
                    username: "",
                    password: "",
                });
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
                <input onChange={this.handleInput} type="password" name="password" placeholder="Password" value={this.state.password}></input>
                <button type="submit">Login</button>
            </form>
        )
    }
};

export default Login;