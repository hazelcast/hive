import React, { FC, SVGProps } from 'react'
import { Icon as FeatherIconType } from 'react-feather'
import { Icon as SimpleIconType } from '@icons-pack/react-simple-icons'

import styleConsts from '../styles/constants/export.module.scss'

export type IconSize = 'small' | 'normal' | 'medium' | 'large' | 'xlarge'

const getIconSize = (size: IconSize) =>
  ({
    small: styleConsts.iconSizeSmall,
    normal: styleConsts.iconSizeNormal,
    medium: styleConsts.iconSizeMedium,
    large: styleConsts.iconSizeLarge,
    xlarge: styleConsts.iconSizeXLarge,
  }[size])

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
} & IconAriaProps

export const Icon: FC<IconProps> = ({ color, icon: IconElement, ariaLabel, ariaLabelledBy, ariaHidden, className, size = 'normal' }) => {
  const iconSize = getIconSize(size)

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
