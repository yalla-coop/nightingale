import styled from "styled-components";

export const ChatWindow = styled.div`
  margin: auto;
`;

export const ConversationView = styled.div`
  width: 100%;
  min-height: 90vh;
  padding: 20px 40px;
`;

export const MessageBox = styled.div`
  width: 100%;
  padding: 20px 20px;
`;

export const Form = styled.form`
  input {
    width: 100%;
    border: 1px solid black;
    font-size: 15px;
    border-radius: 10px;
    padding: 5px;
  }
`;

export const ReplyButton = styled.button.attrs({})`
  background: rgba(248, 248, 248, 0.82);
  border: none;
  padding: 0.5rem;
  width: 70%;
  color: #925de5;
  font-size: 1rem;
  border-radius: 0.5rem;
  transition: all 0.1s;
  cursor: pointer;

  :hover {
    transform: translateX(-3px);
  }

  :active {
    transform: translateX(3px);
  }
`;
