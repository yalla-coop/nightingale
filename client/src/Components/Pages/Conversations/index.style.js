import styled from "styled-components";

export const Div = styled.div`
  text-align: center;
`;

export const ViewDiv = styled.div`
  padding: 1px;
`;
export const Items = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
  border-top: 1px solid #ccc;
  height: 5rem;
  align-items: center;
  background: #fafafa;
  justify-content: space-around;
  padding: 0 3rem 0 3rem;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    border-top: none;
    border-bottom: 1px solid #ccc;
  }
`;

export const ErrorMsg = styled.p`
  color: #444;
  font-size: 1.5rem;
`;
export const Item = styled.p`
  text-decoration: none;
  :nth-child(1) {
    font-size: 2rem;
  }
  :nth-child(2) {
    color: black !important;
    font-weight: bold;
  }
  :nth-child(3) {
    color: #8c8c8c !important;
  }
  :nth-child(4) {
    display: none;
  }
`;
