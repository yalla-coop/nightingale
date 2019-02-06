import React from "react";
import renderer from "react-test-renderer";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Conversations from "./index.jsx";

// set enzyme configuration
configure({ adapter: new Adapter() });

describe("Conversations", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Conversations />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

it("fetching data", () => {
  const wrapper = mount(<Conversations />);

  setImmediate(() => {
    const state = wrapper.state();

    expect(state.conversations).toBeDefined();
    // we mocked 3 documents
    expect(state.conversations).toHaveLength(3);
  });
});
