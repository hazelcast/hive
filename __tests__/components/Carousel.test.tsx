import React from 'react'
import { renderAndCheckA11Y, axeDefaultOptions } from '../../src/test-helpers'
import NukaCarousel from 'nuka-carousel'

import { Card, Carousel } from '../../src'

jest.mock('nuka-carousel', () => jest.fn())

describe('Carousel', () => {
  const contentCarousel = [<Card key={1}>Item1</Card>, <Card key={2}>Item2</Card>, <Card key={3}>Item3</Card>]

  it('creates NukaCarousel with correct params', async () => {
    await renderAndCheckA11Y(<Carousel slidesToShow={2}>{contentCarousel}</Carousel>, {
      axeOptions: { rules: { 'aria-allowed-attr': { enabled: false }, ...(axeDefaultOptions?.rules ?? {}) } },
    })

    expect(NukaCarousel).toHaveBeenCalledWith(
      expect.objectContaining({
        slidesToShow: 2,
        cellSpacing: 15,
        children: contentCarousel,
        defaultControlsConfig: expect.objectContaining({
          nextButtonClassName: 'nextButtonClassName',
          prevButtonClassName: 'prevButtonClassName',
          nextButtonStyle: { background: 'none' },
          prevButtonStyle: { background: 'none' },
          pagingDotsClassName: 'pagingDotsClassName',
          pagingDotsStyle: { fill: 'colorPrimary' },
          nextButtonText: expect.anything(),
          prevButtonText: expect.anything(),
        }),
      }),
      undefined,
    )
  })
})
