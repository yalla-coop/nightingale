import React from "react";
import renderer from "react-test-renderer";
import Button from "./index.jsx";

describe("Button", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Button
          value="click me"
          color="red"
          onClick={() => console.log("Hi")}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
