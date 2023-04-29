module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  plugins: [
    // SCSS rules set, need to be explicitly set in "rules"
    'stylelint-scss',
    'stylelint-prettier',
  ],
  rules: {
    'prettier/prettier': true,
    /*
     * CSS-modules rules (from stylelint-config-css-module)
     * Overrides of stylelint-config-standard for CSS modules
     */
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'import', 'global', 'local', 'external'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['from'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes', 'compose-with'],
        ignoreSelectors: [':export', /^:import/],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['value', 'extend', 'mixin', 'include', 'use', 'forward', 'each', 'if', 'function', 'return', 'for'],
      },
    ],
    'comment-empty-line-before': null,
    // stylelint-scss rules
    'scss/no-duplicate-dollar-variables': true,
    'scss/dollar-variable-colon-space-after': 'always-single-line',
    'scss/partial-no-import': true,
    'scss/dollar-variable-pattern': /[a-z][a-zA-Z]+/,
    'scss/at-mixin-pattern': /[a-z][a-zA-Z]+/,
    'keyframes-name-pattern': /[a-z][a-zA-Z]+/,
    'scss/no-global-function-names': null,
    'font-family-name-quotes': null,
    'selector-class-pattern': null,
  },
}
