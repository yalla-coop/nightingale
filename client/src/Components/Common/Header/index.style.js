import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  background: #edeeee;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 20px;
  box-shadow: 1px 1px 1px 3px rgba(181, 168, 168, 0.5);
  width: 100%;

  & + * {
    padding-top: 60px;
  }
`;
