import React, { AnchorHTMLAttributes, FC, ReactNode } from 'react'
import { Icon as IconProp } from 'react-feather'
import cn from 'classnames'
import { PartialRequired } from '@hazelcast/helpers'

import styles from './Link.module.scss'

const sizes = {
  regular: styles.regular,
  small: styles.small,
}

type AnchorAttirubutes = AnchorHTMLAttributes<HTMLAnchorElement>

type IconProps =
  | {
      Icon: IconProp
      iconAriaLabel: string
    }
  | {
      Icon?: never
      iconAriaLabel?: never
    }

type LinkProps = IconProps & {
  size?: keyof typeof sizes
} & PartialRequired<AnchorAttirubutes, 'href'> &
  Pick<AnchorAttirubutes, 'target' | 'rel' | 'className'> & {
    children: ReactNode
  }

/**
 * ### Purpose
 * Makes text in paragraphs actionable. Sometimes you want text that is actionable but not as attention-grabbing as a button. Maybe it sits inside a paragraph of text.
 * Text links let you add actions in the form of text that fits with its surroundings. Users can see they can take an action, but their focus is not drawn much from your main flow.
 *
 * ### General Info
 * - There are 2 types of Link available - regular and small.
 * - The default state of all types of link is underlined and on hover it has no underline.
 * - Link can be used as a stand-alone component with right chevron icon.
 */
export const Link: FC<LinkProps> = ({
  size = 'regular',
  Icon,
  iconAriaLabel,
  href,
  rel = 'noopener noreferrer',
  target = '_blank',
  className,
  children,
}) => (
  <a className={cn(styles[size], className)} href={href} rel={rel} target={target}>
    {Icon ? (
      <>
        {children}
        <Icon aria-label={iconAriaLabel} className={styles.icon} />
      </>
    ) : (
      children
    )}
  </a>
)
