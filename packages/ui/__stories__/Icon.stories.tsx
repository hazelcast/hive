import React from 'react'
import { Clipboard } from 'react-feather'
import { Google } from '@icons-pack/react-simple-icons'

import { Icon } from '../src'

import styleConsts from '../styles/constants/export.module.scss'

export default {
  title: 'Components/Icon',
  component: Icon,
}

export const FeatherIconNormal = () => <Icon icon={Clipboard} ariaLabel="Icon copy to clipboard" />

export const FeatherIconNormalCustomColour = () => (
  <Icon icon={Clipboard} ariaLabel="Icon copy to clipboard" color={styleConsts.colorSuccess} />
)

export const FeatherIconSmall = () => <Icon icon={Clipboard} ariaLabel="Icon copy to clipboard" size="small" />

export const FeatherIconSmallCustomColour = () => (
  <Icon icon={Clipboard} ariaLabel="Icon copy to clipboard" size="small" color={styleConsts.colorSuccess} />
)

export const SimpleIconNormal = () => <Icon icon={Google} ariaLabel="Icon copy to clipboard" />

export const SimpleIconNormalCustomColour = () => <Icon icon={Google} ariaLabel="Icon copy to clipboard" color={styleConsts.colorSuccess} />

export const SimpleIconSmall = () => <Icon icon={Google} ariaLabel="Icon copy to clipboard" size="small" />

export const SimpleIconSmallCustomColour = () => (
  <Icon icon={Google} ariaLabel="Icon copy to clipboard" size="small" color={styleConsts.colorSuccess} />
)
