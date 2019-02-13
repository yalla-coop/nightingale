import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

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
import Chat from "../Pages/Chat";

export default function index(props) {
  const { handleChangeState, isLogin, handleLogout } = props;
  return (
    <>
      {isLogin && <Header {...props} handleLogout={handleLogout} />}
      <Container>
        <Switch>
          {/* Private Routes Here */}
          <Route
            exact
            path="/conversations"
            render={Linkprops =>
              isLogin ? (
                <Conversations
                  {...props}
                  {...Linkprops}
                  handleChangeState={handleChangeState}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/advice"
            render={Linkprops =>
              isLogin ? (
                <Advice
                  {...props}
                  {...Linkprops}
                  handleChangeState={handleChangeState}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/conversations/:conversation"
            render={Linkprops =>
              isLogin ? (
                <Messages
                  {...props}
                  {...Linkprops}
                  handleChangeState={handleChangeState}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/dashboard"
            render={Linkprops =>
              isLogin ? (
                <Dashboard
                  {...props}
                  {...Linkprops}
                  handleChangeState={handleChangeState}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/chat"
            render={Linkprops =>
              isLogin ? (
                <Chat
                  {...props}
                  {...Linkprops}
                  handleChangeState={handleChangeState}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

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
