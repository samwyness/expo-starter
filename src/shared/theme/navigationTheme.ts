import { DefaultTheme } from '@react-navigation/native';
import { useUnistyles } from 'react-native-unistyles';

export function useNavigationTheme() {
  const { theme, rt } = useUnistyles();

  return {
    ...DefaultTheme,
    dark: rt.themeName === 'dark',
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.surfaceContainerLow,
      card: theme.colors.surfaceContainer,
      text: theme.colors.onSurface,
      border: theme.colors.outlineVariant,
      notification: theme.colors.primary,
    },
  };
}
