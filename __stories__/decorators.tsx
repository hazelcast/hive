import React, { ComponentType } from 'react'
import { StoryContext } from '@storybook/react-webpack5'

export const formDecorator = (Story: ComponentType, { parameters }: StoryContext) => {
  if (parameters?.ignoreFormDecorator) {
    return <Story />
  }

  return (
    <form>
      <Story />
    </form>
  )
}
