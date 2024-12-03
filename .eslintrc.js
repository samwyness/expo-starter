/**
 * Create a restricted import zone for a specific feature.
 *
 * e.g. src/features/foo should not import from src/features/bar, etc.
 *
 * @param {string} featureName
 */
function createFeatureZone(featureName) {
  return {
    target: `./src/features/${featureName}`,
    from: `./src/features`,
    except: [`./${featureName}`],
  };
}

module.exports = {
  root: true,
  extends: ['expo', 'prettier'],
  plugins: [
    'prettier',
    'react-native',
    'simple-import-sort',
    'eslint-plugin-react-compiler',
  ],
  rules: {
    'prettier/prettier': 'error',

    'react-compiler/react-compiler': 'error',

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

          // Absolute imports and other imports such as `#/foo`.
          // Anything not matched in another group.
          ['^'],

          [
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
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // Disable cross-feature imports:
          createFeatureZone('home'),
          createFeatureZone('explore'),

          // Enforce unidirectional codebase:
          // e.g. src/app can import from src/features but not the other way around, etc.
          {
            target: './src/features',
            from: './src/app',
          },
          {
            target: ['./src/shared', './src/assets'],
            from: ['./src/features', './src/app'],
          },
        ],
      },
    ],
    'import/no-cycle': 'error',

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
