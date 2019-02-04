import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginWrapper = styled.div`
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

export const LoginWrapperText = styled.p`
  text-align: center;
`;

export const LoginWrapperLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 900;
`;
