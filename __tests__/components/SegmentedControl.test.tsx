import React from 'react'
import { axeDefaultOptions, renderAndCheckA11Y } from '../../src/test-helpers'
import { render, screen, within } from '@testing-library/react'

import { SegmentedControl, SegmentedControlOption } from '../../src/components/SegmentedControl'

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
    await renderAndCheckA11Y(
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

    const radioGroup = screen.getByTestId('segmented')
    const radioGroupLabel = within(radioGroup).getByTestId('segmented-label')
    const radioGroupOptions = within(radioGroup).getAllByRole('radio')

    expect(radioGroupLabel).toHaveTextContent(label)

    radioGroupOptions.forEach((option, i) => {
      const { label } = swCharactersOptions[i]

      expect(within(option).queryByText(label)).toBeInTheDocument()
    })
  })

  it('Renders correctly without label prop', () => {
    const checked = swCharactersOptions[0]
    const onChange = jest.fn()
    render(<SegmentedControl<SWCharacters> value={checked.value} onChange={onChange} options={swCharactersOptions} />)

    expect(screen.queryByTestId('label-data-test')).not.toBeInTheDocument()
  })
})
