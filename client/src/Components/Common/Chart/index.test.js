import React from "react";
import renderer from "react-test-renderer";
import Chart from "./index.jsx";

describe("Chart", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Chart
          sections={[
            { decription: "title 1", percentage: 20 },
            { decription: "title 1", percentage: 30 },
            { decription: "title 1", percentage: 25 },
            { decription: "title 1", percentage: 25 }
          ]}
          width={200}
          title="Mood Outcomes"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
