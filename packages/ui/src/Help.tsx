import React, { FC, ReactElement } from 'react'
import { HelpCircle } from 'react-feather'
import cn from 'classnames'

import { Icon } from './Icon'
import { Tooltip } from './Tooltip'

import styleConsts from '../styles/constants/export.scss'

import styles from './Help.module.scss'

export const helpTooltipId = (inputId: string): string => `${inputId}-help`

export interface HelpProps {
  parentId: string
  helperText: string | ReactElement
  placement?: string
  className?: string
  padding?: 'default' | 'none'
}

export const Help: FC<HelpProps> = ({ helperText, placement = 'top', parentId, className, padding = 'default' }) => (
  <Tooltip placement={placement} overlay={helperText} id={helpTooltipId(parentId)}>
    <div
      className={cn(styles.container, className, {
        [styles.padding]: padding === 'default',
      })}
    >
      <Icon ariaLabel="Help" color={styleConsts.colorPrimary} icon={HelpCircle} className={styles.icon} size="small" />
    </div>
  </Tooltip>
)
