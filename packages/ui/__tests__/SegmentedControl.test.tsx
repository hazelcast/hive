import React from 'react'
import { axeDefaultOptions, mountAndCheckA11Y } from '@hazelcast/test-helpers'
import { RadioGroup } from '@headlessui/react'

import { SegmentedControl, SegmentedControlOption } from '../src/SegmentedControl'
import { shallow } from 'enzyme'

const swCharacters = {
  darth_vader: 'Darth Vader',
  luke_skywalker: 'Luke Skywalker',
  obi: 'Obi-Wan Kenobi',
  yoda: 'Yoda',
}

type SWCharacters = keyof typeof swCharacters

const swCharactersOptions: SegmentedControlOption<SWCharacters>[] = (Object.keys(swCharacters) as SWCharacters[]).map((key) => ({
  value: key,
  label: swCharacters[key],
}))

describe('SegmentedControl', () => {
  it('Renders content', async () => {
    const checked = swCharactersOptions[0]
    const label = 'Star Wars Characters'
    const onChange = jest.fn()

    const rules = axeDefaultOptions?.rules ?? {}
    const wrapper = await mountAndCheckA11Y(
      <SegmentedControl<SWCharacters> label={label} value={checked.value} onChange={onChange} options={swCharactersOptions} />,
      {
        axeOptions: {
          rules: {
            ...rules,
            // RadioGroup.Label is passed role="none" which is apparently wrong
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
      const { value, label } = swCharactersOptions[i]
      expect(option.prop('value')).toBe(value)
      expect(option.find(RadioGroup.Label).text()).toBe(label)
    })
  })

  it('Renders correctly without label prop', () => {
    const checked = swCharactersOptions[0]
    const onChange = jest.fn()
    const wrapper = shallow(<SegmentedControl<SWCharacters> value={checked.value} onChange={onChange} options={swCharactersOptions} />)

    expect(wrapper.prop('label')).toBeUndefined()
  })
})
