import React, { Component } from "react";
import { Header, LogoHeader, QuickMenu, TopHeader } from "./index.style";
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
        <TopHeader>
          <LogoHeader onClick={this.onClick} src={Img} alt="logo" />
          <Menu handleLogout={handleLogout} />
        </TopHeader>
        <QuickMenu>
          <ul>
            <li>
              <Link to="/chat">
                <i className="fas fa-comment" />
              </Link>
            </li>
            <li>
              <Link to="/conversations">
                <i className="fas fa-history" />
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                {" "}
                <i className="fas fa-smile-beam" />
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/advice">
                {" "}
                <i className="fas fa-link" />
              </Link>
            </li>
          </ul>
        </QuickMenu>
      </Header>
    );
  }
}

export default withRouter(Logo);
