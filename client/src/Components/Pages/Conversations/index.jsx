import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid";
import { Div, ViewDiv, ErrorMsg, Items, Item } from "./index.style";
import Title from "../../Common/Title";

class Conversations extends Component {
  state = {
    conversations: [],
    message: ""
  };

  getConversations = () => {
    axios
      .get("/api/user/conversations")
      .then(response => {
        const { data } = response;
        const { conversations } = this.state;
        if (Object.keys(data).length === 0 || data.length === 0) {
          const msg = " There is no conversations yet !!";
          this.setState({ message: msg, conversations: [] });
        } else {
          data.map(row =>
            conversations.push([
              row.mood[0].moodEmoji,
              row.dayOfWeek,
              row.date,
              row._id
            ])
          );
          this.setState({ conversations });
        }
      })
      .catch(() => {
        const msg = " Sorry, There is an error!!";
        this.setState({ message: msg, conversations: [] });
      });
  };

  componentDidMount = () => {
    this.getConversations();
  };
  onClick = conversation => {
    this.props.history.push(`/conversations/${conversation}`);
  };

  render() {
    const { conversations, message } = this.state;
    return (
      <>
        <Title value="Conversations" />

        <Div>
          {message && (
            <ErrorMsg>
              {message} <i className="far fa-surprise" />
            </ErrorMsg>
          )}
          {conversations.map(row => (
            <ViewDiv onClick={() => this.onClick(row[3])}>
              <Items key={uuid()}>
                {row.map(value => (
                  <Item key={uuid()}>{value}</Item>
                ))}
              </Items>
            </ViewDiv>
          ))}
        </Div>
      </>
    );
  }
}

export default Conversations;
