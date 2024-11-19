module.exports = {
  root: true,
  extends: ['universe/native'],
  plugins: ['react-native', 'simple-import-sort'],
  rules: {
    'import/order': 'off', // Included with eslint-config-universe
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],

          // Node.js builtins prefixed with `node:`.
          ['^node:'],

          // Packages starting with `@` or any character
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],

          [
            // Absolute imports and other imports such as `#/foo`.
            // Anything not matched in another group.
            '^',

            // Relative imports starting with `../`
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',

            // Relative imports starting with `./`
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
        ],
      },
    ],

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
