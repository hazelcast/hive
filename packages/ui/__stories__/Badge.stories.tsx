import React from 'react'

import { Badge } from '../src/Badge'

export default {
  title: 'components/Badge',
  component: Badge,
}

export const Neutral = () => <Badge type="neutral" content="Badge text" />

export const Success = () => <Badge type="success" content="Badge text" />

export const Info = () => <Badge type="info" content="Badge text" />

export const Warning = () => <Badge type="warning" content="Badge text" />

export const Critical = () => <Badge type="critical" content="Badge text" />
