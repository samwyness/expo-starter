import { render } from '@testing-library/react-native';

import EditScreenInfo from '../EditScreenInfo';

it(`renders correctly`, () => {
  // Arrange
  const tree = render(<EditScreenInfo path="some-path" />).toJSON();

  // Act

  // Assert
  expect(tree).toMatchSnapshot();
});
