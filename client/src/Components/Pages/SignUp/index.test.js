import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router-dom";

import SignUp from "./index.jsx";

describe("SignUp must match the snapshots", () => {
  it("renders correctly", () => {
    const context = {};
    const tree = renderer
      .create(
        <StaticRouter context={context}>
          <SignUp />
        </StaticRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
