import { renderHook } from '@testing-library/react-native';
import { ColorSchemeName, ColorValue } from 'react-native';

import { useThemeColor } from '../useThemeColor';

const mockedColorScheme: jest.Mock<ColorSchemeName> = jest.fn();
jest.mock('../useColorScheme', () => ({
  useColorScheme: () => mockedColorScheme(),
}));

describe('useThemeColor', () => {
  it('should return the correct theme color when useColorTheme is undefined', () => {
    // Arrange
    mockedColorScheme.mockReturnValueOnce(undefined);

    const { result } = renderHook(() => useThemeColor({}, 'background'));

    // Act

    // Assert
    expect(result.current).toBe('#fff');
  });

  it.each<{ theme: ColorSchemeName; expected: ColorValue }>([
    { theme: 'light', expected: '#fff' },
    { theme: 'dark', expected: '#151718' },
  ])(
    'should return the correct theme color for theme `$theme` when props are provided',
    ({ theme, expected }) => {
      // Arrange
      mockedColorScheme.mockReturnValueOnce(theme);

      const { result } = renderHook(() => useThemeColor({}, 'background'));

      // Act

      // Assert
      expect(result.current).toBe(expected);
    },
  );

  it.each<{ theme: ColorSchemeName; expected: ColorValue }>([
    { theme: 'light', expected: '#EEEEEE' },
    { theme: 'dark', expected: '#111111' },
  ])(
    'should return the correct theme color for theme `$theme` when props are provided',
    ({ theme, expected }) => {
      // Arrange
      mockedColorScheme.mockReturnValueOnce(theme);

      const { result } = renderHook(() =>
        useThemeColor({ light: '#EEEEEE', dark: '#111111' }, 'background'),
      );

      // Act

      // Assert
      expect(result.current).toBe(expected);
    },
  );
});
