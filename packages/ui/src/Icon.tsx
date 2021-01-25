import React, { FC, SVGProps } from 'react'
import { Icon as FeatherIconType } from 'react-feather'
import { Icon as SimpleIconType } from '@icons-pack/react-simple-icons'
import cn from 'classnames'

import styleConsts from '../styles/constants/export.module.scss'
import styles from './Icon.module.scss'

export type IconSize = 'small' | 'normal' | 'xlarge'

// Makes it required to set either "aria-label", "aria-labelledby" or "aria-hidden" attribute.
export type IconAriaProps =
  | {
      ariaLabel: string
      ariaLabelledBy?: never
      ariaHidden?: never
    }
  | {
      ariaLabel?: never
      ariaLabelledBy: string
      ariaHidden?: never
    }
  | {
      ariaLabel?: never
      ariaLabelledBy?: never
      ariaHidden: boolean
    }

export type IconProps = {
  color?: string
  icon: FeatherIconType | SimpleIconType
  size?: IconSize
  className?: string
  bold?: boolean
} & IconAriaProps

export const Icon: FC<IconProps> = ({
  color,
  icon: IconElement,
  ariaLabel,
  ariaLabelledBy,
  ariaHidden,
  className,
  size = 'normal',
  bold = false,
}) => {
  const iconStroke = bold ? styleConsts.iconStrokeWidthBold : styleConsts.iconStrokeWidth

  const props: SVGProps<SVGElement> = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-hidden': ariaHidden,
    color,
    width: '1em',
    height: '1em',
    className: cn(
      {
        [styles.small]: size === 'small',
        [styles.normal]: size === 'normal',
        [styles.xlarge]: size === 'xlarge',
      },
      className,
    ),
    strokeWidth: iconStroke,
  }

  return (
    <div className={styles.iconContainer}>
      <IconElement role="img" {...props} />
    </div>
  )
}
