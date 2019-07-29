import React from "react";
import "./App.css";
import Game from "./components/Game/Game";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <Game />
      <Login />
      <Register />
    </div>
  );
}

export default App;
