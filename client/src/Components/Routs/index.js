import React from "react";
import { Route } from "react-router-dom";

import Header from "../Common/Header";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Advice from "../Pages/Advice";

import Landing from "../Pages/Landing";
import Messages from "../Pages/ConversationMessages";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
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
        <Route exact path="/conversations" component={Conversations} />
        <Route exact path="/conversations/:conversation" component={Messages} />
        <Route exact path="/advice" component={Advice} />
      </Container>

      <Route path="/" exact component={Landing} />
      <Route path="/home" exact component={Home} />
      <Route
        path="/dashboard"
        exact
        render={Linkprops => <Dashboard {...props} {...Linkprops} />}
      />
    </>
  );
}
