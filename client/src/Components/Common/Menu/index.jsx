import React, { Component } from "react";
import {
  MenuDiv,
  Menu,
  MenuItem,
  MainDiv,
  MenuClose,
  MenuIcon
} from "./index.style";

export default class HumburgerMenu extends Component {
  state = {
    toggleShow: false
  };

  onClick = () => {
    const { toggleShow } = this.state;
    this.setState({ toggleShow: !toggleShow });
  };

  render() {
    const { toggleShow } = this.state;
    return (
      <>
        <MenuDiv>
          {!toggleShow && (
            <MenuIcon className="fas fa-bars" onClick={this.onClick} />
          )}
          {toggleShow && (
            <Menu>
              <MenuClose className="fas fa-times" onClick={this.onClick} />
              <MainDiv>
                <MenuItem to="/bio">
                  <i className="fas fa-info-circle" /> Bio
                </MenuItem>
                <MenuItem to="/conversations">
                  <i class="fas fa-comments" /> Conversation
                </MenuItem>
                <MenuItem to="/chat">
                  <i class="fas fa-comment" /> Start Chat
                </MenuItem>
                <MenuItem to="/advice">
                  <i class="fas fa-link" /> Advice
                </MenuItem>
                <MenuItem to="/dashboard">
                  <i class="fas fa-smile-beam" /> Dashboard
                </MenuItem>
                <MenuItem to="/">
                  {" "}
                  <i class="fas fa-sign-out-alt" /> LogOut
                </MenuItem>
              </MainDiv>
            </Menu>
          )}
        </MenuDiv>
      </>
    );
  }
}
