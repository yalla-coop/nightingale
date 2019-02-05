import styled from "styled-components";
import img from "../../../assets/logo.png";

export const Head = styled.div`
  border-bottom: solid 2px #e5e6ea;
  text-align: center;
  top: 0;
  position: fixed;
  background: #fff;
  width: 100%;
  min-height: 80px;
  padding: 25px 0px 10px 0px;
  .fa {
    position: absolute;
    top: 0;
    left: 0;
    color: #8d2bff;
    font-size: 2rem;
    margin: 20px;
    cursor: pointer;
  }
`;

export const Paragraph = styled.p`
  font-weight: bold;
  color: #8c8c8c;
  letter-spacing: 1px;
`;
export const ViewDiv = styled.div`
  padding: 100px;
  @media (max-width: 768px) {
    padding: 100px 0px 20px 0px;
  }
`;

export const MessagesDiv = styled.div`
  :nth-child(even)::after {
    background: url(${img}) center center no-repeat;
    background-size: cover;
    display: inline-block;
    width: 30px;
    height: 20px;
    content: "";
  }
  display: block;
  clear: both;
  :nth-child(even) {
    float: left;
    margin: 5px;
  }
  :nth-child(even) p:nth-child(1) {
    font-size: 1rem;
    background: #e5e6ea;
    padding: 1rem;
    border-radius: 30px;
    color: #000;
    font-weight: 600;
    margin: 5px;
  }
  :nth-child(even) p:nth-child(2) {
    display: none;
  }
  :nth-child(odd) {
    float: right;
    color: #fff;
    font-weight: 600;
    margin: 5px;
  }
  :nth-child(odd) p:nth-child(1) {
    font-size: 1rem;
    background: #8d2bff;
    padding: 1rem;
    border-radius: 30px;
    color: #fff;
    font-weight: 600;
    margin: 5px;
  }
  :nth-child(odd) p:nth-child(2) {
    color: #8c8c8c !important;
    margin-left: 80%;
    display: inline;
  }
`;

export const Message = styled.p`
  :empty {
    display: none;
  }
`;

export const ErrorMsg = styled.p`
  color: #444;
  font-size: 1.5rem;
`;
