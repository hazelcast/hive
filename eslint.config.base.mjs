import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import babelPlugin from '@babel/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    ignores: ['lib', 'node_modules', 'coverage'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
    },
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      'jsx-a11y': jsxA11y,
      babel: babelPlugin,
      import: importPlugin,
      react,
      prettier,
      'react-hooks': reactHooks,
    },
    rules: {
      'react/jsx-props-no-spreading': 'off',
      'prefer-object-spread': 'off',
      'react/state-in-constructor': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'no-class-assign': 'off',
      'react/prop-types': 'off',
      'import/prefer-default-export': 'off',
      'no-nested-ternary': 'error',
      'no-script-url': 'error',
      'react/jsx-no-literals': 'off',
      'react/no-array-index-key': 'off',
      'react/no-unused-prop-types': 'error',
      'react/jsx-no-bind': [
        1,
        {
          ignoreRefs: true,
          allowArrowFunctions: true,
          allowBind: true,
        },
      ],
      'function-paren-newline': 'off',
      semi: ['error', 'never'],
      'react/sort-comp': 'off',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'react/destructuring-assignment': 'off',
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

      'consistent-return': 'off',
      'import/extensions': [
        'error',
        'never',
        {
          '.js': 'always',
          '.jsx': 'always',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'import/no-self-import': 'off',
      'no-param-reassign': 'off',
      // https://github.com/eslint/eslint/issues/11045
      'no-unused-expressions': 'off',
      'babel/no-unused-expressions': 'error',
      'dot-notation': 'off',
      'no-useless-constructor': 'off',
      'no-empty-function': 'off',
      /* Conflicting with Prettier */
      'react/jsx-wrap-multilines': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/no-danger': 'error',
      /* a11y, 0's are to be addressed */
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/label-has-for': [
        2,
        {
          components: ['Label'],
          required: {
            some: ['nesting', 'id'],
          },
          allowChildren: false,
        },
      ],
      'react/button-has-type': 'off',
      /* Rest */
      camelcase: [
        1,
        {
          properties: 'never',
          // some BE structures use snake_case
          allow: [
            'browse_class',
            'browse_hits',
            'browse_value',
            'browse_version',
            'date_access_time',
            'date_creation_time',
            'date_expiration_time',
            'date_update_time',
            'memory_cost',
            'cacheBrowse_value',
            'cacheBrowse_class',
            'date_cache_creation_time',
            'date_cache_access_time',
            'date_cache_expiration_time',
            'cacheBrowse_hits',
          ],
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'no-dupe-class-members': 'off',
      'no-use-before-define': 'off',
      'no-undef': 'off',
      'react/require-default-props': 'off',
      // https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
      'no-shadow': 'off',
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          argsIgnorePattern: '_',
          ignoreRestSiblings: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
          moduleDirectory: ['node_modules', './'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
]
