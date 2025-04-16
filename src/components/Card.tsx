import React, { ElementType, FC, ReactNode } from 'react'
import cn from 'classnames'
import { DataTestProp } from '../../src'

import { Icon, IconProps } from './Icon'

import styles from './Card.module.scss'

export type CardProps = {
  headingIcon?: IconProps['icon']
  caption?: ReactNode
  title?: string
  titleTagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  headingContent?: ReactNode
  separator?: boolean
  variant?: 'bordered' | 'default'
  children: ReactNode
  className?: string
  iconClassName?: string
  titleClassName?: string
  contentClassName?: string
  headerClassName?: string
} & DataTestProp

interface TitleProps {
  as: ElementType
  className?: string
  children?: ReactNode
}
const Title: FC<TitleProps> = ({ as: Tag, ...props }) => <Tag data-test="card-heading-title" {...props} />

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
  variant = 'default',
  'data-test': dataTest,
  children,
  titleTagName = 'h2',
  className,
  iconClassName,
  titleClassName,
  contentClassName,
  headerClassName,
  caption,
}) => (
  <div
    data-test={dataTest ?? 'card-wrapper'}
    className={cn(styles.wrapper, { [styles.noTitle]: !title, [styles.bordered]: variant === 'bordered' }, className)}
  >
    {caption && <div className={styles.caption}>{caption}</div>}
    {(title || headingContent || headingIcon) && (
      <div data-test="card-heading" className={cn(styles.heading, headerClassName)}>
        {headingIcon && <Icon data-test="card-heading-icon" icon={headingIcon} className={cn(styles.icon, iconClassName)} ariaHidden />}
        {title && (
          <Title as={titleTagName} className={cn(styles.title, { [styles.space]: !!headingContent }, titleClassName)}>
            {title}
          </Title>
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
