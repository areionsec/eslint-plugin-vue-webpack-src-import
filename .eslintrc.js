module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended'],

  plugins: ['prettier'],

  rules: {
    'prettier/prettier': 'error',
  },
}
