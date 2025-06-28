import { DefaultTheme } from '@react-navigation/native';

import type { AppTheme } from './AppThemeProvider';
import tokensJson from './tokens.json';

const colors = tokensJson.colors;

export function getNavigationTheme(appTheme: AppTheme) {
  return {
    ...DefaultTheme,
    dark: appTheme === 'dark',
    colors: {
      primary: colors[appTheme].primary,
      background: colors[appTheme].surfaceContainerLow,
      card: colors[appTheme].surfaceContainer,
      text: colors[appTheme].onSurface,
      border: colors[appTheme].outlineVariant,
      notification: colors[appTheme].primary,
    },
  };
}
