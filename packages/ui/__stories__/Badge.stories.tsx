import React from 'react'

import { Badge } from '../src/Badge'

const longText = 'This is a long text that forces the Badge to wrap'

export default {
  title: 'Components/Badge',
  component: Badge,
}

export const NeutralNormal = () => <Badge size="normal" type="neutral" content="Badge text" />

export const NeutralSmall = () => <Badge size="small" type="neutral" content="Badge text" />

export const SuccessNormal = () => <Badge size="normal" type="success" content="Badge text" />

export const SuccessSmall = () => <Badge size="small" type="success" content="Badge text" />
export const InfoNormal = () => <Badge size="normal" type="info" content="Badge text" />

export const InfoSmall = () => <Badge size="small" type="info" content="Badge text" />

export const WarningNormal = () => <Badge size="normal" type="warning" content="Badge text" />

export const WarningSmall = () => <Badge size="small" type="warning" content="Badge text" />

export const CriticalNormal = () => <Badge size="normal" type="critical" content="Badge text" />

export const CriticalSmall = () => <Badge size="small" type="critical" content="Badge text" />

export const LongText = () => (
  <div style={{ maxWidth: 350 }}>
    <Badge size="small" type="critical" content={longText} />
  </div>
)
