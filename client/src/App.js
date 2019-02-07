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
    this.setState(object);
  };

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
