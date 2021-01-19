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
} & {
  size?: EmptyStateSize
}

type EmptyStateActionLink = {
  direction: 'horizontal'
  actionHref: ButtonTypeAnchorProps['href']
  actionTarget?: ButtonTypeAnchorProps['target']
  actionRel?: ButtonTypeAnchorProps['rel']
  actionOnClick?: never
} & {
  size?: never
}

type EmptyStateAction = {
  action: string
} & (EmptyStateActionButton | EmptyStateActionLink)

export type EmptyStateProps = {
  title: string
  description?: string
  icon: IconProps['icon']
  iconLabel: string
} & EmptyStateAction

export const EmptyState: FC<EmptyStateProps> = ({
  direction = 'vertical',
  size = 'normal',
  title,
  description,
  icon,
  iconLabel,
  ...restWActionProps
}) => {
  const { action, actionHref, actionOnClick, actionTarget, actionRel } = restWActionProps

  const iconSize = direction === 'vertical' && size === 'large' ? 'xlarge' : 'large'

  return (
    <div
      className={cn(styles.container, {
        // Direction
        [styles.horizontal]: direction === 'horizontal',
        // Size
        [styles.large]: size === 'large',
      })}
    >
      <Icon data-test="empty-state-icon" className={styles.icon} icon={icon} ariaLabel={iconLabel} size={iconSize} />
      <div className={styles.content}>
        {/* Note: div used instead of h3 due to styling override */}
        <div data-test="empty-state-title" className={styles.title} role="heading" aria-level={3}>
          {title}
        </div>
        {description && (
          <div data-test="empty-state-description" className={styles.description}>
            {description}
          </div>
        )}
        {direction === 'horizontal' && actionHref !== undefined ? (
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
        )}
      </div>
    </div>
  )
}
