import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import expoConfig from 'eslint-config-expo/flat.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactNative from 'eslint-plugin-react-native';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import fs from 'fs';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const FEATURE_SRC_DIR = './src/features';
const FEATURE_DIRS = fs.readdirSync('./src/features');

/**
 * Create a restricted import zone for a specific feature.
 *
 * e.g. src/features/foo should not import from src/features/bar, etc.
 *
 * @param {string} featureName
 */
function createFeatureZone(featureName) {
  return {
    target: `${FEATURE_SRC_DIR}/${featureName}`,
    from: FEATURE_SRC_DIR,
    except: [
      `./${featureName}`,
      ...FEATURE_DIRS.map((dir) => `./${dir}/index.ts`),
    ],
  };
}

export default tseslint.config(
  expoConfig,
  eslintPluginPrettierRecommended,
  // tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    ignores: [],
    plugins: {
      'react-compiler': reactCompiler,
      'react-native': reactNative,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'prettier/prettier': 'warn',

      'react-compiler/react-compiler': 'error',

      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-leaked-render': [
        'error',
        { validStrategies: ['coerce', 'ternary'] },
      ],

      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': 'off',
      'react-native/no-single-element-style-arrays': 'warn',

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],

      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      // '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',

      'import/no-cycle': 'error',

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
);
