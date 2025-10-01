import React from 'react'
import { screen } from '@testing-library/react'
import { renderAndCheckA11Y } from '../../src/test-helpers'

import { NumberBadge } from '../../src/components/NumberBadge'

describe('NumberBadge', () => {
  it('Renders number lower than 100', async () => {
    const number = 99

    await renderAndCheckA11Y(<NumberBadge number={number} />)

    expect(screen.getByTestId('number-badge')).toHaveTextContent(number.toString())
  })

  it('Renders formatted number higher than 99', async () => {
    const number = 100

    await renderAndCheckA11Y(<NumberBadge number={number} />)

    expect(screen.getByTestId('number-badge')).toHaveTextContent('+99')
  })
})
