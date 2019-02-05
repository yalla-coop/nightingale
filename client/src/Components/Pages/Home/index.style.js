import styled from "styled-components";

export const Button = styled.button`
  background: #fff;
  display: inline-block;
  border: solid #925de5 1px;
  border-radius: 32px;
  outline: none;
  font-family: "Kodchasan", sans-serif;
  font-style: italic;
  text-align: center;
  color: #925de5;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  margin: 1rem;
  padding: 0.7rem;
  transition: all 0.1s;
  min-width: 9rem;
  :hover {
    transform: translateY(-3px);
  }

  :active {
    transform: translateY(3px);
  }
`;

export const MainLogo = styled.img`
  width: 60%;
  margin: 0 auto;
  @media (min-width: 700px) {
    display: block;
    width: 15%;
    margin: 0 auto;
  }
`;

export const View = styled.div`
  width: 100%;
  padding: 5rem 0rem 5rem 0rem;
  min-height: 100vh;
  text-align: center;
  @media (min-width: 768px) {
    padding: 5rem;
  }
  ,
  a,
  // eslint-disable-next-line prettier/prettier
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
  color: #000;
  margin: 1.5rem 0 1.5rem 0;
`;
