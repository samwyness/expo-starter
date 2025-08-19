import { StyleSheet } from 'react-native-unistyles';

import tokens from '#/shared/theme/tokens.json';
import { hexToRgbRGBA } from '#/shared/utils/colors';

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

export type FontWeight = keyof typeof FONT_WEIGHTS;
export type FontSize = keyof typeof FONT_SIZES;
export type LineHeight = keyof typeof LINE_HEIGHTS;

export type ThemeColor =
  | keyof typeof tokens.colors.light
  | keyof typeof tokens.colors.dark;

const sharedTheme = {
  /**
   * Spacing
   */
  spacing: tokens.spacing,
  space: (v: number) => v * GRID_SPACING,

  /**
   * Typography
   */
  fontWeights: FONT_WEIGHTS,
  fontSize: FONT_SIZES,
  lineHeight: (fontSize: FontSize, lineHeight: LineHeight) => {
    return FONT_SIZES[fontSize] * LINE_HEIGHTS[lineHeight];
  },
} as const;

const lightTheme = {
  ...sharedTheme,
  colors: tokens.colors.light,
  rgbaColor: (color: ThemeColor, alpha: number) =>
    hexToRgbRGBA(tokens.colors.light[color], alpha),
} as const;

const darkTheme = {
  ...sharedTheme,
  colors: tokens.colors.dark,
  rgbaColor: (color: ThemeColor, alpha: number) =>
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

export type AppBreakpoints = typeof breakpoints;
export type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  breakpoints,
  themes: appThemes,
});
