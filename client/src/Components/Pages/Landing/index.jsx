import React, { Component } from "react";
import Img from "../../../assets/mainLogo.png";
import "./style.css";

class Landing extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="landing">
          <img src={Img} />
        </div>
      </>
    );
  }
}
export default Landing;
