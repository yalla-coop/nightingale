import React, { Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Header from "../Common/Header";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Advice from "../Pages/Advice";

import Landing from "../Pages/Landing";
import Messages from "../Pages/ConversationMessages";
import Home from "../Pages/Home";

import { Container } from "./index.style";
import Conversations from "../Pages/Conversations";

export default function index(props) {
  const { handleChangeState, isLogin } = props;
  return (
    <>
      {isLogin && <Header />}
      <Container>
        <Switch>
          {/* Private Routes Here */}
          {isLogin && (
            <Route
              exact
              path="/conversations"
              render={RouteProps => (
                <Conversations
                  {...props}
                  {...RouteProps}
                  handleChangeState={handleChangeState}
                />
              )}
            />
          )}
          {isLogin && <Route exact path="/advice" component={Advice} />}
          {isLogin && (
            <Route
              exact
              path="/conversations/:conversation"
              component={Messages}
            />
          )}

          {/* Public Routes Here */}
          <Route path="/home" exact component={Home} />

          {/* Public Routes For Not Logged In Users Here */}
          <Route
            path="/"
            exact
            render={props =>
              !isLogin ? (
                <Landing {...props} handleChangeState={handleChangeState} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={props =>
              !isLogin ? (
                <Login {...props} handleChangeState={handleChangeState} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            path="/signup"
            exact
            render={props =>
              !isLogin ? (
                <SignUp {...props} handleChangeState={handleChangeState} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />

          {/* 404 Error Page -need to be created */}
          <Route component={A} />
        </Switch>
      </Container>
    </>
  );
}

function A() {
  return <h1>Page Not Found</h1>;
}
