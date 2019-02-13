import React from "react";
import renderer from "react-test-renderer";
import Conversations from "./index.jsx";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { ReplyButton } from "./index.style";

// set enzyme configuration
configure({ adapter: new Adapter() });

describe("Chat", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Conversations />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("mounts correctly", done => {
    const wrapper = mount(<Conversations />);
    expect(1).toBe(1);
    // mock the data
    const state = {
      botCardReply: null,
      botMessage: null,
      botQuickReply: ["Amazing", "Good2", "Meh", "Not great", "Terrible"],
      conversation: [
        { cardReply: null, quickReply: [], text: "Hi! 👋", user: "ai" },
        {
          cardReply: null,
          quickReply: [],
          text: "How was your school day?",
          user: "ai"
        },
        {
          cardReply: null,
          quickReply: ["Amazing", "Good", "Meh", "Not great", "Terrible"],
          text: "",
          user: "ai"
        },
        {
          userMessage: ""
        }
      ]
    };

    wrapper.setState(state);

    // it should have a 5 reply buttons
    expect(wrapper.find(`.${ReplyButton.styledComponentId}`)).toHaveLength(5);

    // expect the first reply card to have a "Amazing" value
    const amazingButton = wrapper
      .find(`.${ReplyButton.styledComponentId}`)
      .first();
    expect(amazingButton.html()).toMatch("Amazing");

    // state length before select a reply
    const oldState = wrapper.state().conversation.length;

    // simulate "click" event on reply buuton
    amazingButton.simulate("click");

    // the new state after selecting a reply
    const newState = wrapper.state().conversation.length;

    //the new reply should be stored in the state
    expect(newState - oldState).toBe(1);
    window.location = "/";
    done();
  });
});
