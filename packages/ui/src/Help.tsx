import React, { FC, ReactElement } from 'react'
import { HelpCircle } from 'react-feather'
import cn from 'classnames'

import { Icon } from './Icon'
import { Tooltip, TooltipProps } from './Tooltip'

import styleConsts from '../styles/constants/export.scss'

import styles from './Help.module.scss'

export const helpTooltipId = (inputId: string): string => `${inputId}-help`

export interface HelpProps {
  parentId: string
  helperText: string | ReactElement
  placement?: TooltipProps['placement']
  className?: string
  padding?: 'default' | 'none'
}

export const Help: FC<HelpProps> = ({ helperText, placement = 'top', parentId, className, padding }) => {
  const tooltipId = helpTooltipId(parentId)

  return (
    <Tooltip placement={placement} content={helperText} id={tooltipId}>
      {(ref) => (
        <div
          ref={ref}
          className={cn(styles.container, className, {
            [styles.padding]: padding === 'default',
          })}
          aria-describedby={tooltipId}
        >
          <Icon ariaLabel="Help" color={styleConsts.colorPrimary} icon={HelpCircle} className={styles.icon} size="small" />
        </div>
      )}
    </Tooltip>
  )
}
