import React, { Component } from "react";
import { Header, LogoHeader } from "./index.style";
import { withRouter, Link } from "react-router-dom";
import Menu from "../Menu";
import Img from "../../../assets/header.png";

class Logo extends Component {
  onClick = () => {
    this.props.history.push("/dashboard");
  };
  render() {
    const { handleLogout } = this.props;
    return (
      <Header>
        <LogoHeader onClick={this.onClick} src={Img} alt="logo" />
        <Menu handleLogout={handleLogout} />
        <ul>
          <li>
            <Link to="/chat">chat</Link>
          </li>
          <li>
            <Link to="/conversations">conversations</Link>
          </li>
          <li>
            <Link to="/dashboard">dashboard</Link>
          </li>
          <li>
            {" "}
            <Link to="/advice">advices</Link>
          </li>
        </ul>
      </Header>
    );
  }
}

export default withRouter(Logo);
