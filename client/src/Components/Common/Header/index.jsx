import React, { Component } from "react";
import { Header, LogoHeader } from "./index.style";
import { withRouter } from "react-router-dom";
import Menu from "../Menu";
import Img from "../../../assets/header.png";

class Logo extends Component {
  onClick = () => {
    this.props.history.push("/dashboard");
  };
  render() {
    const { handleChangeState } = this.props;
    return (
      <Header>
        <LogoHeader onClick={this.onClick} src={Img} alt="logo" />
        <Menu handleChangeState={handleChangeState} />
      </Header>
    );
  }
}

export default withRouter(Logo);
