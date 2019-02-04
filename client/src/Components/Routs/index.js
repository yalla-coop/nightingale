import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Common/Header';
import Login from '../Pages/Login'  ;
import Conversations from '../Pages/Conversations'  ;
import { Container } from './index.style';

export default function index() {
    return (
      <>
        <Header />
      <Container>
            <Route
              exact
              path="/login"
              component={Login}
            />
            <Route
              exact
              path="/:id/conversations"
              component={Conversations}
            />
    </Container>
      </>
  );
}