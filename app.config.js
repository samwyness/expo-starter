export default {
  name: 'expo-starter',
  slug: 'expo-starter',
  scheme: 'expo-starter',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    icon: './assets/expo.icon',
    usesNonExemptEncryption: false,
    bundleIdentifier: 'com.samwyness.expostarter',
  },
  android: {
    adaptiveIcon: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
    },
    package: 'com.samwyness.expostarter',
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-local-authentication',
      {
        faceIDPermission: 'Allow $(PRODUCT_NAME) to use Face ID.',
      },
    ],
    'expo-router',
    [
      'expo-secure-store',
      {
        configureAndroidBackup: true,
        faceIDPermission:
          'Allow $(PRODUCT_NAME) to access your Face ID biometric data.',
      },
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    'expo-web-browser',
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};
