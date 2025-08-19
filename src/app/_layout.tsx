import 'react-native-reanimated'; // Must come first!

import { useAuth } from '@clerk/clerk-expo';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthProvider from '#/shared/components/providers/AuthProvider';
import { useOnboardingStore } from '#/shared/stores/onboardingStore';
import { AppThemeProvider } from '#/shared/theme/AppThemeProvider';
import { useNavigationTheme } from '#/shared/theme/navigationTheme';
import { s } from '#/shared/theme/styles';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutStack() {
  const { isSignedIn, isLoaded } = useAuth();

  const hasOnboardingHydrated = useOnboardingStore(
    (state) => state._hasHydrated,
  );
  const hasCompletedOnboarding = useOnboardingStore(
    (state) => state.hasCompletedOnboarding,
  );

  const hasAppHydrated = isLoaded && hasOnboardingHydrated;

  React.useEffect(() => {
    if (hasAppHydrated) {
      SplashScreen.hideAsync();
    }
  }, [hasAppHydrated]);

  if (!hasAppHydrated) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!hasCompletedOnboarding && isSignedIn}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!hasCompletedOnboarding}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="create-account" />
      </Stack.Protected>

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const navigationTheme = useNavigationTheme();

  const [loaded, error] = useFonts({
    // Load font here
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={s.flex_1}>
      <SafeAreaProvider>
        <AppThemeProvider>
          <NavigationThemeProvider value={navigationTheme}>
            <StatusBar style="auto" />
            <AuthProvider>
              <RootLayoutStack />
            </AuthProvider>
          </NavigationThemeProvider>
        </AppThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
