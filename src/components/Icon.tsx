import React, { FC, forwardRef, SVGAttributes, SVGProps } from 'react'
import cn from 'classnames'
import { DataTestProp } from '../../src'

import styleConsts from '../../styles/constants/export.module.scss'
import styles from './Icon.module.scss'

export type IconSize = 'small' | 'smallMedium' | 'medium' | 'large' | 'xlarge'

// Makes it required to set either "aria-label", "aria-labelledby" or "aria-hidden" attribute.
export type IconAriaProps =
  | {
      ariaLabel: string | undefined
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
      ariaHidden?: boolean
    }

export type IconType = FC<
  SVGAttributes<SVGElement> & {
    color?: string
    size?: string | number
  }
>

export type IconProps = {
  color?: string
  icon: IconType
  size?: IconSize
  className?: string
  containerClassName?: string
  bold?: boolean
  role?: string
} & IconAriaProps &
  DataTestProp

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  (
    {
      color,
      icon: IconElement,
      ariaLabel,
      ariaLabelledBy,
      ariaHidden,
      className,
      containerClassName,
      size = 'medium',
      bold = false,
      role = 'img',
      'data-test': dataTest,
    },
    ref,
  ) => {
    const iconStroke = bold ? styleConsts.iconStrokeWidthBold : styleConsts.iconStrokeWidth

    const props: SVGProps<SVGElement> = {
      'aria-label': ariaLabel || 'icon',
      'aria-labelledby': ariaLabelledBy,
      'aria-hidden': ariaHidden,
      color,
      width: '1em',
      height: '1em',
      className: cn(
        {
          [styles.small]: size === 'small',
          [styles.smallMedium]: size === 'smallMedium',
          [styles.medium]: size === 'medium',
          [styles.large]: size === 'large',
          [styles.xlarge]: size === 'xlarge',
        },
        className,
      ),
      strokeWidth: iconStroke,
    }

    return (
      <div className={cn(styles.iconContainer, containerClassName)} data-test={dataTest} ref={ref}>
        <IconElement role={role} {...props} />
      </div>
    )
  },
)
Icon.displayName = 'Icon'
