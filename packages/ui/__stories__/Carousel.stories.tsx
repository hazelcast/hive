import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Card } from '../src'
import { Carousel, CarouselProps } from '../src/Carousel'

const content = [<Card key={1}>Item1</Card>, <Card key={2}>Item2</Card>, <Card key={3}>Item3</Card>]

export default {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 700,
    },
  },
  args: {
    children: content,
  },
} as Meta<CarouselProps>

const Template: Story<CarouselProps> = ({ children, ...args }) => {
  return <Carousel {...args}>{children}</Carousel>
}

export const Default = Template.bind({})
