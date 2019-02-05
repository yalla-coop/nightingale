import React from "react";
import { Route } from "react-router-dom";
import Header from "../Common/Header";
import Login from "../Pages/Login";
import Landing from "../Pages/Landing";
import Home from "../Pages/Home";
import { Container } from "./index.style";
import Conversations from "../Pages/Conversations";

export default function index(props) {
  const { handleChangeState, isLogin } = props;
  return (
    <>
      {isLogin && <Header />}
      <Container>
        <Route
          exact
          path="/login"
          component={Login}
          handleChangeState={handleChangeState}
        />
        <Route exact path="/:id/conversations" component={Conversations} />
      </Container>

      <Route path="/" exact component={Landing} />
      <Route path="/home" exact component={Home} />
    </>
  );
}
