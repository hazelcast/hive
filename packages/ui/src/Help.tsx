import React, { CSSProperties, FC, ReactElement } from 'react'
import { HelpCircle } from 'react-feather'
import cn from 'classnames'

import { Icon, IconSize } from './Icon'
import { Tooltip, TooltipProps } from './Tooltip'

import styleConsts from '../styles/constants/export.module.scss'
import styles from './Help.module.scss'

export const helpTooltipId = (inputId: string): string => `${inputId}-help`
const WORD_LENGTH_THRESHOLD = 60

export interface HelpProps {
  parentId: string
  helperText: string | ReactElement
  placement?: TooltipProps['placement']
  className?: string
  popperRef?: TooltipProps['popperRef']
  size?: IconSize
  tooltipWordBreak?: CSSProperties['wordBreak']
  visible?: boolean
}

export const Help: FC<HelpProps> = ({
  helperText,
  placement = 'top',
  parentId,
  className,
  tooltipWordBreak,
  popperRef,
  size = 'small',
}) => {
  const tooltipId = helpTooltipId(parentId)
  const autoWordBreak: CSSProperties['wordBreak'] =
    !tooltipWordBreak &&
    helperText
      .toString()
      .split(' ')
      .reduce((res, curr) => (curr.length > res ? curr.length : res), 0) < WORD_LENGTH_THRESHOLD
      ? 'normal'
      : tooltipWordBreak

  return (
    <Tooltip placement={placement} content={helperText} id={tooltipId} popperRef={popperRef} wordBreak={autoWordBreak}>
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
