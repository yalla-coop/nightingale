import React from "react";
import { Route } from "react-router-dom";
import Header from "../Common/Header";
import Login from "../Pages/Login";
import Landing from "../Pages/Landing";
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
          path="/"
          exact
          render={props => (
            <Landing {...props} handleChangeState={handleChangeState} />
          )}
        />
      </Container>
    </>
  );
}
