import React, { FC } from 'react'
import cn from 'classnames'

import { ButtonTypeButtonProps, ButtonTypeAnchorProps, ButtonProps, Button } from './Button'
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
  ...restWithActionProps
}) => {
  const { action, actionHref, actionOnClick, actionTarget, actionRel } = restWithActionProps

  const buttonProps =
    direction === 'vertical'
      ? ({
          component: 'button',
          onClick: actionOnClick,
          children: action,
        } as ButtonProps<ButtonTypeButtonProps>)
      : ({
          component: 'a',
          href: actionHref,
          target: actionTarget,
          rel: actionRel,
          children: action,
        } as ButtonProps<ButtonTypeAnchorProps>)

  return (
    <div
      className={cn(styles.container, {
        // Direction
        [styles.horizontal]: direction === 'horizontal',
        // Size
        [styles.large]: size === 'large',
      })}
    >
      <Icon className={styles.icon} icon={icon} ariaLabel={iconLabel} size="xlarge" />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.description}>{description}</div>
        <Button className={styles.button} {...buttonProps} />
      </div>
    </div>
  )
}
