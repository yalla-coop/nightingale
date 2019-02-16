import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import Title from "./../../Common/Title";
import ImgLogo from "../../../assets/logo.png";
import Input from "./../../Common/Input";
import Button from "./../../Common/Button";

import {
  MainLogo,
  View,
  Form,
  LoginWrapperText,
  LoginWrapperLink
} from "./index.style";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = event => {
    const handleChangeState = this.props.handleChangeState;
    event.preventDefault();
    // show error message for missing fields
    if (!this.state.username) {
      swal("You should input your username", "", "error");
    } else if (!this.state.password) {
      swal("You should input your password", "", "error");
    } else {
      axios
        .post("/api/user/login", this.state)
        .then(res => {
          // store user's data into the App state
          handleChangeState({ ...res.data, isLogin: true });

          swal(`Welcome back ${res.data.name} 😃`, "", "success", {
            timer: 1000
          }).then(() => {
            // redirect to dashboard
            this.props.history.push("/dashboard");
          });
        })
        .catch(err => {
          swal(err.response.data.error, "", "error");
        });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <View>
        <Form onSubmit={this.handleSubmit}>
          <MainLogo src={ImgLogo} alt="logo" />
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
            type="password"
            onChange={this.handleChange}
          />
          <Button value="Login" />
          <LoginWrapperText>
            don't have an account?{" "}
            <LoginWrapperLink to="/signup">sign up now!</LoginWrapperLink>
          </LoginWrapperText>
        </Form>
      </View>
    );
  }
}

export default Login;
