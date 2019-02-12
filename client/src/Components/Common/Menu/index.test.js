import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import Menu from "./index.jsx";

describe("Menu", () => {
  it("renders correctly", () => {
    const context = {};
    const tree = renderer
      .create(
        <StaticRouter context={context}>
          <Menu />
        </StaticRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
