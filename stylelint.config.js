module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: [
    // SCSS rules set, need to be explicitly set in "rules"
    'stylelint-scss',
  ],
  rules: {
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
        ignoreAtRules: ['value', 'extend', 'mixin', 'include', 'use', 'forward', 'each', 'for', 'if', 'else', 'function', 'return'],
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
    // todo: after upgrading stylelint packages, we disable these rules to move on with less changes in the PR.
    // in time we better remove these suppression and change to code to comply.
    'selector-class-pattern': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'at-rule-empty-line-before': null,
    'function-no-unknown': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'media-feature-range-notation': null,
    'shorthand-property-no-redundant-values': null,
    'annotation-no-unknown': null,
    'media-query-no-invalid': null,
  },
}
