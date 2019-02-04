import React from "react";
import { Route } from "react-router-dom";
import Header from "../Common/Header";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import { Container } from "./index.style";

export default function index(props) {
  const { handleChangeState, isLogin } = props;
  return (
    <>
      {isLogin && <Header />}
      <Container>
        <Route
          path="/login"
          exact
          render={props => (
            <Login {...props} handleChangeState={handleChangeState} />
          )}
        />
        <Route
          path="/signup"
          exact
          render={props => (
            <SignUp {...props} handleChangeState={handleChangeState} />
          )}
        />
      </Container>
    </>
  );
}
