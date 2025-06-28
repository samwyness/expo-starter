import { DefaultTheme } from '@react-navigation/native';

import { getNavigationTheme } from '../navigationTheme';
import tokensJson from '../tokens.json';

describe('getNavigationTheme', () => {
  it('returns correct theme for light mode', () => {
    // Arrange
    const expectedTheme = {
      ...DefaultTheme,
      dark: false,
      colors: {
        primary: tokensJson.colors.light.primary,
        background: tokensJson.colors.light.surfaceContainerLow,
        card: tokensJson.colors.light.surfaceContainer,
        text: tokensJson.colors.light.onSurface,
        border: tokensJson.colors.light.outlineVariant,
        notification: tokensJson.colors.light.primary,
      },
    };

    // Act
    const theme = getNavigationTheme('light');

    // Assert
    expect(theme).toEqual(expectedTheme);
  });

  it('returns correct theme for dark mode', () => {
    // Arrange
    const expectedTheme = {
      ...DefaultTheme,
      dark: true,
      colors: {
        primary: tokensJson.colors.dark.primary,
        background: tokensJson.colors.dark.surfaceContainerLow,
        card: tokensJson.colors.dark.surfaceContainer,
        text: tokensJson.colors.dark.onSurface,
        border: tokensJson.colors.dark.outlineVariant,
        notification: tokensJson.colors.dark.primary,
      },
    };

    // Act
    const theme = getNavigationTheme('dark');

    // Assert
    expect(theme).toEqual(expectedTheme);
  });
});
