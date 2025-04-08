import React from 'react'
import {
  Title,
  Subtitle,
  Description,
  Props,
} from '@storybook/addon-docs/blocks'

import { Stories } from './Stories'
import { Primary } from './Primary'

export const CustomDocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    <Props />
    <Stories includePrimary />
  </>
)
