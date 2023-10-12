import React, { FC, SVGAttributes } from 'react'
import cn from 'classnames'

import { IconSize } from './Icon'

import styles from './Loader.module.scss'

export type LoaderProps = {
  className?: string
  size?: IconSize
  kind?: 'primary' | 'contrast' | 'inherit'
  children?: never
  ariaLabel?: string
  role?: string
} & Pick<SVGAttributes<SVGElement>, 'aria-hidden'>

export const Loader: FC<LoaderProps> = ({ className, size = 'medium', kind = 'inherit', role = 'img', ariaLabel, ...props }) => (
  // https://github.com/feathericons/feather/blob/a718a7e9c39447202f703783336e8ba1c8e32405/icons/loader.svg#L1
  // We cannot use it directly as it has `line` elements not in a sequential order
  // And we need the sequential order to easily calculate animation delay
  <svg
    xmlns="http://www.w3.org/2000/svg"
    role={role}
    className={cn(
      styles.loader,
      {
        [styles.small]: size === 'small',
        [styles.smallMedium]: size === 'smallMedium',
        [styles.medium]: size === 'medium',
        [styles.large]: size === 'large',
        [styles.xlarge]: size === 'xlarge',
        [styles.primary]: kind === 'primary',
        [styles.contrast]: kind === 'contrast',
        [styles.inherit]: kind === 'inherit',
      },
      className,
    )}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label={ariaLabel ? ariaLabel : 'Loader icon'}
    {...props}
  >
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
)
