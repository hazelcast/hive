import React from 'react'

import { Help } from '../src/Help'

export default {
  title: 'Components/Help',
  component: Help,
}

const helpText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
const helpTextLarge =
  'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
const helpTextXLarge =
  'Lorem Ipsum is simply dummy text of the typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'

export const TextWithHelp = () => (
  <p>
    Lorem Ipsum is simply dummy text of the <span id="test">printing</span>
    <Help parentId="test" helperText={helpText} />
    and typesetting industry.
  </p>
)

export const HelpSmall = () => <Help parentId="test" helperText={helpText} />
export const HelpMedium = () => <Help parentId="test" helperText={helpText} size="medium" />
export const HelpLarge = () => <Help parentId="test" helperText={helpTextLarge} size="large" />
export const HelpXLarge = () => <Help parentId="test" helperText={helpTextXLarge} size="xlarge" />
