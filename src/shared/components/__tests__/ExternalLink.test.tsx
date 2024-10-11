import { render, userEvent } from '@testing-library/react-native';
import { renderRouter, screen } from 'expo-router/testing-library';
import { openBrowserAsync } from 'expo-web-browser';

import { ExternalLink } from '../ExternalLink';

import { mockPlatform } from '@/__mocks__/react-native/Platform';

jest.mock('expo-web-browser');

const mockOpenBrowserAsync = jest.mocked(openBrowserAsync);

describe(`ExternalLink`, () => {
  beforeEach(() => {
    mockOpenBrowserAsync.mockClear();
  });

  it(`renders correctly`, () => {
    // Arrange
    const tree = render(
      <ExternalLink href="some-href">Snapshot test!</ExternalLink>,
    ).toJSON();

    // Act

    // Assert
    expect(tree).toMatchSnapshot();
  });

  it(`should open the native browser with the correct href`, async () => {
    // Arrange
    renderRouter(['index']);
    render(<ExternalLink href="some-href">Snapshot test!</ExternalLink>);

    // Act
    await userEvent.press(screen.getByRole('link', { name: 'Snapshot test!' }));

    // Assert
    expect(mockOpenBrowserAsync).toHaveBeenCalledWith('some-href');
  });

  it(`should handle onPress correctly for web`, async () => {
    // Arrange
    mockPlatform('web', '1.0');

    renderRouter(['index']);
    render(<ExternalLink href="some-href">Snapshot test!</ExternalLink>);

    // Act
    await userEvent.press(screen.getByRole('link', { name: 'Snapshot test!' }));

    // Assert
    expect(mockOpenBrowserAsync).not.toHaveBeenCalled();
  });
});
