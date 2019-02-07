import styled from "styled-components";

export const Container = styled.div`
  margin: 3rem;
  @media (max-width: 768px) {
    margin: 0rem;
    margin-top: 1rem;
  }
`;

export const Link = styled.a`
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
  , :focus: {
    display: block;
    color: #925de5;
  }
`;
