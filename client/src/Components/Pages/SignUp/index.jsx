import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import validate from "./validation";
import Title from "./../../Common/Title";
import ImgTitle from "../../../assets/title.png";
import ImgLogo from "../../../assets/logo.png";
import Button from "./../../Common/Button";

import {
  MainLogo,
  Form,
  InputWrapper,
  Input,
  SignUpWrapper,
  SignUpText,
  SignUpLink,
  ErrorBox
} from "./index.style";

export default class SignUp extends Component {
  state = {
    name: {
      value: "",
      errMsg: ""
    },
    username: {
      value: "",
      errMsg: ""
    },
    password: {
      value: "",
      errMsg: ""
    },
    rePassword: {
      value: "",
      errMsg: ""
    }
  };

  handleSubmit = event => {
    const handleChangeState = this.props.handleChangeState;
    event.preventDefault();
    const newState = { ...this.state };
    if (
      this.state.username.value &&
      this.state.name.value &&
      this.state.password.value
    ) {
      if (this.state.password.value !== this.state.rePassword.value) {
        newState["rePassword"].errMsg = "Passwords Don't Match";
      } else {
        newState["rePassword"].errMsg = "";
        axios
          .post("/api/user/register", {
            username: this.state.username.value,
            name: this.state.name.value,
            password: this.state.password.value
          })
          .then(res => {
            handleChangeState({ ...res.data, isLogin: true });
            swal(`Welcome ${res.data.name} 😃`, "", "success", {
              timer: 1000
            }).then(() => {
              // redirect to dashboard
              this.props.history.push("/dashboard");
            });
          })
          .catch(err => {
            // handle error sent by server
            swal(err.response.data.error, "", "error");
          });
      }
    }
    this.setState(newState);
  };

  handleBlur = event => {
    const key = event.target.name;
    const value = event.target.value;
    validate(key, value).catch(err => {
      const newState = { ...this.state };
      newState[key].errMsg = err.details[0].message;
      this.setState(newState);
    });
  };
  handleChange = event => {
    const key = event.target.name;
    const value = event.target.value;

    const newState = { ...this.state };
    newState[key] = {
      errMsg: "",
      value
    };
    this.setState(newState);
  };

  render() {
    return (
      <SignUpWrapper>
        <MainLogo src={ImgTitle} alt="logo" />
        <MainLogo src={ImgLogo} alt="logo" />
        <Form onSubmit={this.handleSubmit}>
          <Title value="Sign Up" />
          <InputWrapper>
            <Input
              placeholder="Name"
              name="name"
              value={this.state.name.value}
              onChange={this.handleChange}
              autoFocus
              onBlur={this.handleBlur}
            />
            {this.state.name.errMsg && (
              <ErrorBox>
                <p>{this.state.name.errMsg}</p>
              </ErrorBox>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Username"
              name="username"
              value={this.state.username.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {this.state.username.errMsg && (
              <ErrorBox>
                <p>{this.state.username.errMsg}</p>
              </ErrorBox>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Password"
              name="password"
              value={this.state.password.value}
              type="password"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            {this.state.password.errMsg && (
              <ErrorBox>
                <p>{this.state.password.errMsg}</p>
              </ErrorBox>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Re-Password"
              name="rePassword"
              value={this.state.rePassword.value}
              type="password"
              onChange={this.handleChange}
            />
            {this.state.rePassword.errMsg && (
              <ErrorBox>
                <p>{this.state.rePassword.errMsg}</p>
              </ErrorBox>
            )}
          </InputWrapper>
          <Button value="Sign Up" />
          <SignUpText>
            Have an account? <SignUpLink to="/login">Login</SignUpLink>
          </SignUpText>
        </Form>
      </SignUpWrapper>
    );
  }
}
