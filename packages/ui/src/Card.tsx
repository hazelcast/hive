import React, { FC } from 'react'
import { Icon, IconProps } from './Icon'
import { DataTestProp } from '@hazelcast/helpers'

import styles from './Card.module.scss'

export type CardProps = {
  title: string
  icon?: IconProps['icon']
  separator?: boolean
} & DataTestProp

/**
 * ### Purpose
 * Card components define content hierarchy (visual and logical), separating content into "groups".
 *
 * ### General Info
 * - Card can be rendered with an optional separator and/or icon.
 */
export const Card: FC<CardProps> = ({ title, icon, separator = false, 'data-test': dataTest, children }) => (
  <div data-test={dataTest ?? 'card-wrapper'} className={styles.wrapper}>
    {title && (
      <>
        <h3 data-test="card-heading" className={styles.heading}>
          {icon && <Icon icon={icon} className={styles.icon} ariaHidden />}
          {title}
        </h3>
      </>
    )}

    {separator && <span data-test="card-separator" className={styles.separator} />}

    <div data-test="card-content" className={styles.content}>
      {children}
    </div>
  </div>
)
