import React, { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import { Icon as FeatherIcon } from 'react-feather'

import { Icon, IconProps } from './Icon'

import styles from './IconButton.module.scss'

type IconButtonKind = 'primary' | 'transparent'

export type IconButtonProps = {
  iconAriaLabel: string
  icon: FeatherIcon
  size?: IconProps['size']
  iconClassName?: string
} & IconButtonKindProps & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className' | 'autoFocus' | 'disabled' | 'type'>

type IconButtonKindProps = { kind: 'primary', color?: never } | { kind?: 'transparent', color?: IconProps['color'] }

export const IconButton: FC<IconButtonProps> = ({
  icon,
  iconAriaLabel,
  iconClassName,
  className,
  size,
  kind = 'transparent',
  color,
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
    {...rest}
  >
    <span className={styles.outline} />
    <Icon ariaLabel={iconAriaLabel} className={iconClassName} icon={icon} size={size} color={color} />
  </button>
)
