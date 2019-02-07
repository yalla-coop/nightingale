import React from "react";
import renderer from "react-test-renderer";
import { StaticRouter, MemoryRouter } from "react-router-dom";
import { mount, configure } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

import Login from "./index.jsx";
import App from "./../../../App";

// set enzyme config
configure({ adapter: new Adapter() });

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

  it("mount test", () => {
    // render the App
    const wrapper = mount(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    // get login component from App
    const renderedLogin = wrapper.find(Login);
    expect(renderedLogin).toHaveLength(1);

    // find username input field
    const renderedNameInput = renderedLogin.find(`[name="username"]`).last();
    expect(renderedNameInput).toHaveLength(1);

    // trigger change event
    renderedNameInput.simulate("change", {
      target: { value: "test", name: "username" }
    });

    // after setState end check for new state
    setImmediate(() => {
      expect(renderedLogin.state().username).toMatch("test");
    });
  });
});
