import React, { ComponentType } from 'react'

export const formDecorator = (Story: ComponentType) => (
  <form>
    <Story />
  </form>
)
