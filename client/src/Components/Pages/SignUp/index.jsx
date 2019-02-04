import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";

import validate from "./validation";

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
    rePassword:{
      value: "",
      errMsg: ""
    },
  };

  handleSubmit = event => {
    const handleChangeState = this.props.handleChangeState;
    event.preventDefault();
    
    // axios
    //   .post("/api/user/signup", this.state)
    //   .then(res => {})
    //   .catch(err => {});
  };

  // validate(event.target.name, event.target.value).then(res=>{
  //   console.log(res);
  // }).catch(err=> {
  //   console.log(err.details[0].message);
    
  // })
  
  handleBlur = (event) => {
    console.log(2222222222);
    const key = event.target.name
    const value = event.target.value
      validate(key, value).then(res=>{
      }).catch(err=> {
        const newState = {
          ...this.state,
          [key]: {
            ...this.state[key],
            errMsg: err.details[0].message
          }
        }
        console.log(newState);
        
    this.setState(newState);
  })
  }
  handleChange = event => {
    const key = event.target.name
    const value = event.target.value

const newState = {
  ...this.state,
  [key]: {
    errMsg: "",
    value
  }
}
console.log(newState);
    this.setState(newState);
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
            name="name"
            value={this.state.name.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {
            this.state.name.errMsg && 
          <ErrorBox>
            <p>{this.state.name.errMsg}</p>
          </ErrorBox>
          }
          <Input
            placeholder="Username"
            name="username"
            value={this.state.username.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
                    {
            this.state.username.errMsg && 
          <ErrorBox>
            <p>{this.state.username.errMsg}</p>
          </ErrorBox>
          }
          <Input
            placeholder="Password"
            name="password"
            value={this.state.password.value}
            type="password"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
                    {
            this.state.password.errMsg && 
          <ErrorBox>
            <p>{this.state.password.errMsg}</p>
          </ErrorBox>
          }
          <Input
            placeholder="Re-Password"
            name="rePassword"
            value={this.state.rePassword.value}
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
