import { create } from '@storybook/theming/create'

// manager.js does not support importing from SCSS
// TODO: Research and fix
export const customTheme = create({
  base: 'light',

  colorPrimary: '#2160c0',
  colorSecondary: '#2160c0',

  // UI
  appBg: '#fff',
  appContentBg: '#fff',
  appBorderColor: '#b7c1cb',
  appBorderRadius: 3,

  // Typography
  fontBase: "'Open Sans', sans-serif",
  fontCode: 'sans-serif',

  // Text colors
  textColor: '#041a3b',
  textInverseColor: '#fff',

  // Toolbar default and active colors
  barTextColor: '#041a3b',
  barSelectedColor: '#041a3b',
  barBg: '#fafafa',

  // Form colors
  inputBg: '#fafafa',
  inputBorder: '#b7c1cb',
  inputTextColor: '#041a3b',
  inputBorderRadius: 3,

  brandTitle: 'Hazelcast Hive',
  brandUrl:
    'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=1586%3A0',
  brandImage:
    'https://hazelcast.com/wp-content/themes/hazelcast/assets/images/hazelcast-logo.svg',
})
