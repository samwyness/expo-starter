import { expect, it } from '@jest/globals';
import { render } from '@testing-library/react-native';

import { MonoText } from '../StyledText';

it(`renders correctly`, () => {
  // Arrange
  const tree = render(<MonoText>Snapshot test!</MonoText>).toJSON();

  // Act

  // Assert
  expect(tree).toMatchSnapshot();
});
