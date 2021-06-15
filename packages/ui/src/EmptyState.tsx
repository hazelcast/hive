import React, { FC } from 'react'
import cn from 'classnames'
import { ChevronRight } from 'react-feather'

import { ButtonTypeAnchorProps, ButtonProps, Button } from './Button'
import { Link } from './Link'
import { Icon, IconProps } from './Icon'

import styles from './EmptyState.module.scss'

type EmptyStateSize = 'normal' | 'large'

type EmptyStateActionButton = {
  direction?: 'vertical'
  actionOnClick: ButtonProps['onClick']
  actionHref?: never
  actionTarget?: never
  actionRel?: never
  size?: EmptyStateSize
}

type EmptyStateActionLink = {
  direction: 'horizontal'
  actionHref: ButtonTypeAnchorProps['href']
  actionTarget?: ButtonTypeAnchorProps['target']
  actionRel?: ButtonTypeAnchorProps['rel']
  actionOnClick?: never
  size?: never
}

type EmptyStateAction =
  // Action is present
  | ({
      action: string
    } & (EmptyStateActionButton | EmptyStateActionLink))
  // Action is not present
  | {
      action?: never
      direction?: 'vertical' | 'horizontal'
      actionOnClick?: never
      actionHref?: never
      actionTarget?: never
      actionRel?: never
      size?: EmptyStateSize
    }

export type EmptyStateProps = {
  title: string
  description?: string
  icon: IconProps['icon']
  iconLabel: string
  className?: string
} & EmptyStateAction

/**
 * ### Purpose
 * Sometimes users performs an action, that yields an empty result. Such cases may be first use of a feature, view with no data, user cleared view or an error state.
 * Help the user understand the situation by providing them with guidance in form of an Empty State.
 *
 * ### General Info
 * - There are 2 variations of Empty State: vertical (available in normal and large size) and horizontal (only one size). The use depends on available space in UI.
 * - Every empty state must contain title (should be specific and clear).
 * - Good practice is add an action button to guide a user for the next steps to get out of the empty state.
 * - Description helps to describe the semantics more thoroughly.
 */
export const EmptyState: FC<EmptyStateProps> = ({
  direction = 'vertical',
  size = 'normal',
  title,
  description,
  icon,
  iconLabel,
  className,
  ...restWActionProps
}) => {
  const { action, actionHref, actionOnClick, actionTarget, actionRel } = restWActionProps

  const iconSize = direction === 'vertical' && size === 'large' ? 'xlarge' : 'large'

  return (
    <div
      data-test="empty-state-container"
      className={cn(
        styles.container,
        {
          [styles.horizontal]: direction === 'horizontal',
          [styles.large]: size === 'large',
        },
        className,
      )}
    >
      <Icon data-test="empty-state-icon" className={styles.icon} icon={icon} ariaLabel={iconLabel} size={iconSize} />
      <div className={styles.content}>
        <div data-test="empty-state-title" className={styles.title}>
          {title}
        </div>
        {description && (
          <p data-test="empty-state-description" className={styles.description}>
            {description}
          </p>
        )}
        {action ? (
          direction === 'horizontal' && actionHref !== undefined ? (
            <Link
              data-test="empty-state-link"
              className={styles.action}
              icon={ChevronRight}
              ariaLabel="Icon Chevron Right"
              href={actionHref}
              target={actionTarget}
              rel={actionRel}
              size="small"
            >
              {action}
            </Link>
          ) : (
            <Button data-test="empty-state-button" className={styles.action} onClick={actionOnClick}>
              {action}
            </Button>
          )
        ) : null}
      </div>
    </div>
  )
}
