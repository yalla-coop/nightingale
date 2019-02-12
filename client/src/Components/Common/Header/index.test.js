import React from "react";
import renderer from "react-test-renderer";
import Header from "./index.jsx";
import { StaticRouter } from "react-router-dom";

describe("Header", () => {
  it("renders correctly", () => {
    const context = {};
    const tree = renderer
      .create(
        <StaticRouter context={context}>
          <Header />
        </StaticRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
