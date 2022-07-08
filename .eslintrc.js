module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:json/recommended'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
  },
  plugins: [
    '@typescript-eslint'
  ]
}
