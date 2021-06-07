import { GroupedOptionsType, OptionsType } from 'react-select'

import { getOptionsMap, SelectFieldOption, SelectFieldOptionsMap } from '../../src/Select/helpers'

describe('helpers', () => {
  describe('getOptionsMap', () => {
    const simpleOptions: OptionsType<SelectFieldOption<string>> = [
      { value: 'darth_vader', label: 'Darth Vader' },
      { value: 'luke_skywalker', label: 'Luke Skywalker' },
      { value: 'obi', label: 'Obi-Wan Kenobi' },
      { value: 'yoda', label: 'Yoda' },
      { value: 'han_solo', label: 'Han Solo' },
      { value: 'boba_fett', label: 'Boba Fett' },
      { value: 'jar_jar_binks', label: 'Jar Jar Binks' },
    ]

    const groupedOptions: GroupedOptionsType<SelectFieldOption<string>> = [
      {
        label: 'Dark Side',
        options: [
          { value: 'darth_vader', label: 'Darth Vader' },
          { value: 'boba_fett', label: 'Boba Fett' },
          { value: 'jar_jar_binks', label: 'Jar Jar Binks' },
        ],
      },
      {
        label: 'Light Side',
        options: [
          { value: 'luke_skywalker', label: 'Luke Skywalker' },
          { value: 'obi', label: 'Obi-Wan Kenobi' },
          { value: 'yoda', label: 'Yoda' },
          { value: 'han_solo', label: 'Han Solo' },
        ],
      },
    ]

    const mapping: SelectFieldOptionsMap<string> = {
      darth_vader: { value: 'darth_vader', label: 'Darth Vader' },
      luke_skywalker: { value: 'luke_skywalker', label: 'Luke Skywalker' },
      obi: { value: 'obi', label: 'Obi-Wan Kenobi' },
      yoda: { value: 'yoda', label: 'Yoda' },
      han_solo: { value: 'han_solo', label: 'Han Solo' },
      boba_fett: { value: 'boba_fett', label: 'Boba Fett' },
      jar_jar_binks: { value: 'jar_jar_binks', label: 'Jar Jar Binks' },
    }

    it('Returns correct mapping for simple options', () => {
      expect(getOptionsMap(simpleOptions)).toEqual(mapping)
    })

    it('Returns correct mapping for grouped options', () => {
      expect(getOptionsMap(groupedOptions)).toEqual(mapping)
    })
  })
})
