import React, { ReactElement, FC } from 'react'
import { HelpCircle } from 'react-feather'
import cn from 'classnames'

import { Icon } from './Icon'
import { Tooltip } from './Tooltip'

import styleConsts from '../styles/constants/index.scss'

import styles from './Help.module.scss'

export const tooltipId = (inputId: string): string => `${inputId}-label`

export interface HelpProps {
  parentId: string
  helperText: string | ReactElement
  placement?: string
  className?: string
}

export const Help: FC<HelpProps> = ({ helperText, placement = 'top', parentId, className }) => (
  <Tooltip placement={placement} overlay={helperText} id={tooltipId(parentId)}>
    <div className={cn(styles.container, className)}>
      <Icon ariaLabel="Help" color={styleConsts.colorPrimary} icon={HelpCircle} className={styles.icon} />
    </div>
  </Tooltip>
)
