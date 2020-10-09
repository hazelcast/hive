import React, { FC, SVGProps } from 'react'
import { Icon as IconType } from 'react-feather'

import styleConsts from '../styles/constants/index.scss'

const iconSizes = {
  small: styleConsts.iconSizeSmall,
  normal: styleConsts.iconSizeMedium,
  large: styleConsts.iconSizeLarge,
}

export interface IconProps {
  size?: keyof typeof iconSizes
  color?: string
  icon: IconType
  ariaLabel: string
  className?: string
}

export const Icon: FC<IconProps> = ({ size = 'normal', color, icon: IconElement, ariaLabel, className }) => {
  const props: SVGProps<SVGElement> = {
    'aria-label': ariaLabel,
    color,
    width: iconSizes[size],
    height: iconSizes[size],
    className,
    strokeWidth: styleConsts.iconStrokeWidth,
  }

  return <IconElement role="img" aria-label={ariaLabel} {...props} />
}
