import React, { FC, ReactNode } from 'react'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import { Icon, IconProps } from './Icon'

import styles from './Card.module.scss'

export type CardProps = {
  headingIcon?: IconProps['icon']
  title?: string
  headingContent?: ReactNode
  separator?: boolean
  children: ReactNode
  className?: string
  iconClassName?: string
  titleClassName?: string
} & DataTestProp

/**
 * ### Purpose
 * Card components define content hierarchy (visual and logical), separating content into "groups".
 *
 * ### General Info
 * - Card can be rendered with an optional separator and/or icon.
 */
export const Card: FC<CardProps> = ({
  headingIcon,
  title,
  headingContent,
  separator = false,
  'data-test': dataTest,
  children,
  className,
  iconClassName,
  titleClassName,
}) => (
  <div data-test={dataTest ?? 'card-wrapper'} className={cn(styles.wrapper, { [styles.noTitle]: !title }, className)}>
    {title && (
      <div data-test="card-heading" className={styles.heading}>
        {headingIcon && <Icon data-test="card-heading-icon" icon={headingIcon} className={cn(styles.icon, iconClassName)} ariaHidden />}
        <h3 data-test="card-heading-title" className={cn(styles.title, titleClassName, { [styles.space]: !!headingContent })}>
          {title}
        </h3>
        {headingContent}
      </div>
    )}

    {separator && <div data-test="card-separator" className={styles.separator} />}

    <div data-test="card-content" className={styles.content}>
      {children}
    </div>
  </div>
)
