import React from 'react';
import renderer from 'react-test-renderer';
import Input from './index.jsx';

describe('Input', () => {
  it('renders correctly', () => {
    const tree = renderer
    .create(<Input
        label="Username"
        name="username"
        type="text"
        width="20rem"
     />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  });
})
