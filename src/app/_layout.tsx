import 'react-native-reanimated'; // Must come first!

import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useCurrentUser, useEnsureAuthUserExists } from '#/features/auth';
import { useOnboardingStore } from '#/features/onboarding';
import { queryClient } from '#/shared/lib/react-query';
import { AppThemeProvider } from '#/shared/providers/AppThemeProvider';
import AuthProvider from '#/shared/providers/AuthProvider';
import ConvexClientProvider from '#/shared/providers/ConvexClientProvider';
import { useNavigationTheme } from '#/shared/theme/navigationTheme';
import { s } from '#/shared/theme/styles';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading and hydration is complete.
void SplashScreen.preventAutoHideAsync();

function RootLayoutStack() {
  const { isAuthenticated } = useCurrentUser();

  const hasCompletedOnboarding = useOnboardingStore(
    (state) => state.hasCompletedOnboarding,
  );

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!hasCompletedOnboarding && isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!hasCompletedOnboarding}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="create-account" />
      </Stack.Protected>

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const navigationTheme = useNavigationTheme();

  useReactQueryDevTools(queryClient);

  return (
    <GestureHandlerRootView style={s.flex_1}>
      <SafeAreaProvider>
        <AppThemeProvider>
          <NavigationThemeProvider value={navigationTheme}>
            <StatusBar style="auto" />
            <AuthProvider>
              <ConvexClientProvider>
                <QueryClientProvider client={queryClient}>
                  <SplashScreenManager>
                    <RootLayoutStack />
                  </SplashScreenManager>
                </QueryClientProvider>
              </ConvexClientProvider>
            </AuthProvider>
          </NavigationThemeProvider>
        </AppThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function SplashScreenManager({ children }: PropsWithChildren) {
  const { isLoading: isCurrentUserLoading } = useCurrentUser();

  // Ensure that if Clerk auth exists, the Convex user document also exists.
  // This will create the user document if it doesn't exist.
  // We call this hook unconditionally to ensure the user document is created as soon as possible.
  useEnsureAuthUserExists();

  const hasOnboardingHydrated = useOnboardingStore(
    (state) => state._hasHydrated,
  );

  const [fontsLoaded, error] = useFonts({
    // Load fonts here
  });

  const hasAppHydrated =
    isCurrentUserLoading === false && hasOnboardingHydrated && fontsLoaded;

  // Hide splash screen when the app has finished hydrating
  React.useEffect(() => {
    if (hasAppHydrated) {
      void SplashScreen.hideAsync();
    }
  }, [hasAppHydrated]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!hasAppHydrated) {
    return null;
  }

  return <>{children}</>;
}
