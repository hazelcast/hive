import React from 'react'
import { mountAndCheckA11Y } from '@hazelcast/test-helpers'

import { Card, Carousel } from '../src'

import { axeDefaultOptions } from '@hazelcast/test-helpers/src'
import { act } from 'react-dom/test-utils'

describe('Carousel', () => {
  const contentCarousel = [<Card key={1}>Item1</Card>, <Card key={2}>Item2</Card>, <Card key={3}>Item3</Card>]

  it('slide content', async () => {
    const wrapper = await mountAndCheckA11Y(<Carousel slidesToShow={1}>{contentCarousel}</Carousel>, {
      axeOptions: { rules: { 'aria-allowed-attr': { enabled: false }, ...(axeDefaultOptions?.rules ?? {}) } },
    })

    const defaultSlideText = wrapper.find('.slide-current').findDataTest('card-content').at(0).text()

    expect(defaultSlideText).toEqual('Item1')

    act(() => {
      wrapper.find('.nextButtonClassName').at(0).simulate('click')
    })
    wrapper.update()
    const currentSlideText = wrapper.find('.slide-current').findDataTest('card-content').at(0).text()

    expect(currentSlideText).toEqual('Item2')
  })
})
