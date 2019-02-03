import React, { Component } from "react";

import Title from "./../../Common/Title";
import AppTitleImage from "./../../../assets/header.png";
import AppLogoImage from "./../../../assets/logo.png";
import Input from "./../../Common/Input";
import Button from "./../../Common/Button";

import { AppTitle, AppLogo, Form, LoginWrapper } from "./index.style";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = event => {
    console.log(event.target);
    event.preventDefault();
    console.log(this.state);
    if (!this.state.username) {
      console.log("Error in USERNAME");
    }
    if (!this.state.password) {
      console.log("Error in pasword");
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <LoginWrapper>
        <AppTitle src={AppTitleImage} />
        <AppLogo img src={AppLogoImage} />
        <Form onSubmit={this.handleSubmit}>
          <Title value="Login" />
          <Input
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Input
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button value="Login" />
        </Form>
      </LoginWrapper>
    );
  }
}

export default Login;
