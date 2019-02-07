import React from "react";
import renderer from "react-test-renderer";
import Conversations from "./index.jsx";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { ViewDiv } from "./index.style";

// set enzyme configuration
configure({ adapter: new Adapter() });

describe("Conversations", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Conversations />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const wrapper = mount(<Conversations />);
    // mock the data
    const data = [
      {
        _id: "5c5a12ea642a9610d8339326",
        mood: [
          {
            _id: "5c5a12e9642a9610d833931e",
            moodEmoji: "😃",
            moodDescription: "amazing",
            score: 5,
            __v: 0
          }
        ],
        dayOfWeek: "Yesterday",
        date: "5 Feb"
      },
      {
        _id: "5c5a12ea642a9610d8339327",
        mood: [
          {
            _id: "5c5a12e9642a9610d833931f",
            moodEmoji: "😌",
            moodDescription: "good",
            score: 4,
            __v: 0
          }
        ],
        dayOfWeek: "Sunday",
        date: "27 Jan"
      },
      {
        _id: "5c5a12ea642a9610d8339328",
        mood: [
          {
            _id: "5c5a12e9642a9610d833931f",
            moodEmoji: "😌",
            moodDescription: "good",
            score: 4,
            __v: 0
          }
        ],
        dayOfWeek: "Monday",
        date: "28 Jan"
      }
    ];

    const conversations = [];

    // iterate through the data to change its chape
    data.map(row =>
      conversations.push([
        row.mood[0].moodEmoji,
        row.dayOfWeek,
        row.date,
        row._id
      ])
    );
    // store the data in the state
    wrapper.setState({ conversations });

    // check for rendered data
    // we mocked 3 documents
    expect(wrapper.find(`.${ViewDiv.styledComponentId}`)).toHaveLength(3);
  });
});
