import React, { FC, SVGProps } from 'react'
import { Icon as IconType } from 'react-feather'

import styleConsts from '../styles/constants/export.module.scss'

type IconSize = 'small' | 'normal'

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
  icon: IconType
  size?: IconSize
  className?: string
} & IconAriaProps

export const Icon: FC<IconProps> = ({ color, icon: IconElement, ariaLabel, ariaLabelledBy, ariaHidden, className, size = 'normal' }) => {
  const iconSize = size === 'small' ? styleConsts.iconSizeSmall : styleConsts.iconSizeNormal

  const props: SVGProps<SVGElement> = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-hidden': ariaHidden,
    color,
    width: iconSize,
    height: iconSize,
    className,
    strokeWidth: styleConsts.iconStrokeWidth,
  }

  return <IconElement role="img" aria-label={ariaLabel} {...props} />
}
