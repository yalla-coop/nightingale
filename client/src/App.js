import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./Components/Routs";

class App extends Component {
  state = {
    username: "",
    id: "",
    name: "",
    isLogin: false
  };

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
  }

  render() {
    return (
      <Router>
        <div className="App">
          <>
            <Routes
              handleChangeState={this.handleChangeState}
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
