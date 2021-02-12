import React, { FC } from 'react'
import { Icon, IconProps } from './Icon'
import { IconButton, IconButtonProps } from './IconButton'
import { DataTestProp } from '@hazelcast/helpers'

import styles from './Card.module.scss'

type CardIconButtonLinkProps =
  | {
      iconButton: IconButtonProps['icon']
      iconButtonHref: string
      ariaLabel: string
    }
  | {
      iconButton?: never
      iconButtonHref?: never
      ariaLabel?: never
    }

export type CardProps = {
  title: string
  icon?: IconProps['icon']
  separator?: boolean
} & DataTestProp &
  CardIconButtonLinkProps

/**
 * ### Purpose
 * Card components define content hierarchy (visual and logical), separating content into "groups".
 *
 * ### General Info
 * - Card can be rendered with an optional separator and/or icon.
 */
export const Card: FC<CardProps> = ({
  title,
  icon,
  iconButton,
  iconButtonHref,
  ariaLabel,
  separator = false,
  'data-test': dataTest,
  children,
}) => (
  <div data-test={dataTest ?? 'card-wrapper'} className={styles.wrapper}>
    <h3 data-test="card-heading" className={styles.heading}>
      {icon && <Icon data-test="card-icon" icon={icon} className={styles.icon} ariaHidden />}
      {title}
      {iconButton && iconButtonHref && ariaLabel && (
        <IconButton
          className={styles.iconButton}
          kind="primary"
          component="a"
          icon={iconButton}
          href={iconButtonHref}
          ariaLabel={ariaLabel}
        />
      )}
    </h3>

    {separator && <div data-test="card-separator" className={styles.separator} />}

    <div data-test="card-content" className={styles.content}>
      {children}
    </div>
  </div>
)
