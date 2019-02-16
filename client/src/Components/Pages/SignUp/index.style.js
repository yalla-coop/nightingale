import styled from "styled-components";
import { Link } from "react-router-dom";

export const SignUpWrapper = styled.div`
  width: 100%;
  padding: 2rem 0.5rem 5rem 0.5rem;
  min-height: 100vh;
  text-align: center;
  @media (min-width: 768px) {
    padding: 0rem;
    padding-top: 4rem;
    box-sizing: border-box;
  }
`;

export const MainLogo = styled.img`
  height: 6rem;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  padding: 25px 0;
  box-shadow: 0px 0px 6px #ccc;

  border-radius: 0.5rem;
  max-width: 600px;

  button {
    max-width: 100px;
    margin: 12px auto;
  }
  h1 {
    border: none;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  @media (max-width: 768px) {
    width: 85%;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  margin: 0 auto;
`;

export const Input = styled.input`
  outline: none;
  border: solid 0.5px #c8c7cc;
  margin: 1rem 0;
  display: block;
  height: 35px;
  padding: 0 1rem;
  border-radius: 100px;
  outline-color: orange;
  font-size: 16px;
  width: 100%;
  /* max-width: 400px; */
`;

export const SignUpText = styled.p`
  text-align: center;
`;

export const SignUpLink = styled(Link)`
  display: block;
  color: #925de5;
  :hover {
    display: block;
    color: #925de5;
  }
  ,
  :active {
    display: block;
    color: #925de5;
  }
  ,
  :visited {
    display: block;
    color: #925de5;
  }
  ,
  :focus {
    display: block;
    color: #925de5;
  }
`;

export const ErrorBox = styled.div`
  position: absolute;
  min-width: 95%;
  /* background-color: #cccccc38; */
  margin: 0 auto;
  text-align: center;
  border-radius: 4px;
  /* padding: 5px 10px; */
  /* margin-bottom: 0.5rem; */
  color: red;
  transform: translate(-50%, -50%);
  /* top: 101%; */
  top: 100%;
  z-index: 1;
  left: 50%;
  font-size: 12px;

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
