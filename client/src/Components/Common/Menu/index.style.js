import styled from "styled-components";
import { Link } from "react-router-dom";

export const MenuDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px 20px 0px 0px;
  z-index: 1000;
`;
export const Menu = styled.div`
  position: absolute;
  background: #cccccc75;
  z-index: 1000;
  top: 0;
  right: 0;
  width: 200px;
  height: 100vh;
  transition: all 500ms ease;
  padding: 40px 10px;
`;
export const MainDiv = styled.div`
  padding: 2rem 0 0 2rem;
`;
export const MenuItem = styled(Link)`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  color: #283d4c;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 500ms ease;
  cursor: pointer;

  i {
    margin-right: 0.5rem;
  }

  :hover {
    text-indent: 5px;
    color: #2c1f46;
  }
`;
export const MenuIcon = styled.i`
  color: #925de5;
  font-size: 25px;
  cursor: pointer;
`;
export const MenuClose = styled.i`
  color: #283d4c;
  position: absolute;
  font-size: 20px;
  top: 0;
  left: 0;
  margin: 20px 0px 10px 5px;
  cursor: pointer;
`;
