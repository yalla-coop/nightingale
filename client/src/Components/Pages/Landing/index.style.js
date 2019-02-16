import styled from "styled-components";

export const LandingDiv = styled.div`
  background: linear-gradient(to top, #925de5, #cec8d8, #fff);
  min-height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const MainLogo = styled.img`
  width: 60%;
  margin: 0 auto;
  @media (min-width: 700px) {
    display: block;
    width: 20%;
    margin: 0 auto;
  }
`;

export const View = styled.div`
  width: 100%;
  padding: 5rem 0.5rem 5rem 0.5rem;
  min-height: 100vh;
  text-align: center;
  @media (min-width: 768px) {
    padding: 8rem 5rem 5rem 5rem;
  }
  ,
  a,
  /* // eslint-disable-next-line prettier/prettier */
  Link {
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
  }
`;

export const ViewParagraph = styled.p`
  text-align: center;
  margin: 1.5rem 0 1.5rem 0;
  color: #000;
`;
