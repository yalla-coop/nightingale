import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImgTitle from "../../../assets/title.png";
import ImgLogo from "../../../assets/logo.png";
import { Button, MainLogo, View, ViewParagraph } from "./index.style";

class Home extends Component {
  goStarted = () => {
    this.props.history.push(`/signup`);
  };

  render() {
    return (
      <>
        <View>
          <MainLogo src={ImgTitle} alt="logo" />
          <MainLogo src={ImgLogo} alt="logo" />
          <ViewParagraph>
            Wanna give it a go? <br />
            Then register below
          </ViewParagraph>
          <Button onClick={this.goStarted}>
            Get Started{" "}
            <span role="img" aria-label="emoji">
              🤗
            </span>
          </Button>
          <Link to="/login">
            {" "}
            Already have an account?
            <br /> Log in here{" "}
          </Link>
        </View>
      </>
    );
  }
}
export default Home;
