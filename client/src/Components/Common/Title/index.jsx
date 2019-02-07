import React, { Component } from "react";
import { Header, Heading } from "./index.style";

export default class Title extends Component {
  render() {
    const { value } = this.props;
    return (
      <Header>
        <Heading>{value}</Heading>
      </Header>
    );
  }
}
