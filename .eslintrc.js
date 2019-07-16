module.exports = {
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'arrow-parens': [2, 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
    'one-var': [
      'error',
      { var: 'never', let: 'consecutive', const: 'consecutive' }
    ],
    'space-before-function-paren': ['error', 'never']
  },
  plugins: ['react', 'import', 'jsx-a11y', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true
  }
};
