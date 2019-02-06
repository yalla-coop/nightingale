import React from "react";
import Advice from "./index";
import renderer from "react-test-renderer";

describe("Advice", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Advice />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
