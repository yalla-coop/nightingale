import styled from "styled-components";
import { Link } from "react-router-dom";
export const View = styled.div`
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

  input {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
  }

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

export const LoginWrapperText = styled.p`
  margin: 1rem;
  text-align: center;
`;

export const LoginWrapperLink = styled(Link)`
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
