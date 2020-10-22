import React, { AnchorHTMLAttributes, useRef, FC, ReactNode } from 'react'
import { ChevronRight } from 'react-feather'
import cn from 'classnames'
import { PartialRequired } from '@hazelcast/helpers'
import { v4 as uuid } from 'uuid'

import { Tooltip } from './Tooltip'
import { Icon } from './Icon'

import styles from './Link.module.scss'

const linkTypes = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
  tooltip: styles.tooltip,
}

type AnchorAttributes = AnchorHTMLAttributes<HTMLAnchorElement>

type LinkProps = (
  | {
      type: 'primary' | 'secondary' | 'tertiary'
      tooltip?: never
      standalone?: boolean
    }
  | {
      type: 'tooltip'
      tooltip: ReactNode
      standalone?: never
    }
) &
  PartialRequired<AnchorAttributes, 'href'> &
  Pick<AnchorAttributes, 'target' | 'rel' | 'className'> & {
    children: ReactNode
  }

/**
 * ### Purpose
 * Makes text in paragraphs actionable. Sometimes you want text that is actionable but not as attention-grabbing as a button. Maybe it sits inside a paragraph of text.
 * Text links let you add actions in the form of text that fits with its surroundings. Users can see they can take an action, but their focus is not drawn much from your main flow.
 *
 * ### General Info
 * - Use 4 types of Link: Primary, Secondary, Tertiary and Tooltip.
 * - If you use Link in Tooltip, color of the link is inherited from the tooltip text.
 * - The default state of all types of link is underlined and on hover it has no underline.
 * - Link inherits font size of the parent paragraph.
 */
export const Link: FC<LinkProps> = ({
  type,
  tooltip,
  standalone = false,
  href,
  rel = 'noopener noreferrer',
  target = '_blank',
  className,
  children,
}) => {
  const idRef = useRef(`${uuid()}-link`)

  return (
    <Tooltip placement="top" overlay={tooltip} id={idRef.current}>
      <a
        className={cn(linkTypes[type], className)}
        href={href}
        rel={rel}
        target={target}
        aria-describedby={tooltip ? idRef.current : undefined}
      >
        {standalone ? (
          <span className={styles.chevron}>
            {children}
            <Icon ariaLabel="Link" icon={ChevronRight} />
          </span>
        ) : (
          children
        )}
      </a>
    </Tooltip>
  )
}
