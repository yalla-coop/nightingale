import React, { Component } from "react";
import Pusher from "pusher-js";
import axios from "axios";

import "./index.css";

class Chat extends Component {
  // userMessage contains user input
  // conversation holds each message in conversation
  state = {
    botMessage: "",
    userMessage: "",
    conversation: []
  };
  componentDidMount() {
    const pusher = new Pusher("42ea50bcb339ed764a4e", {
      cluster: "eu",
      encrypted: true
    });
    // listening for the bot-response event on the bot channel, event gets triggered on the server and pass the response of the bot through the event payload.
    const channel = pusher.subscribe("bot");
    channel.bind("bot-response", data => {
      const botMsg = {
        text: data.message,
        user: "ai"
      };
      this.setState({
        botMessage: botMsg.text,
        conversation: [...this.state.conversation, botMsg]
      });
    });
  }
  // allows the displayed value to update as the user types
  handlechange = event => {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // after POST request, clearing the input field by setting the value of userMessage to an empty string.
    if (!this.state.userMessage.trim()) return;

    const msgHuman = {
      text: this.state.userMessage,
      user: "human"
    };

    this.setState({
      conversation: [...this.state.conversation, msgHuman]
    });

    axios.post("http://localhost:8080/api/bot/chat", {
      message: this.state.userMessage
    });
    axios.post("http://localhost:8080/api/bot/messages", {
      message: this.state.userMessage
    });

    this.setState({ userMessage: "" });
  };

  render() {
    const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };
    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );

    return (
      <div>
        <h1>React Chatbot</h1>
        <div className="chat-window">
          <div className="conversation-view">{chat}</div>
          <div className="message-box">
            <form onSubmit={this.handleSubmit}>
              <input
                value={this.state.userMessage}
                onInput={this.handlechange}
                className="text-input"
                type="text"
                autoFocus
                placeholder="Type your message and hit enter to send"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
