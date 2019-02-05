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

  getConversations = async () => {
    const { id } = this.props.match.params;
    const data = await axios(`/api/user/${id}/conversations`);
    const finalData = data.data;
    const { conversations } = this.state;
    if (finalData.length === 0) {
      const msg = " There is no conversations yet !!";
      this.setState({ message: msg, conversations: [] });
    } else {
      finalData.map(row =>
        conversations.push([
          row.mood[0].moodEmoji,
          row.dayOfWeek,
          row.date,
          row._id
        ])
      );
      this.setState({ conversations });
    }
  };

  componentDidMount = () => {
    this.getConversations();
  };
  onClick = conversation => {
    const user = this.props.match.params.id;
    this.props.history.push(`/${user}/conversations/${conversation}`);
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
