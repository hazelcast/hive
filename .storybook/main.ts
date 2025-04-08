import type { StorybookConfig } from '@storybook/react-webpack5'

import { join, dirname, resolve } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  stories: ['../__stories__/**/*.mdx', '../__stories__/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../assets', '../styles'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/manager-api'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  webpackFinal: (config) => {
    config.module.rules = [
      ...config.module.rules.filter((rule) => {
        if (typeof rule === 'object' && rule.test) {
          return !rule.test.toString().includes('.css')
        }

        return true
      }),
      {
        test: /\.(css|scss)$/,
        include: /\.module\.s?css$/,
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                namedExport: false,
                localIdentName: '[name]___[local]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [resolve('./')],
              },
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.s?css$/,
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [resolve('./')],
              },
            },
          },
        ],
      },
    ]
    return config
  },
}
export default config
