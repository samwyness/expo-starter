import { StyleSheet } from 'react-native-unistyles';

import { hexToRgbRGBA } from '#/shared/utils/colors';

import tokens from './src/shared/theme/tokens.json';

export type FontSize =
  | keyof typeof tokens.typography.base
  | keyof typeof tokens.typography.title;

export type FontWeight = 'normal' | 'medium' | 'bold' | 'heavy';
export type LineHeight = 'tight' | 'snug' | 'normal';

export type LightThemeColor = keyof typeof tokens.colors.light;
export type DarkThemeColor = keyof typeof tokens.colors.dark;
export type ThemeColor = LightThemeColor | DarkThemeColor;

const GRID_SPACING = tokens.spacing.xs;

const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  bold: '600',
  heavy: '800',
} as const;
const FONT_SIZES = {
  ...tokens.typography.base,
  ...tokens.typography.title,
} as const;
const LINE_HEIGHTS = {
  tight: 1.15,
  snug: 1.3,
  normal: 1.5,
} as const;

const sharedTheme = {
  /**
   * Spacing
   */
  spacing: tokens.spacing,
  space: (v: number) => v * GRID_SPACING,
  gap: (v: number) => v * GRID_SPACING,

  /**
   * Typography
   */
  fontWeights: FONT_WEIGHTS,
  fontSize: (fontSize: FontSize) => {
    return FONT_SIZES[fontSize];
  },
  lineHeight: (fontSize: FontSize, lineHeight: LineHeight) => {
    return FONT_SIZES[fontSize] * LINE_HEIGHTS[lineHeight];
  },
} as const;

const lightTheme = {
  ...sharedTheme,
  colors: tokens.colors.light,
  rgbaColor: (color: LightThemeColor, alpha: number) =>
    hexToRgbRGBA(tokens.colors.light[color], alpha),
} as const;

const darkTheme = {
  ...sharedTheme,
  colors: tokens.colors.dark,
  rgbaColor: (color: DarkThemeColor, alpha: number) =>
    hexToRgbRGBA(tokens.colors.dark[color], alpha),
} as const;

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
