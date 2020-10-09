import React, { ReactElement, FC } from 'react'
import { Icon, IconProps } from 'core/componentsV2/Icon'
import { Tooltip } from 'core/componentsV2/Tooltip'
import { HelpCircle } from 'react-feather'

import styleConsts from 'core/stylesV2/constants/index.scss'

import styles from './Help.module.scss'

export const tooltipId = (inputId: string) => `${inputId}-label`

interface HelpProps {
  inputId: string
  helperText: string | ReactElement
  size?: IconProps['size']
  placement?: string
}

export const Help: FC<HelpProps> = ({ helperText, size, placement = 'top', inputId }) => (
  <Tooltip placement={placement} overlay={helperText} id={tooltipId(inputId)}>
    <div className={styles.icon}>
      <Icon ariaLabel="Help" color={styleConsts.colorPrimaryNormal} icon={HelpCircle} size={size} />
    </div>
  </Tooltip>
)
