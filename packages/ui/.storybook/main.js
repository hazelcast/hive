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
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        include: [path.resolve(__dirname, '../')],
        loader: 'file-loader',
      },
      {
        test: /\.stories\.tsx?$/,
        use: [
          {
            loader: require.resolve('@storybook/source-loader'),
            options: { parser: 'typescript' },
          },
        ],
        enforce: 'pre',
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
  core: {
    builder: 'webpack5',
  },
}
