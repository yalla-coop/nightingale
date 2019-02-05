import React from "react";
import renderer from "react-test-renderer";
import Landing from "./index.jsx";

describe("Landing", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Landing />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
