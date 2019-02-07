import styled from "styled-components";

export const PieChart = styled.div`
  display: block;
  width: 60%;
  clear: both;
  overflow: hidden;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const Header = styled.h4`
  font-size: 20px;
  color: #333333;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Charts = styled.div`
  margin-top: 3rem;
  margin-left: 20rem;
  @media (max-width: 768px) {
    min-width: 50px;
    margin-left: 0rem;
  }
`;

export const Title = styled.div`
  animation: down 0.7s ease-in 0.5s;
  animation-fill-mode: both;
  font-size: 1rem;
  padding-lift: 15px;
  color: #555555;
  justify-content: flex-start;
  display: flex;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
export const Description = styled.span`
  display: inline-block;
  margin: 0px 12px 0px 15px;
  font-size: 18px;
`;
export const Svg = styled.svg`
  float: left;
  animation: down 0.7s ease-in;

  @keyframes down {
    0% {
      opacity: 0;
      transform: translateY(-1rem);
    }
    70% {
      transform: translateY(0.1rem);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  }
`;

export const Count = styled.span`
  font-size: 18px;
`;
