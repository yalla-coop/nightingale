import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../../Common/Button";
import Img from "../../../assets/mainLogo.png";
import ImgTitle from "../../../assets/title.png";
import ImgLogo from "../../../assets/logo.png";
import { LandingDiv, MainLogo, View, ViewParagraph } from "./index.style";

class Landing extends Component {
  state = {
    pageOne: true,
    pageTwo: false,
    pageThree: false,
    pageFour: false
  };
  onClickOne = () => {
    this.setState({ pageOne: false, pageTwo: true });
  };

  onClickTwo = () => {
    this.setState({ pageTwo: false, pageThree: true });
  };
  onClickThree = () => {
    this.setState({ pageThree: false, pageFour: true });
  };
  goHome = () => {
    this.props.history.push(`/home`);
  };

  render() {
    const { pageOne, pageTwo, pageThree, pageFour } = this.state;
    return (
      <>
        {pageOne && (
          <LandingDiv onClick={this.onClickOne}>
            <MainLogo src={Img} alt="logo" />
          </LandingDiv>
        )}
        {pageTwo && (
          <View>
            <MainLogo src={ImgTitle} alt="logo" />
            <MainLogo src={ImgLogo} alt="logo" />
            <ViewParagraph>
              Hey! I'm Nightingale, a personal buddy to help you enjoy school.
              <span role="img" aria-label="emoji">
                🤗
              </span>
            </ViewParagraph>
            <Button value="Get Started" onClick={this.onClickTwo} />
            <Link to="/login">Already have an account? Log in here</Link>
          </View>
        )}

        {pageThree && (
          <View>
            <MainLogo src={ImgTitle} alt="logo" />
            <MainLogo src={ImgLogo} alt="logo" />
            <ViewParagraph>
              Chat with me every day about your school experiences to clear your
              head and get the chance to reflect on what affects your mood.
            </ViewParagraph>
            <Button value="Sure thing" onClick={this.onClickThree} />
          </View>
        )}
        {pageFour && (
          <View>
            <MainLogo src={ImgTitle} alt="logo" />
            <MainLogo src={ImgLogo} alt="logo" />
            <ViewParagraph>
              Even get a daily breakdown of your mood and experiences so you can
              spot trends!
            </ViewParagraph>
            <Button value="Got it" onClick={this.goHome} />
          </View>
        )}
      </>
    );
  }
}
export default Landing;
