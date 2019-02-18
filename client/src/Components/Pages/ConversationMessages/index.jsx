import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid";
import {
  ViewDiv,
  ErrorMsg,
  MessagesDiv,
  Paragraph,
  Message,
  Head
} from "./index.style";

class Messages extends Component {
  state = {
    msg: [],
    date: "",
    day: "",
    errMsg: ""
  };

  getMessages = async () => {
    const { conversation } = this.props.match.params;

    const data = await axios(`/api/user/conversations/${conversation}`);
    const messages = data.data;

    const { msg } = this.state;
    if (messages.length === 0) {
      const msg = " No messages are found for this conversation !!";
      this.setState({ errMsg: msg, user: [], bot: [] });
    } else {
      messages.map(row => 
        msg.push([row.text, row.time, row.sender])
        );
      const { date } = messages[0];
      const time = messages[0].dayOfWeek;
      this.setState({ date, time, msg });
    }
  };

  componentDidMount = () => {
    this.getMessages();
  };
  goBack = () => {
    const { history } = this.props;
    history.push(`/conversations`);
  };
  render() {
    const { date, errMsg, time, msg } = this.state;
    return (
      <>
        <Head>
          <i
            className="fa fa-angle-left"
            onClick={this.goBack}
            aria-hidden="true"
          />
          <Paragraph>{date}</Paragraph>
          <Paragraph>{time}</Paragraph>
        </Head>
        <ViewDiv>
          {errMsg && (
            <ErrorMsg>
              {errMsg} <i className="far fa-surprise" />
            </ErrorMsg>
          )}
          {msg.map(row => (
            <MessagesDiv className={row[2]}>
              <div key={uuid()}>
                {row.map(value => (
                  <Message key={uuid()}>{value}</Message>
                ))}
              </div>
            </MessagesDiv>
          ))}
        </ViewDiv>
      </>
    );
  }
}

export default Messages;
