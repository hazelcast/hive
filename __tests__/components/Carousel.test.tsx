import React from 'react'
import { within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAndCheckA11Y, axeDefaultOptions } from '../../src'

import { Card, Carousel } from '../../src'

describe('Carousel', () => {
  const contentCarousel = [<Card key={1}>Item1</Card>, <Card key={2}>Item2</Card>, <Card key={3}>Item3</Card>]

  it('slide content', async () => {
    const { container } = await renderAndCheckA11Y(<Carousel slidesToShow={1}>{contentCarousel}</Carousel>, {
      axeOptions: { rules: { 'aria-allowed-attr': { enabled: false }, ...(axeDefaultOptions?.rules ?? {}) } },
    })

    let currentSlide = container.querySelector('.slide-current') as HTMLElement
    expect(currentSlide).toBeInTheDocument()
    expect(within(currentSlide).getByTestId('card-content')).toHaveTextContent('Item1')

    const nextButton = container.querySelector('.nextButtonClassName') as HTMLElement
    expect(nextButton).toBeInTheDocument()

    await userEvent.click(nextButton)

    currentSlide = container.querySelector('.slide-current') as HTMLElement
    expect(within(currentSlide).getByTestId('card-content')).toHaveTextContent('Item2')
  })
})
