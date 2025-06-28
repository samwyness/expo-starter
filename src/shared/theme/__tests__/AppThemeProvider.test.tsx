import {
  act,
  render,
  renderHook,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import { Text, View } from 'react-native';

import { AppThemeProvider, useAppTheme } from '../AppThemeProvider';

// Mock nativewind's useColorScheme with React state
jest.mock('nativewind', () => {
  const React = jest.requireActual('react');
  const actual = jest.requireActual('nativewind');
  return {
    ...actual,
    useColorScheme: () => {
      const [colorScheme, setColorScheme] = React.useState('light');
      return { colorScheme, setColorScheme };
    },
    vars: (varsObj: any) => varsObj,
  };
});

describe('AppThemeProvider', () => {
  const user = userEvent.setup();

  function TestComponent() {
    const { theme, toggleTheme } = useAppTheme();
    return (
      <View>
        <Text testID="theme">{theme}</Text>
        <Text testID="toggle" onPress={toggleTheme}>
          Toggle
        </Text>
      </View>
    );
  }

  it('provides the default theme from system color scheme', () => {
    // Arrange
    render(
      <AppThemeProvider>
        <TestComponent />
      </AppThemeProvider>,
    );

    // Act
    const themeText = screen.getByTestId('theme');

    // Assert
    expect(themeText).toHaveTextContent('light');
  });

  it('toggles the theme', async () => {
    // Arrange
    render(
      <AppThemeProvider>
        <TestComponent />
      </AppThemeProvider>,
    );
    const toggleButton = screen.getByTestId('toggle');

    // Act
    await user.press(toggleButton);

    // Assert
    const themeText = screen.getByTestId('theme');
    expect(themeText).toHaveTextContent('dark');
  });

  it('sets CSS vars on the root view', () => {
    // Arrange
    const { UNSAFE_getByType } = render(
      <AppThemeProvider>
        <View testID="child" />
      </AppThemeProvider>,
    );

    // Act
    const rootView = UNSAFE_getByType(View);
    const styleKeys = Object.keys(rootView.props.style ?? {});

    // Assert
    expect(rootView.props.style).toBeDefined();
    expect(styleKeys.some((k) => k.startsWith('--color-'))).toBe(true);
  });
});

describe('useAppTheme', () => {
  it('returns the current theme and toggle function', () => {
    // Arrange
    const { result } = renderHook(() => useAppTheme(), {
      wrapper: AppThemeProvider,
    });

    // Act

    // Assert
    expect(result.current.theme).toBe('light');
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('throws if useAppTheme is used outside provider', () => {
    // Arrange
    let errorMessage = '';

    // Act & Assert
    try {
      renderHook(() => useAppTheme());
    } catch (e) {
      if (e instanceof Error) {
        errorMessage = e.message;
      }
    }
    expect(errorMessage).toBe(
      'useAppTheme must be used within an AppThemeProvider',
    );
  });

  it('toggleTheme switches theme from light to dark', async () => {
    // Arrange
    const { result } = renderHook(() => useAppTheme(), {
      wrapper: AppThemeProvider,
    });

    // Assert
    expect(result.current.theme).toBe('light');

    // Act
    await act(async () => {
      result.current.toggleTheme();
    });

    // Assert
    await waitFor(() => {
      expect(result.current.theme).toBe('dark');
    });
  });
});
