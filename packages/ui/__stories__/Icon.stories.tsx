import React from 'react'
import { Clipboard } from 'react-feather'

import { Icon } from '../src/Icon'

import styleConsts from '../styles/constants/export.module.scss'

export default {
  title: 'Components/Icon',
  component: Icon,
}

export const Normal = () => <Icon icon={Clipboard} ariaLabel="Icon copy to clipboard" />

export const NormalCustomColour = () => <Icon icon={Clipboard} ariaLabel="Icon copy to clipboard" color={styleConsts.colorSuccess} />

export const Small = () => <Icon icon={Clipboard} ariaLabel="Icon copy to clipboard" size="small" />

export const SmallCustomColour = () => (
  <Icon icon={Clipboard} ariaLabel="Icon copy to clipboard" size="small" color={styleConsts.colorSuccess} />
)
