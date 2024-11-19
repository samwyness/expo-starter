import { render } from '@testing-library/react-native';
import * as React from 'react';

import { ThemedView } from '../ThemedView';

it(`renders correctly`, () => {
  // Arrange
  const tree = render(<ThemedView>Snapshot test!</ThemedView>).toJSON();

  // Act

  // Assert
  expect(tree).toMatchSnapshot();
});
