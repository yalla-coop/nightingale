import styled from "styled-components";
import { Link } from "react-router-dom";

export const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 50px 0;
`;

export const AppTitle = styled.img`
  display: block;
  object-fit: contain;
  width: 80%;
  max-width: 400px;
`;

export const AppLogo = styled.img`
  display: block;
  object-fit: contain;
  width: 50%;
  max-width: 250px;
`;

export const Form = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-item: center;
  width: 85%;
  padding: 25px 0;
  box-shadow: 0px 0px 6px #ccc;
  margin-top: 25px;
  border-radius: 8px;
  max-width: 500px;
  input {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  button {
    max-width: 100px;
    margin: 12px auto;
  }
  h1 {
    border: none;
  }
`;

export const SignUpText = styled.p`
  text-align: center;
`;

export const SignUpLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 900;
`;
export const ErrorBox = styled.div`
  position: relative;
  min-width: 120px;
  max-width: 85%;
  background-color: #cccccc38;
  margin: 0 auto;
  text-align: center;
  border-radius: 4px;
  padding: 5px 10px;
  color: red;
  margin-top: -6px;

  &:before {
    display: block;
    position: absolute;
    left: 10%;
    top: -5px;
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #cccccc38;
  }
`;
