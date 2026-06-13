/**
 * @format
 */
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src/App';
test('renders correctly', async () => {
  const tree = await ReactTestRenderer.act(() => {
    return ReactTestRenderer.create(<App />);
  });
  expect(tree.toJSON()).toMatchSnapshot();
});