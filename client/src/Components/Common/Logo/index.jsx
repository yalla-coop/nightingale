import React, { Component } from "react";
import { LogoDiv, Logo, LogoTitle } from "./index.style";

import Src from "../../../assets/logo.png";
import SrcTitle from "../../../assets/title.png";

export default class MainLogo extends Component {
  render() {
    return (
      <>
        <LogoDiv>
          <LogoTitle src={SrcTitle} alt="logo title" />
          <Logo src={Src} alt="logo" />
        </LogoDiv>
      </>
    );
  }
}
