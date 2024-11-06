import { JestAxe } from 'jest-axe'

export type AxeOptions = Parameters<JestAxe>[1]
export const axeDefaultOptions: AxeOptions = {
  rules: {
    // We are testing small units. They might not contain landmarks
    region: {
      enabled: false,
    },
    // We are using chrome-off for SelectField
    'autocomplete-valid': { enabled: false },
    // TODO: Fix later
    'aria-tooltip-name': { enabled: false },
  },
}
