import React, { FC, ReactElement } from 'react'
import { HelpCircle } from 'react-feather'
import cn from 'classnames'

import { Icon } from './Icon'
import { Tooltip, TooltipProps } from './Tooltip'

import styleConsts from '../styles/constants/export.module.scss'

import styles from './Help.module.scss'
import { IconSize } from '../lib'

export const helpTooltipId = (inputId: string): string => `${inputId}-help`

export interface HelpProps {
  parentId: string
  helperText: string | ReactElement
  placement?: TooltipProps['placement']
  className?: string
  popperRef?: TooltipProps['popperRef']
  size?: IconSize
}

export const Help: FC<HelpProps> = ({ helperText, placement = 'top', parentId, className, popperRef, size = 'small' }) => {
  const tooltipId = helpTooltipId(parentId)

  return (
    <Tooltip placement={placement} content={helperText} id={tooltipId} popperRef={popperRef}>
      {(ref) => (
        <div ref={ref} className={cn(styles.container, className)}>
          <Icon
            ariaLabel="Help"
            aria-describedby={tooltipId}
            color={styleConsts.colorPrimary}
            icon={HelpCircle}
            className={styles.icon}
            size={size}
          />
        </div>
      )}
    </Tooltip>
  )
}
