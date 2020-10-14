import React, { FC, SVGProps } from 'react'
import { Icon as IconType } from 'react-feather'

import styleConsts from '../styles/constants/index.scss'

export interface IconProps {
  color?: string
  icon: IconType
  ariaLabel: string
  className?: string
}

export const Icon: FC<IconProps> = ({ color, icon: IconElement, ariaLabel, className }) => {
  const props: SVGProps<SVGElement> = {
    'aria-label': ariaLabel,
    color,
    width: styleConsts.iconSize,
    height: styleConsts.iconSize,
    className,
    strokeWidth: styleConsts.iconStrokeWidth,
  }

  return <IconElement role="img" aria-label={ariaLabel} {...props} />
}
