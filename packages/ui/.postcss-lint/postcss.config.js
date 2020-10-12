// eslint-disable-next-line import/no-extraneous-dependencies
const doiuse = require('doiuse')

const browsers = ['last 2 Chrome version', 'last 2 Firefox version', 'last 1 Safari version', 'last 1 Edge version', 'ie 11']

/*
 * EXPERIMENTAL: This postcss config is and should be only used
 * as a trivial audit of "doiuse" compatibility rules
 *
 * Postcss-cli does not allow config argument override, what it does
 * allow is specifying an alternate config path, hence this location
 */
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    // eslint-disable-next-line
    require('stylelint'),
    doiuse({
      browsers,
      //These problems are taken case of by 'autoprefixer'
      ignore: [
        // Autoprefixer takes care of flex
        'flexbox',
        // The problem is "outline-offset", which doiuse can't detect
        'outline',
        // The problem is "vmax", which doiuse can' detect
        'viewport-units',
      ],
      ignoreFiles: ['**/node_modules/**/*.css', '**/node_modules/**/*.scss', '**/coverage/**/*', '**/lib/**/*'],
    }),
    // eslint-disable-next-line
    require('postcss-reporter')({ throwError: true }),
  ],
}
