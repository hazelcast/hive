const path = require('path')

module.exports = {
  stories: ['../**/*.stories.@(tsx|mdx)'],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
    },
    'storybook-addon-designs',
    '@storybook/addon-docs',
  ],
  webpackFinal: async (config) => {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(tsx?|jsx?)$/,
        include: [path.resolve(__dirname, '..', '..', 'services')],
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['@babel/preset-env'],
        },
      },
    ]

    return config
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}
