import { expect, it } from '@jest/globals';
import { render } from '@testing-library/react-native';

import { Text, View } from '../Themed';

it(`renders Text correctly`, () => {
  // Arrange
  const tree = render(<Text>Some Text</Text>).toJSON();

  // Act

  // Assert
  expect(tree).toMatchSnapshot();
});

it(`renders View correctly`, () => {
  // Arrange
  const tree = render(
    <View lightColor="#FFFFFF" darkColor="#000000" />,
  ).toJSON();

  // Act

  // Assert
  expect(tree).toMatchSnapshot();
});
