import React, { Component } from "react";
import uuid from "uuid";
import { Chart, layout } from "./logic";
import {
  PieChart,
  Header,
  Charts,
  Title,
  Description,
  Svg,
  Count
} from "./index.style";

export default class Pie extends Component {
  constructor(props) {
    super(props);
    this.chartTag = React.createRef();
  }

  componentDidMount = () => {
    const { sections, width } = this.props;
    Chart(sections, this.chartTag.current, width);
  };

  render() {
    const { sections, id, width, title } = this.props;
    console.log(sections);
    if (!sections) return;
    return (
      <PieChart>
        <Header>{title}</Header>
        <Svg
          className={`bar-chart-${id} bar-chart`}
          ref={this.chartTag}
          style={{ width }}
        />
        <Charts>
          {sections.map((section, index) => (
            <Title key={uuid()}>
              <p>{section.decription}</p>
              <Description
                style={{
                  color: layout[index],
                  textTransform: "capitalize",
                  fontWeight: "600",
                  fontSize: "13px"
                }}
              >
                {section.mood}
              </Description>
              <Count>({section.count})</Count>
            </Title>
          ))}
        </Charts>
      </PieChart>
    );
  }
}
