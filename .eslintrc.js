module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 'off',
    'no-throw-literal': 'off',
    semi: 'off',
    'no-shadow': 'off',
    indent: 'off',
    'keyword-spacing': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'no-empty-pattern': 'off',
    'max-len': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'no-extend-native': 'off',
    'no-useless-escape': 'off',
    'vue/no-parsing-error': 'off',
    'vue/no-unused-components': 'off',
    camelcase: 'off',
    'import/no-named-as-default-member': 'off',
    'no-unused-expressions': 'off',
    'import/extensions': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
