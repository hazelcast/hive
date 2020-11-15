import React, { FC } from 'react'
import { Icon, IconProps } from './Icon'
import cn from 'classnames'

import { IconButton, IconButtonProps } from './IconButton'

import styleConsts from '../styles/constants/export.scss'
import styles from './Card.module.scss'

type CardHeaderProps =
  | {
      title: string
      icon?: IconProps['icon']
      iconButton?: never
    }
  | {
      title: string
      iconButton?: Omit<IconButtonProps, 'size' | 'kind'>
      icon?: never
    }
  | {
      title?: never
      iconButton?: never
      icon?: never
    }

export type CardProps = {
  type?: 'primary' | 'secondary' | 'highlighter'
  icon?: IconProps['icon']
} & CardHeaderProps

/**
 * ### Purpose
 * Card components define content hierarchy (visual and logical), separating content into "groups".
 *
 * ### General Info
 * - There are three types of Cards - "Primary", "Secondary" and "Highlighter".
 * - "Secondary" and "Highlighter" Cards should be used only within "Primary" Cards.
 * - Card can display an icon next to Card heading. This icon can be static or interactive (button).
 */
export const Card: FC<CardProps> = ({ type = 'primary', title, icon, iconButton, children }) => {
  /**
   * Helper method to render plain or interactive icon (IconButton).
   */
let icon: JSX.Element = null
if (icon !== undefined) {
  icon = <Icon icon={icon} color={styleConsts.colorPrimary} size={type === 'primary' ? 'normal' : 'small'} ariaHidden />
}
if (iconButton !== undefined) {
   icon = (
        <IconButton kind="transparent" color={styleConsts.colorPrimary} size={type === 'primary' ? 'normal' : 'small'} {...iconButton} />
   )
}

  return (
    <div
      data-test="card-wrapper"
      className={cn(styles.wrapper, {
        [styles.typeSecondary]: type === 'secondary',
        [styles.typeHighlighter]: type === 'highlighter',
      })}
    >
      {title && (
          {type === 'primary' ? (
            <h2 data-test="card-heading" className={styles.header}>
              {title}
              {renderIcon()}
            </h2>
          ) : (
            <h3 data-test="card-heading" className={styles.header}>
              {title}
              {renderIcon()}
            </h3>
          )}
      )}
      <div data-test="card-content" className={cn(styles.content, { [styles.woTitle]: !title })}>
        {children}
      </div>
    </div>
  )
}
