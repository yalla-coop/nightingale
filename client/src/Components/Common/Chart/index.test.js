import React from 'react';
import renderer from 'react-test-renderer';
import Chart from './index.jsx';

describe('Chart', () => {
  it('renders correctly', () => {
    const tree = renderer
    .create(<Chart sections={[
        { decription:'https://i.imgur.com/s3wOFt8.png', percentage: 20 },
        { decription: 'https://i.imgur.com/s3wOFt8.png', percentage: 30 },
        { decription: 'https://i.imgur.com/9Kx1ErT.png', percentage: 25 },
        { decription: 'https://i.imgur.com/CjNoEMy.png', percentage: 25 },
      ]}
      width={200} title="Mood Outcomes" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  });
})