export default {
  name: 'expo-starter',
  slug: 'expo-starter',
  scheme: 'expo-starter',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    usesNonExemptEncryption: false,
    bundleIdentifier: 'com.samwyness.expostarter',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.samwyness.expostarter',
    edgeToEdgeEnabled: true,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './src/assets/images/favicon.png',
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
        image: './src/assets/images/splash-icon.png',
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
