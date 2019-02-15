import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  background: #fff;
  top: 0;
  height: 5rem;
  /* padding: 10px 0px 0px 20px; */
  padding: 1rem 1rem 0 1rem;
  box-shadow: 1px 1px 1px 3px rgba(181, 168, 168, 0.5);
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */

  & + * {
    padding-top: 6rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem 0px 1rem;
  }
`;

export const TopHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const LogoHeader = styled.img`
  cursor: pointer;
  height: 100%;
`;

export const QuickMenu = styled.div`
  /* display: flex; */

  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  width: 70%;
  align-self: center;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-self: flex-end;
    color: #8a8a8f;
    position: absolute;
    bottom: 0.25rem;
    /* margin-left: 25%; */
    /* padding: 55px 5px 0px 5px; */
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
      ,
      :focus {
        color: #8a8a8f;
      }
    }
  }
  @media (max-width: 768px) {
    width: 100%;

    ul {
      /* font-size: 0.75rem; */
      margin-left: 0;
      width: 100%;
    }
  }
`;
