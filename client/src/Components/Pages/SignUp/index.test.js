import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter, MemoryRouter } from "react-router-dom";
import { mount, configure } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

import SignUp from "./index.jsx";
import App from "./../../../App";

// set enzyme configuration
configure({ adapter: new Adapter() });

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
    // withRouter
  });

  it("mount test", () => {
    // render the App
    const wrapper = mount(
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>
    );

    // get SignUp Component from App (wrapper)
    const renderedSignUp = wrapper.find(SignUp);
    expect(renderedSignUp).toHaveLength(1);

    // find username input field
    const renderedNameInput = renderedSignUp.find('[name="username"]').first();
    expect(renderedNameInput).toHaveLength(1);

    console.log(renderedNameInput.debug());

    // trigger focus event
    renderedNameInput.simulate("focus");

    // trigger change event
    renderedNameInput.simulate("change", {
      target: { value: "He", name: "username" }
    });

    // trigger blur event
    renderedNameInput.simulate("blur");

    // after setState end check for new state
    setImmediate(() => {
      expect(renderedSignUp.state("username").errMsg.length).toBeGreaterThan(1);
      expect(renderedSignUp.state("username").errMsg).toMatch(
        "length must be at least 3"
      );
    });
  });
});
