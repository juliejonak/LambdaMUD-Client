import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Game from "./components/Game/Game";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

const isAuthorized = () => {
    return Boolean(localStorage.getItem("authToken"));
};

const ProtectedRoute = ( { component: Component, ...rest }) => {
    return(
        <Route {...rest} render={props => isAuthorized() ? (<Component {...props} />) : (<Redirect to={{pathname: "/login"}} />)} />
    )};

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