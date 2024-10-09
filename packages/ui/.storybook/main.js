import { dirname, join } from 'path'
const path = require('path')

module.exports = {
  stories: ['../**/*.@(mdx|stories.@(tsx))'],
  staticDirs: ['../assets', '../styles'],

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
    getAbsolutePath('storybook-addon-designs'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
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

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },

  docs: {
    autodocs: true,
  },
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
