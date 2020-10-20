import React, { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'

import { Icon, IconProps } from '../src/Icon'

import styles from './IconButton.module.scss'

export type IconButtonProps = {
  iconAriaLabel: string
  icon: FeatherIcon
  size?: IconProps['size']
  iconClassName?: string
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className' | 'autoFocus' | 'disabled' | 'type'>

export const IconButton: FC<IconButtonProps> = ({ icon, iconAriaLabel, iconClassName, className, size, ...rest }) => (
  <button className={cn(styles.iconButton, className)} {...rest}>
    <span className={styles.outline} />
    <Icon ariaLabel={iconAriaLabel} className={iconClassName} icon={icon} size={size} />
  </button>
)
