import { StyleSheet } from 'react-native-unistyles';

import { hexToRgbRGBA } from '#/shared/utils/colors';

import tokens from './src/shared/theme/tokens.json';

export type FontSize =
  | keyof typeof tokens.typography.base
  | keyof typeof tokens.typography.title;

export type LightThemeColor = keyof typeof tokens.colors.light;
export type DarkThemeColor = keyof typeof tokens.colors.dark;

const GRID_SPACING = tokens.spacing.xs;

const sharedTheme = {
  spacing: tokens.spacing,
  space: (v: number) => v * GRID_SPACING,
  gap: (v: number) => v * GRID_SPACING,
  fontSizes: {
    ...tokens.typography.base,
    ...tokens.typography.title,
  },
  text: (key: FontSize) => {
    return {
      ...tokens.typography.base,
      ...tokens.typography.title,
    }[key];
  },
};

const lightTheme = {
  ...sharedTheme,
  colors: tokens.colors.light,
  rgbaColor: (color: LightThemeColor, alpha: number) =>
    hexToRgbRGBA(tokens.colors.light[color], alpha),
};

const darkTheme = {
  ...sharedTheme,
  colors: tokens.colors.dark,
  rgbaColor: (color: DarkThemeColor, alpha: number) =>
    hexToRgbRGBA(tokens.colors.dark[color], alpha),
};

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    // initialTheme: 'light',
    adaptiveThemes: true,
  },
  breakpoints,
  themes: appThemes,
});
