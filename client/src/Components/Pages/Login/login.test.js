import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import Login from "./index.jsx";

describe("Login must match the snapshots", () => {
  it("renders correctly", () => {
    const context = {};
    const tree = renderer
      .create(
        <StaticRouter context={context}>
          <Login />
        </StaticRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
