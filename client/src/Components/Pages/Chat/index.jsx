import React, { Component } from "react";
import Pusher from "pusher-js";
import axios from "axios";

// about pusher
// WebSockets enable a client and a server to communicate in both directions. It lets a server send messages to the client, and vice-versa.
// Essentially, Pusher encapsulates WebSockets implementation, functionality, debugging, and hosting.
// Instead of having to run your own WebSockets server, it allows you to offload the entire process to Pusher's servers, saving you both time and money.

// import styles
import "./index.css";
import { ChatWindow, ConversationView, MessageBox, Form } from "./index.style";

class Chat extends Component {
  // userMessage contains user input
  // botMessage contains dialogflow responses
  // conversation holds each message in conversation
  state = {
    botMessage: "",
    botQuickReply: [],
    userMessage: "",
    conversation: []
  };

  // function to scroll to bottom of the page (dummy div called messagesEnd)
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    // create new Pusher
    const pusher = new Pusher("42ea50bcb339ed764a4e", {
      cluster: "eu",
      encrypted: true
    });
    // listening for the bot-response event on the bot channel, event gets triggered on the server and passed the response of the bot through the event payload coming from dialogflow
    const channel = pusher.subscribe("bot");

    channel.bind("bot-response", data => {
      data.message.map(e => {
        const botMsg = {
          text: "",
          quickReply: [],
          user: "ai"
        };
        //check if quickReply exists
        if (e.message === "quickReplies") {
          botMsg.quickReply = e.quickReplies.quickReplies;
          botMsg.text = "";
        } else {
          botMsg.text = e.text.text[0];
          botMsg.quickReply = [];
        }
        // update state with every incoming bot response
        return this.setState({
          botMessage: botMsg.text,
          botQuickReply: botMsg.quickReply,
          conversation: [...this.state.conversation, botMsg]
        });
      });
    });
  }

  // scroll to bottom every time the component updates
  componentDidUpdate() {
    this.scrollToBottom();
  }

  // allows the displayed value to update as the user types
  handleChange = event => {
    this.setState({ userMessage: event.target.value });
  };

  handleClick = event => {
    const msgHuman = {
      text: event.target.value,
      user: "human"
    };

    this.setState({
      conversation: [...this.state.conversation, msgHuman]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // Remove whitespace from both sides of a string:
    if (!this.state.userMessage.trim()) return;
    // set up user message to be sent to backend
    const msgHuman = {
      text: this.state.userMessage,
      user: "human"
    };

    this.setState({
      conversation: [...this.state.conversation, msgHuman]
    });

    // 1) post request to pusher route for rendering
    const messageRender = () =>
      axios.post("/api/bot/chat", {
        message: this.state.userMessage
      });

    // 2) post request to storage route
    const messageStorage = () =>
      axios.post("/api/bot/messages", {
        message: this.state.userMessage
      });
    messageRender();

    // axios
    //   .all([messageRender(), messageStorage()])
    //   .then(result => console.log("received by server"))
    //   .catch(err => console.log(err));

    // after POST requests, clearing the input field
    this.setState({ userMessage: "" });
  };

  render() {
    // function that renders text by human or ai (defined as className) as speech bubble
    const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };
    // function that renders quickReply button as speech bubble
    const QuickReplyChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <button value={text} onClick={this.handleClick}>
            {text}
          </button>
        </div>
      );
    };
    // loop over conversation array and create chatBubbles for human and bot
    const chat = this.state.conversation.map((e1, index) => {
      // if a quick reply comes from the server then render a button
      if (e1.quickReply && e1.quickReply.length > 0) {
        return e1.quickReply.map((e2, index) => {
          return QuickReplyChatBubble(e2, index, "ai");
        });
      }
      return ChatBubble(e1.text, index, e1.user);
    });
    return (
      <div>
        <ChatWindow>
          <ConversationView>{chat}</ConversationView>
          <MessageBox>
            <Form onSubmit={this.handleSubmit}>
              <input
                value={this.state.userMessage}
                onInput={this.handleChange}
                className="text-input"
                type="text"
                autoFocus
                placeholder="Type your message and hit enter to send"
              />
            </Form>
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </MessageBox>
        </ChatWindow>
      </div>
    );
  }
}

export default Chat;
