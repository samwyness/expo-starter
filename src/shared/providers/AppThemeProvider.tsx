import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import React, { createContext, useContext } from 'react';
import type { UnistylesThemes } from 'react-native-unistyles';
import { UnistylesRuntime } from 'react-native-unistyles';

import tokensJson from '../theme/tokens.json';

const colors = tokensJson.colors;

export type AppColor = keyof typeof colors.light | keyof typeof colors.dark;

export type AppTheme = keyof UnistylesThemes;

type AppThemeProviderProps = PropsWithChildren<{
  theme?: AppTheme;
}>;

type AppThemeContextType = {
  theme: AppTheme;
  themeColors: typeof colors.light;
  toggleTheme: () => void;
};

export const AppThemeContext = createContext<AppThemeContextType | undefined>(
  undefined,
);

export const AppThemeProvider = ({
  theme,
  children,
}: AppThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = React.useState<AppTheme>(
    theme ?? UnistylesRuntime.themeName ?? 'light',
  );

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppThemeContext.Provider
      value={{
        theme: currentTheme,
        themeColors: colors[currentTheme],
        toggleTheme,
      }}>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      {children}
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
