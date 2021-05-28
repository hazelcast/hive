import React from 'react'
import { axeDefaultOptions, mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { RadioGroup } from '@headlessui/react'

import { SegmentedControl, SegmentedControlOption } from '../src/SegmentedControl'

describe('SegmentedControl', () => {
  it('Renders content', async () => {
    const options: SegmentedControlOption[] = [
      { value: 'darth_vader', label: 'Darth Vader' },
      { value: 'luke_skywalker', label: 'Luke Skywalker' },
      { value: 'obi', label: 'Obi-Wan Kenobi' },
      { value: 'yoda', label: 'Yoda' },
    ]
    const checked = options[0]
    const label = 'Star Wars Characters'
    const onChange = jest.fn()

    const wrapper = await mountAndCheckA11Y(
      <SegmentedControl label={label} value={checked.value} onChange={onChange} options={options} />,
      {
        axeOptions: {
          rules: {
            ...axeDefaultOptions?.rules,
            // RadioGroup.Label is passed role="none" which is appratently wrong
            'aria-allowed-role': { enabled: false },
          },
        },
      },
    )

    const radioGroup = wrapper.find(RadioGroup)
    const radioGroupLabel = radioGroup.find(RadioGroup.Label).first()
    const radioGroupOptions = radioGroup.find(RadioGroup.Option)

    expect(wrapper.find(RadioGroup).props()).toMatchObject({
      value: checked.value,
      onChange,
    })
    expect(radioGroupLabel.text()).toBe(label)

    radioGroupOptions.forEach((option, i) => {
      const { value, label } = options[i]
      expect(option.prop('value')).toBe(value)
      expect(option.find(RadioGroup.Label).text()).toBe(label)
    })
  })
})
