import React, { FC, ReactElement } from 'react'
import { HelpCircle } from 'react-feather'
import cn from 'classnames'

import { Icon, IconSize } from './Icon'
import { SimpleTooltip, TooltipPlacement } from './Tooltip'
import { DataTestProp } from '../helpers/types'

import styleConsts from '../../styles/constants/export.module.scss'
import styles from './Help.module.scss'

export const helpTooltipId = (inputId: string): string => `${inputId}-help`

export interface HelpProps extends DataTestProp {
  parentId: string
  helperText: string | ReactElement
  placement?: TooltipPlacement
  className?: string
  size?: IconSize
}

export const Help: FC<HelpProps> = ({
  helperText,
  placement = 'top',
  parentId,
  className,
  size = 'small',
  'data-test': dataTest = 'help',
}) => {
  const tooltipId = helpTooltipId(parentId)

  return (
    <SimpleTooltip content={helperText} placement={placement} id={tooltipId}>
      <div data-test={dataTest} className={cn(styles.container, className)}>
        <Icon
          ariaLabel="Help"
          aria-describedby={tooltipId}
          color={styleConsts.colorPrimary}
          icon={HelpCircle}
          className={styles.icon}
          size={size}
        />
      </div>
    </SimpleTooltip>
  )
}
