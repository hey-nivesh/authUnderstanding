module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript/no-explicit-any': 'error',
    'react-native/no-inline-styles': 'error',
  },
};