module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'prettier/prettier': true,
    'declaration-property-value-no-unknown': true,
  },
};
