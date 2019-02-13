import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  background: #fff;
  top: 0;
  height: 80px;
  padding: 10px 0px 0px 20px;
  box-shadow: 1px 1px 1px 3px rgba(181, 168, 168, 0.5);
  width: 100%;

  & + * {
    padding-top: 80px;
  }
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    width: 50%;
    color: #8a8a8f;
    position: fixed;
    top: 0;
    margin-left: 25%;
    padding: 55px 5px 0px 5px;
    font-weight: bold;
    li a {
      display: block;
      text-transform: capitalize;
      color: #8a8a8f;
      :hover {
        color: #5f5bfd !important;
      }
      ,
      :active {
        color: #8a8a8f;
      }
      ,
      :visited {
        color: #8a8a8f;
      }
      , :focus: {
        color: #8a8a8f;
      }
    }
  }
  @media (max-width: 768px) {
    padding: 10px 0px 0px 0px;
    ul {
      font-size: 15px;
      margin-left: 0;
      width: 100%;
    }
  }
`;

export const LogoHeader = styled.img`
  cursor: pointer;
`;
