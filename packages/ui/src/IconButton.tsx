import React, { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'

import styles from './IconButton.module.scss'

export type IconButtonProps = {
  Icon: FeatherIcon
  iconClassName?: string
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className' | 'autoFocus' | 'disabled' | 'type'>

export const IconButton: FC<IconButtonProps> = ({ Icon, iconClassName, className, ...rest }) => (
  <button className={cn(className, styles.iconButton)} {...rest}>
    <span className={styles.outline} />
    <Icon className={cn(iconClassName, styles.icon)} />
  </button>
)
