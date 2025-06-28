import { StatusBar } from 'expo-status-bar';
import { useColorScheme, vars } from 'nativewind';
import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useEffect } from 'react';
import { View } from 'react-native';

import { hexToRgb, rgbObjectToString } from '../utils/colors';
import tokensJson from './tokens.json';

const colors = tokensJson.colors;

export type AppColor = keyof typeof colors.light | keyof typeof colors.dark;

export type AppTheme = 'light' | 'dark';

type AppThemeProviderProps = PropsWithChildren<{
  theme?: AppTheme;
}>;

type AppThemeContextType = {
  theme: AppTheme;
  toggleTheme: () => void;
};

export const AppThemeContext = createContext<AppThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const AppThemeProvider = ({
  theme,
  children,
}: AppThemeProviderProps) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const currentTheme = theme ?? colorScheme ?? 'light';

  // Compute CSS vars for the current theme
  const themeColors = Object.entries(colors[currentTheme])
    .map(([key, value]) => {
      return [key, rgbObjectToString(hexToRgb(value))] as const;
    })
    .reduce(
      (acc, [key, value]) => {
        acc[`--color-${key}`] = value.replace('rgb(', '').replace(')', '');
        return acc;
      },
      {} as Record<string, string>,
    );

  const toggleTheme = () => {
    setColorScheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  // Sync with system color scheme
  useEffect(() => {
    if (colorScheme && colorScheme !== currentTheme) {
      setColorScheme(colorScheme);
    }
  }, [colorScheme, currentTheme, setColorScheme]);

  return (
    <AppThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      <View style={vars(themeColors)} className="flex-1">
        {children}
      </View>
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
};
