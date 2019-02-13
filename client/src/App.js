import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import jwt from "jsonwebtoken";

import "./App.css";
import Routes from "./Components/Routs";

class App extends Component {
  state = {
    username: "",
    id: "",
    name: "",
    isLogin: false,
    bdate: "",
    faveSubj: "",
    leastFaveSubj: "",
    token: ""
  };

  // make a copy for the initial state
  baseState = this.state;

  handleChangeState = object => {
    // store the incomming oject into state and store the new state inot loacal storage
    this.setState(object, () => {
      localStorage.setItem("AppState", JSON.stringify(this.state));
    });
  };

  componentDidMount() {
    // get the App state from the loal storage
    const AppState = localStorage.getItem("AppState");
    this.setState(JSON.parse(AppState));

    // decode the token
    if (JSON.parse(AppState) && JSON.parse(AppState).token) {
      const token = JSON.parse(AppState).token;
      var decoded = jwt.decode(token);

      // check if the the token expired
      if (Date.now() / 1000 > decoded.exp) {
        this.handleLogout();
      }
    }
  }

  handleLogout = () => {
    localStorage.removeItem("AppState");
    this.handleChangeState(this.baseState);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <>
            <Routes
              handleChangeState={this.handleChangeState}
              handleLogout={this.handleLogout}
              isLogin={this.state.isLogin}
              {...this.state}
            />
          </>
        </div>
      </Router>
    );
  }
}

export default App;
