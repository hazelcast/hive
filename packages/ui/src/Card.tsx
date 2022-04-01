import React, { FC, ReactNode } from 'react'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import { Icon, IconProps } from './Icon'

import styles from './Card.module.scss'

export type CardProps = {
  headingIcon?: IconProps['icon']
  caption?: ReactNode
  title?: string
  headingContent?: ReactNode
  separator?: boolean
  children: ReactNode
  className?: string
  iconClassName?: string
  titleClassName?: string
  contentClassName?: string
  headerClassName?: string
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
  contentClassName,
  headerClassName,
  caption,
}) => (
  <div data-test={dataTest ?? 'card-wrapper'} className={cn(styles.wrapper, { [styles.noTitle]: !title }, className)}>
    {caption && <div className={styles.caption}>{caption}</div>}
    {(title || headingContent || headingIcon) && (
      <div data-test="card-heading" className={cn(styles.heading, headerClassName)}>
        {headingIcon && <Icon data-test="card-heading-icon" icon={headingIcon} className={cn(styles.icon, iconClassName)} ariaHidden />}
        {title && (
          <h3 data-test="card-heading-title" className={cn(styles.title, { [styles.space]: !!headingContent }, titleClassName)}>
            {title}
          </h3>
        )}
        {headingContent}
      </div>
    )}

    {separator && <div data-test="card-separator" className={styles.separator} />}

    {children && (
      <div data-test="card-content" className={cn(styles.content, contentClassName)}>
        {children}
      </div>
    )}
  </div>
)
