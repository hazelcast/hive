import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Card } from '../src'
import { Carousel, CarouselProps } from '../src/components/Carousel'

const content = [<Card key={1}>Item1</Card>, <Card key={2}>Item2</Card>, <Card key={3}>Item3</Card>]

export default {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    docs: {
      inlineStories: true,
      iframeHeight: 200,
    },
  },
  args: {
    children: content,
  },
} as Meta<CarouselProps>

const Template: StoryFn<CarouselProps> = ({ children, ...args }) => {
  return <Carousel {...args}>{children}</Carousel>
}

export const Default = Template.bind({})

export const WithoutControls = Template.bind({})
WithoutControls.args = {
  withoutControls: true,
}

export const Doubles = Template.bind({})
Doubles.args = {
  slidesToShow: 2,
}

export const AnimationFade = Template.bind({})
AnimationFade.args = {
  animation: 'fade',
}

export const StartFromLast = Template.bind({})
StartFromLast.args = {
  slideIndex: 2,
}
export const InfiniteSlides = Template.bind({})
InfiniteSlides.args = {
  wrapAround: true,
}
