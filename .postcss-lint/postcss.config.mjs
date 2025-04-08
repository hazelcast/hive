import doiuse from 'doiuse'
import stylelint from 'stylelint'
import postcssReporter from 'postcss-reporter'

const browsers = ['last 2 Chrome version', 'last 2 Firefox version', 'last 1 Safari version', 'last 1 Edge version']

/*
 * EXPERIMENTAL: This postcss config is and should be only used
 * as a trivial audit of "doiuse" compatibility rules
 *
 * Postcss-cli does not allow config argument override, what it does
 * allow is specifying an alternate config path, hence this location
 */
export default {
  syntax: 'postcss-scss',
  plugins: [
    stylelint,
    doiuse({
      browsers,
      ignore: [
        // Autoprefixer takes care of flex
        'flexbox',
        // The problem is "outline-offset", which doiuse can't detect
        'outline',
        // The problem is "vmax", which doiuse can' detect
        'viewport-units',
        // Rules are not compatible with scss
        'css-nesting',
        'css-when-else',
      ],
      ignoreFiles: ['**/lib/**', '**/storybook-static/**', '**/node_modules/**/*.css', '**/node_modules/**/*.scss'],
    }),
    postcssReporter({ throwError: true }),
  ],
}
