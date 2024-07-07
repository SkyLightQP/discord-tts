module.exports = {
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'linebreak-style': 'off',

    'prettier/prettier': ['error', { endOfLine: 'auto' }]
  }
};
