import React from "react";
import renderer from "react-test-renderer";
import Conversations from "./index.jsx";

jest.mock("axios");

describe("Conversations", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Conversations />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
