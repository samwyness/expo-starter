module.exports = {
  root: true,
  extends: ['universe/native'],
  plugins: ['react-native'],
  rules: {
    'react/react-in-jsx-scope': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'react-native/no-unused-styles': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'off', // TODO: set to 'warn' once i18n is implemented
    'react-native/no-single-element-style-arrays': 'warn',

    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
