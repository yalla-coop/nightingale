import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";

import Title from "./../../Common/Title";
import AppTitleImage from "./../../../assets/header.png";
import AppLogoImage from "./../../../assets/logo.png";
import Input from "./../../Common/Input";
import Button from "./../../Common/Button";

import {
  AppTitle,
  AppLogo,
  Form,
  SignUpWrapper,
  SignUpText,
  SignUpLink,
  ErrorBox
} from "./index.style";

export default class SignUp extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    rePassword: ""
  };

  handleSubmit = event => {
    const handleChangeState = this.props.handleChangeState;
    event.preventDefault();

    // axios
    //   .post("/api/user/signup", this.state)
    //   .then(res => {})
    //   .catch(err => {});
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <SignUpWrapper>
        <AppTitle src={AppTitleImage} />
        <AppLogo img src={AppLogoImage} />
        <Form onSubmit={this.handleSubmit}>
          <Title value="Sign Up" />
          <Input
            placeholder="Name"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <ErrorBox>
            <p>Error mhhhhhhhhhhhhhhhhhhhh essage</p>
          </ErrorBox>
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
            type="password"
            onChange={this.handleChange}
          />
          <Input
            placeholder="Re-Password"
            name="rePassword"
            value={this.state.password}
            type="password"
            onChange={this.handleChange}
          />
          <Button value="Sign Up" />
          <SignUpText>
            Have an account? <SignUpLink to="/login">Login</SignUpLink>
          </SignUpText>
        </Form>
      </SignUpWrapper>
    );
  }
}
