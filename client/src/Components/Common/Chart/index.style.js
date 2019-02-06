import styled from "styled-components";

export const PieChart = styled.div`
  display: block;
  width: 60%;
  margin: 0 auto;
`;

export const Header = styled.h4`
  font-size: 20px;
  color: #333333;
  margin-top: 2rem;
`;

export const Charts = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
    animation: up 0.5s ease-in 0.5s;
    animation-fill-mode: both;
    font-size: 13px;
    color:#555555;


  @keyframes up {
    0% {
      visibility: visible;
      opacity: 0;
      transform: translateY(1rem);
    }
    70% {
      transform: translateY(-0.1rem);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
`;
export const Decription = styled.span`
  display: inline-block;
  width: 30px;
  height: 15px;
  margin-right: 30px;
`;
export const Svg = styled.svg`
  margin-top: 4rem;
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

export const Img = styled.img``;
