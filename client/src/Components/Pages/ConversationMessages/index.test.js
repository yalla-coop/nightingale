import React from "react";
import renderer from "react-test-renderer";
import Messages from "./index.jsx";

describe("Messages", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Messages />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
