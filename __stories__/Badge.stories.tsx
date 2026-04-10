import React from 'react'
import { Star } from 'react-feather'

import { Badge } from '../src/components/Badge'

const longText = 'This is a long text that forces the Badge to wrap'

export default {
  title: 'Components/Badge',
  component: Badge,
}

export const Neutral = () => <Badge type="neutral" content="Badge text" />

export const Success = () => <Badge type="success" content="Badge text" />

export const Info = () => <Badge type="info" content="Badge text" />

export const Warning = () => <Badge type="warning" content="Badge text" />

export const Critical = () => <Badge type="critical" content="Badge text" />

export const CustomIcon = () => <Badge type="info" icon={{ icon: Star, ariaLabel: 'Star icon' }} content="Custom icon" />

export const LongText = () => (
  <div style={{ maxWidth: 350 }}>
    <Badge type="critical" content={longText} />
  </div>
)
