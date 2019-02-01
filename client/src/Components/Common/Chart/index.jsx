import React, { Component } from 'react';
import uuid from 'uuid';
import { Chart, layout } from './logic';
import { PieChart, Header, Charts, Title, Decription, Svg, Img } from './index.style';

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
    const {
      sections, id, width, title,
    } = this.props;
    return (
        <PieChart>
        <Header>{title}</Header>
         <Svg className={`bar-chart-${id} bar-chart`} ref={this.chartTag} style={{ width }} />
         <Charts>
           {sections.map((section, index) => (
             <Title key={uuid()}>
               <Decription
                 style={{
                   background: layout[index],
                   width: '15px',
                   height: '15px',
                   marginRight: '12px',
                 }}
               />
               <Img src={section.decription} alt='emoji'/>
             </Title>
           ))}
         </Charts>
       </PieChart>
    );
  }
}