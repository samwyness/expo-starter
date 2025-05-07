const { defineConfig } = require('eslint/config');

const prettier = require('eslint-plugin-prettier');
const reactNative = require('eslint-plugin-react-native');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const reactCompiler = require('eslint-plugin-react-compiler');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/**
 * NOTE: Add features directory names here.
 */
const FEATURE_DIRS = ['home', 'explore'];

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
    except: [
      `./${featureName}`,
      ...FEATURE_DIRS.map((dir) => `./${dir}/index.ts`),
    ],
  };
}

module.exports = defineConfig([
  {
    extends: compat.extends('expo', 'prettier'),

    plugins: {
      prettier,
      'react-compiler': reactCompiler,
      'react-native': reactNative,
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      'import/no-cycle': 'error',
      'prettier/prettier': 'error',
      'react-compiler/react-compiler': 'error',
      'react/react-in-jsx-scope': 'off',
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': 'off',
      'react-native/no-single-element-style-arrays': 'warn',

      '@typescript-eslint/no-shadow': ['error'],
      'no-shadow': 'off',

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
            ...FEATURE_DIRS.map((featureName) =>
              createFeatureZone(featureName),
            ),

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
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    extends: compat.extends('plugin:testing-library/react'),
  },
]);
