import styled from "styled-components";
import { Link } from "react-router-dom";

export const MenuDiv = styled.div`
  /* position: absolute;
  top: 0;
  right: 0; */
  /* padding: 0px 20px 0px 0px; */
  justify-self: flex-end;
  z-index: 1000;
`;
export const Menu = styled.div`
  position: absolute;
  background: #e3e3ea;
  z-index: 100;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  transition: all 500ms ease;
  padding: 40px 10px;
  z-index: 1000;
`;
export const MainDiv = styled.div`
  padding: 2rem 0 0 2rem;
`;
export const MenuItem = styled(Link)`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  color: #6b6277;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 500ms ease;
  cursor: pointer;

  i {
    margin-right: 0.5rem;
  }

  :hover {
    text-indent: 10px;
    color: #925de5;
  }
`;
export const MenuIcon = styled.i`
  color: #925de5;
  font-size: 25px;
  cursor: pointer;
`;
export const MenuClose = styled.i`
  position: absolute;
  font-size: 23px;
  top: 0;
  left: 0;
  margin: 20px 0px 10px 10px;
  cursor: pointer;
  color: #6b6277;
  cursor: pointer;
  :hover {
    color: #925de5;
  }
`;
