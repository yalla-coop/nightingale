import React from "react";
import { Route } from "react-router-dom";
import Header from "../Common/Header";
import { Container } from "./index.style";
import Login from "../Pages/Login";
import Conversations from "../Pages/Conversations";

export default function index(props) {
  const { handleChangeState, isLogin } = props;
  return (
    <>
      {isLogin && <Header />}
      <Container>
        <Route exact path="/login" component={Login} />
        <Route exact path="/:id/conversations" component={Conversations} />
      </Container>
    </>
  );
}
