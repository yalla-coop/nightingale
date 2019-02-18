import React, { Component } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import swal from "sweetalert";

// about pusher
// WebSockets enable a client and a server to communicate in both directions. It lets a server send messages to the client, and vice-versa.
// Essentially, Pusher encapsulates WebSockets implementation, functionality, debugging, and hosting.
// Instead of having to run your own WebSockets server, it allows you to offload the entire process to Pusher's servers, saving you both time and money.

// import styles
import "./index.css";
import {
  ReplyButton,
  CardReply,
  ChatWindow,
  ConversationView,
  MessageBox,
  Form
} from "./index.style";

class Chat extends Component {
  // STATE ---------------------------------------------------------------------------------------------
  state = {
    botMessage: "",
    botQuickReply: [],
    botCardReply: null,
    userMessage: "",
    conversation: [],
    alreadyCompleted: false,
    infoCompletedNow: false
  };
  // userMessage contains user input
  // botQuickReply contains quick replies
  // botMessage contains dialogflow bot responses
  // conversation holds each message in conversation

  // creates Object to be used as Array for quick reply buttons
  constructor(props) {
    super(props);
    this.btn = new Map();
  }

  // LIFECYCLE METHODS ---------------------------------------------------------------------------------------------

  componentDidMount() {
    // checks what event to be sent to dialogflow
    // if no initial registration values for user (bday and subjects) -> first time login hence event needs to be 'start'

    // get the current conversation if exist
    axios
      .get("/api/user/current-conversation")
      .then(res => {
        const { data } = res;
        const conversation = data[0];
        const completedInfo = data[1];

        this.setState({ conversation, alreadyCompleted: completedInfo }, () => {
          if (completedInfo && !conversation.length) {
            // completed info then call the "event"
            this.getIntent("event")
              .then(result => console.log("event result to server", result))
              .catch(err => console.log(err));
          } else if (completedInfo && conversation.length) {
            // do nothing
          } else {
            this.getIntent("start")
              .then(result => console.log("start result to server", result))
              .catch(err => console.log(err));
          }
        });
      })
      .catch(() => {
        this.props.history.push("/server-error");
      });

    // create new Pusher
    const pusher = new Pusher("42ea50bcb339ed764a4e", {
      cluster: "eu",
      encrypted: true
    });
    // listening for the bot-response event on the bot channel
    // event gets triggered on the server and passed the response of the bot through the event payload coming from dialogflow

    // get the userid from state
    const appState = JSON.parse(localStorage.getItem("AppState"));
    const channel = pusher.subscribe(`bot_${appState.id}`);
    channel.bind("bot-response", data => {
      // if immediat support detected show a popup message
      if (data.needImmediateSupport) {
        swal({
          title: `Hey ${this.props.name}`,
          text: `I think maybe you need to talk to the psychological counselling in your school.`,
          icon: "info",
          button: {
            text: "Yes sure!"
          }
        });
      }
      if (data.completedInfo) {
        this.setState({ infoCompletedNow: true });
      }

      // loop over fullfilment-array and create message objects
      data.message.map(e => {
        const botMsg = {
          text: "",
          quickReply: [],
          cardReply: null,
          user: "ai"
        };

        //check if quickReply exist in array and update quick reply value
        if (e.message === "quickReplies") {
          botMsg.quickReply = e.quickReplies.quickReplies;
          botMsg.text = "";
        } else if (e.message === "card") {
          botMsg.cardReply = e.card;
          botMsg.text = "";
        } else {
          // if not only update bot response text
          botMsg.text = e.text.text[0];
          botMsg.quickReply = [];
        }
        // update state (with every incoming bot response)
        return this.setState({
          botMessage: botMsg.text,
          botQuickReply: botMsg.quickReply,
          botCardReply: botMsg.cardReply,
          conversation: [...this.state.conversation, botMsg]
        });
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // scroll to bottom every time the component updates
    this.scrollToBottom();
    // if the user just fill the information start the daily conv.
    if (
      !prevState.alreadyCompleted &&
      !this.state.alreadyCompleted &&
      !prevState.infoCompletedNow &&
      this.state.infoCompletedNow
    ) {
      axios.get("/api/bot/info").then(user => {
        const { birthDate, faveSubj, leastFaveSubj } = user.data;
        // set new values for state update
        const newParams = {
          bdate: birthDate,
          faveSubj: faveSubj,
          leastFaveSubj: leastFaveSubj
        };
        // update
        this.checkAppStateAndUpdate(newParams);
      });

      this.getIntent("event")
        .then(result => console.log("result to server", result))
        .catch(err => console.log(err));
    }
  }

  // FUNCTIONS ---------------------------------------------------------------------------------------------
  // function that updates localState after params bday and subjects are set
  checkAppStateAndUpdate = newParams => {
    // get existing data
    const existingState = JSON.parse(localStorage.getItem("AppState"));
    // combine existing and new state
    const newState = Object.assign(existingState, newParams);
    // update Chat new state
    this.setState(newState);
    // update the App state
    this.props.handleChangeState(newState);
    // set AppState
    localStorage.setItem("AppState", JSON.stringify(newState));
  };

  // function to get the initial intent when the user first loads this page
  getIntent = async dfEvent => {
    // currently 5 flows: start, weekday, weekend, best-subject, worst-subject
    await axios.post("/api/bot/startChat", { event: dfEvent });
  };

  // function to scroll to bottom of the page (target: dummy div called messagesEnd)
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  // allows the displayed value to update as the user types
  handleChange = event => {
    this.setState({ userMessage: event.target.value });
  };

  // post request to backend for storage and rendering
  messagetoBackEnd = async message =>
    await axios.post("/api/bot/messages", { message });

  // creates array of quick reply buttons and disables them
  disableQuickButtons = () => {
    Array.from(this.btn.values())
      .filter(btn => btn != null)
      .forEach(btn => {
        btn.style.display = "none";
        btn.disabled = "disabled";
      });
  };

  // handles user's click on quick reply buttons
  handleClick = event => {
    event.preventDefault();
    // sets button text to message value
    const msgHuman = {
      text: event.target.value,
      user: "human"
    };
    // adds it to conversation
    this.setState({
      conversation: [...this.state.conversation, msgHuman]
    });
    let message = msgHuman.text;

    // fires post request
    this.messagetoBackEnd(message)
      .then(result => console.log("received by server"))
      .catch(err => console.log(err));

    // after clicking quick reply button disable all existing buttons
    this.disableQuickButtons();
  };

  // handles submit after user hits enter
  handleSubmit = async event => {
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

    let message = this.state.userMessage;

    // post request
    this.messagetoBackEnd(message)
      .then(result => console.log("received by server"))
      .catch(err => console.log(err));

    // after POST requests, clear the input field
    this.setState({ userMessage: "" });
  };

  // RENDER -------------------------------------------------------------------------------------------------------------------------------
  render() {
    const { botQuickReply, botCardReply } = this.state;

    // function that checks if it's a quick reply or card reply
    // to decide if we should hide the message box
    const checkReply = (botQuickReply, botCardReply) => {
      // check if it's a
      if (botQuickReply.length > 0 && !botQuickReply.includes("Finished"))
        return true;
      if (botCardReply) return true;
      else return false;
    };

    // function that renders text by human or bot (ai) (defined as className) as speech bubble
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
        <div
          key={`${className}-${i}`}
          className={`${className} chat-bubble quickReply`}
        >
          <ReplyButton
            ref={el => this.btn.set(i, el)}
            disabled=""
            value={text}
            onClick={this.handleClick}
          >
            {text}
          </ReplyButton>
        </div>
      );
    };

    // function that renders cardReply as a card style speech bubble
    const CardReplyBubble = (card, className) => {
      return (
        <div
          key={`${className}`}
          className={`${className} chat-bubble quickReply`}
        >
          <CardReply>
            {card.imageUri && <img src={card.imageUri} alt="card" />}
            {card.title && <h4>{card.title}</h4>}
            {card.subtitle && <p>{card.subtitle}</p>}
            {card.buttons && (
              <a href={card.buttons[0].postback}>{card.buttons[0].text}</a>
            )}
          </CardReply>
        </div>
      );
    };

    // loop over conversation array and create chatBubbles for human and bot
    const chat = this.state.conversation.map((e1, index) => {
      // if quick reply comes from the server then render a button and set it to user: bot
      if (e1.quickReply && e1.quickReply.length > 0) {
        return e1.quickReply.map((e2, index) => {
          return QuickReplyChatBubble(e2, index, "ai");
        });
      } else if (e1.cardReply) {
        return CardReplyBubble(e1.cardReply, "ai");
      }
      return ChatBubble(e1.text, index, e1.user);
    });

    return (
      <div>
        <ChatWindow>
          <ConversationView>{chat}</ConversationView>
          <MessageBox hide={checkReply(botQuickReply, botCardReply)}>
            <Form onSubmit={this.handleSubmit}>
              <input
                value={this.state.userMessage}
                onChange={this.handleChange}
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
