
import styled from 'styled-components'

export const Button = styled.button`
    background: #555;
    border: none;
    border-radius: 5px;
    outline: none;
    font-family: 'Kodchasan', sans-serif;
    font-style: italic;
    text-align: center;
    color:#fff;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    margin: 1rem;
    padding: 0.5rem;
    transition: all .1s;
    min-width: 9rem;

  :hover {
    transform: translateY(-3px);
  }
  
  :active{
    transform: translateY(3px);
  }
`