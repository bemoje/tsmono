/* eslint-env node */

'use strict'

/**
 * An object with ESLint options.
 * @type {import('eslint').Linter.Config}
 */
const options = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'semi': 0,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-locals': 'off',
    '@typescript-eslint/no-unused-parameters': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        semi: false,
      },
    ],
  },
}

module.exports = options
