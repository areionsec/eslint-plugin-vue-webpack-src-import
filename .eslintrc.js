module.exports = {
  env: {
    node: true,
    es6: true,
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },

  extends: ['eslint:recommended'],

  plugins: ['prettier'],

  rules: {
    'prettier/prettier': 'error',
  },
}
