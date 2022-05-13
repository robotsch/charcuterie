module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    'plugins:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parseOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  }
}