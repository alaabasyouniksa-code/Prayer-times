import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    let tree;
    renderer.act(() => {
        tree = renderer.create(<HomeScreen />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
