import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "./index.jsx";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// set enzyme configuration
configure({ adapter: new Adapter() });

describe("Dashboard", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const wrapper = mount(<Dashboard />);
    const moodsBystatus = [
      {
        theAverage: 50,
        id: 1,
        count: 1,
        moodDescription: "terrible",
        moodEmoji: "😡"
      },
      {
        theAverage: 50,
        id: 2,
        count: 1,
        moodDescription: "not great",
        moodEmoji: "😫"
      }
    ];
    const moodsByDays = [
      {
        _id: "Friday",
        moodEmoji: "😔"
      },
      {
        _id: "Thursday",
        moodEmoji: "😫"
      }
    ];

    const statusMood = moodsBystatus.map(row => ({
      decription: row.moodEmoji,
      percentage: row.theAverage.toFixed(1),
      mood: row.moodDescription,
      count: row.count
    }));
    const dailyMood = [];
    moodsByDays.map(row => dailyMood.push([row.moodEmoji, row._id]));

    // Save the data in the state
    wrapper.setState({ dailyMood, statusMood });
  });
});
