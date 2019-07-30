import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Game from "./components/Game/Game";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

/**
 * Checks if a user is authorized to access the game.
 * @returns True or False
 */
const isAuthorized = () => {
    return Boolean(localStorage.getItem("authToken"));
};

/**
 * Creates a Protected Route from a passed in component. Only renders if user is Authorized. Otherwise redirects user to login.
 * @returns Component (if auth) or Redirect (to login)
 */
const ProtectedRoute = ( { component: Component, ...rest }) => {
    return(
        <Route {...rest} render={props => isAuthorized() ? (<Component {...props} />) : (<Redirect to={{pathname: "/login"}} />)} />
    )};


/**
 * Sets public and private routes
 * /register and /login are currently public. The main landing page (game) is only accessible to authenticated users.
 * @returns Switch Component routing users throughout app
 */
const Router = () => {
    return (
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <ProtectedRoute path="/" component={Game} />
            </Switch>
    )
};

export default Router;