import React, { Component } from "react";
import {
  MenuDiv,
  Menu,
  MenuItem,
  MainUl,
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
              <MainUl>
                <MenuItem>
                  <i className="fas fa-info-circle" /> Bio
                </MenuItem>
                <MenuItem>
                  <i class="fas fa-comments" /> Conversation
                </MenuItem>
                <MenuItem>
                  <i class="fas fa-comment" /> Start Chat
                </MenuItem>
                <MenuItem>
                  <i class="fas fa-link" /> Advices
                </MenuItem>
                <MenuItem>
                  <i class="fas fa-smile-beam" /> Dashboard
                </MenuItem>
                <MenuItem>
                  {" "}
                  <i class="fas fa-sign-out-alt" /> LogOut
                </MenuItem>
              </MainUl>
            </Menu>
          )}
        </MenuDiv>
      </>
    );
  }
}
