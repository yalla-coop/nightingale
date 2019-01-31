import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Common/Header';
import Login from '../Pages/Login'  ;
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
    </Container>
      </>
  );
}