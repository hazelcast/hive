import React from 'react'

import { NumberBadge } from '../src/NumberBadge'

export default {
  title: 'components/NumberBadge',
  component: NumberBadge,
}

export const Default = () => <NumberBadge number={1} />

export const LessThan100 = () => <NumberBadge number={99} />

export const MoreThan99 = () => <NumberBadge number={100} />
