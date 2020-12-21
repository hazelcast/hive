import React, { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'

import { Icon, IconProps, IconAriaProps } from './Icon'

import styles from './IconButton.module.scss'

type IconButtonKind = 'primary' | 'transparent'

export type IconButtonProps = {
  icon: FeatherIcon
  size?: IconProps['size']
  iconClassName?: string
  kind?: IconButtonKind
} & IconAriaProps &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className' | 'autoFocus' | 'disabled' | 'type' | 'tabIndex'>

export const IconButton: FC<IconButtonProps> = ({
  icon,
  iconClassName,
  className,
  size,
  kind = 'transparent',
  ariaHidden,
  ariaLabelledBy,
  ariaLabel,
  type = 'button',
  ...rest
}) => (
  <button
    className={cn(
      styles.iconButton,
      {
        [styles.primary]: kind === 'primary',
        [styles.transparent]: kind === 'transparent',
      },
      className,
    )}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    type={type}
    {...rest}
  >
    <span className={styles.outline} />
    <Icon className={iconClassName} icon={icon} size={size} ariaHidden />
  </button>
)
