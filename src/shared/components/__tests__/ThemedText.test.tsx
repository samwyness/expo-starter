import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ThemedText } from '../ThemedText';

it(`renders correctly`, () => {
  // Arrange
  const tree = render(<ThemedText>Snapshot test!</ThemedText>).toJSON();

  // Act

  // Assert
  expect(tree).toMatchSnapshot();
});
