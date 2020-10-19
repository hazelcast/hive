import React, { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'

import styles from './IconButton.module.scss'

type IconButtonProps = {
  Icon: FeatherIcon
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'autoFocus' | 'disabled' | 'type'>

export const IconButton: FC<IconButtonProps> = ({ Icon, className, ...rest }) => (
  <button className={cn(className, styles.iconButton)} {...rest}>
    <span className={styles.outline} />
    <Icon className={styles.icon} />
  </button>
)
