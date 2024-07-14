module.exports = {
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': 'off',

    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true }
    ],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',

    'prettier/prettier': ['error', { endOfLine: 'auto' }]
  }
};
