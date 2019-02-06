import React from "react";
import renderer from "react-test-renderer";
import Title from "./index.jsx";

describe("Title", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Title value="Bio" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
