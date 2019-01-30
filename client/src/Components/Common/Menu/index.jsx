import React,  { Component }  from 'react';
import { MenuDiv, Menu, MenuItem, MainUl, MenuClose, MenuIcon } from './index.style';

export default class HumburgerMenu extends Component {
    state = {
      toggleShow: false,
    }

    onClick = () => {
      const { toggleShow } = this.state;
      this.setState({ toggleShow: !toggleShow });
    }

  render() {
    const { toggleShow } = this.state;
    return (
      <>
        <MenuDiv>
        {!toggleShow &&(
          <MenuIcon className="fas fa-bars"  onClick={this.onClick}></MenuIcon>
        )}
    {toggleShow && (
           <Menu>
           <MenuClose className="fas fa-times" onClick={this.onClick}></MenuClose>
          <MainUl>
            <MenuItem><i className="fas fa-info-circle"></i> Bio</MenuItem>
            <MenuItem><i class="fas fa-comments"></i> Conversation</MenuItem>
            <MenuItem><i class="fas fa-comment"></i> Start Chat</MenuItem>
            <MenuItem><i class="fas fa-link"></i> Advices</MenuItem>
            <MenuItem><i class="fas fa-smile-beam"></i> Dashboard</MenuItem>
            <MenuItem> <i class="fas fa-sign-out-alt"></i> LogOut</MenuItem>
          </MainUl>
    </Menu>
      )}
       </MenuDiv>
       </>
    );
  }
}