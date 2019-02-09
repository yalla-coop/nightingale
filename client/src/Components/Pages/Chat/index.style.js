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
    border: 1px solid #925de5;
    font-size: 1rem;
    border-radius: 1rem;
    padding: 0.5rem;
    padding-left: 1rem;
  }
`;

export const ReplyButton = styled.button.attrs({})`
  background: rgba(248, 248, 248, 0.82);
  border: none;
  padding: 0.5rem;
  width: 70%;
  color: #925de5;
  font-size: 1rem;
  border-radius: 1rem;
  transition: all 0.1s;
  cursor: pointer;

  :hover {
    transform: translateX(-3px);
  }

  :active {
    transform: translateX(3px);
  }
`;

export const CardReply = styled.div.attrs({
  className: "flex justify-center"
})`
  background: rgba(248, 248, 248, 0.82);
  border-radius: 1rem;
  transition: all 0.1s;
  margin-bottom: 0.5rem;
  text-align: center;
  padding: 1rem;
  width: 70%;

  img {
    width: 100%;
  }

  h4 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.5rem;
  }

  a {
    margin: 0.5rem;
    color: #925de5;
    padding: 0.5rem;
  }

  :hover {
    transform: translateX(-3px);
  }

  :active {
    transform: translateX(3px);
  }
`;
