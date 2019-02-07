import styled from "styled-components";

export const TopDiv = styled.div`
  width: 95%;
  margin: 5px auto 15px auto;
  padding-lift: 20px;
`;
export const Name = styled.h1`
  margin-bottom: 12px;
`;
export const Welcome = styled.h2`
  margin-bottom: 12px;
`;
export const Message = styled.p`
  margin-bottom: 15px;
`;

export const DailyDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin: 0 auto;
  margin-top: 3rem;
  border-top: #7874fd solid 1px;
  padding-top: 20px;
  @media (max-width: 768px) {
    width: 95%;
  }
`;
export const Daily = styled.h5`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
export const Dailyparagraph = styled.p`
  text-align: center;
  animation: up 0.5s ease-in 0.5s;
  animation-fill-mode: both;
  :nth-child(1) {
    font-size: 1.5rem;
  }
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
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    :nth-child(1) {
      font-size: 1rem;
    }
  }
`;
