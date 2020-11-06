import React from 'react'

import { Help } from '../src/Help'

export default {
  title: 'Components/Help',
  component: Help,
}

export const TextWithHelp = () => (
  <p>
    Lorem Ipsum is simply dummy text of the{' '}
    <span id="test">printing</span>
    <Help
      parentId="test"
      helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    />
    and typesetting industry.
  </p>
)

export const TextWithHelpNoPadding = () => (
  <p>
    Lorem Ipsum is simply dummy text of the{' '}
    <span id="test">printing</span>
    <Help
      padding="none"
      parentId="test"
      helperText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    />
    and typesetting industry.
  </p>
)
