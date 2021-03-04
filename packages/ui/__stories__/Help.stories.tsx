import React from 'react'

import { Help } from '../src/Help'

export default {
  title: 'Components/Help',
  component: Help,
}

const helpText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'

export const TextWithHelp = () => (
  <p>
    Lorem Ipsum is simply dummy text of the <span id="test">printing</span>
    <Help parentId="test" helperText={helpText} />
    and typesetting industry.
  </p>
)

export const HelpSmall = () => <Help parentId="test" helperText={helpText} />
export const HelpNormal = () => <Help parentId="test" helperText={helpText} size="normal" />
export const HelpLarge = () => <Help parentId="test" helperText={helpText} size="large" />
export const HelpXLarge = () => <Help parentId="test" helperText={helpText} size="xlarge" />
