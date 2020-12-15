import React, { AnchorHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react'
import { Icon as FeatherIcon } from 'react-feather'
import cn from 'classnames'
import { Icon } from './Icon'
import styles from './Link.module.scss'

export type LinkKind = 'primary' | 'secondary'

const sizes = {
  normal: styles.normal,
  small: styles.small,
}

type AnchorAttributes = AnchorHTMLAttributes<HTMLAnchorElement>

type IconProps =
  | {
      icon: FeatherIcon
      ariaLabel: string
    }
  | {
      icon?: never
      ariaLabel?: never
    }

export type LinkTarget = '_self' | '_blank' | '_parent' | '_top'

// https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types
export type LinkRel =
  | 'alternate'
  | 'author'
  | 'bookmark'
  | 'dns-prefetch'
  | 'external'
  | 'help'
  | 'license'
  | 'next'
  | 'nofollow'
  | 'noopener'
  | 'noreferrer'
  | 'opener'
  | 'prev'
  | 'search'
  | 'tag'

export type LinkProps = IconProps & {
  size?: keyof typeof sizes
  kind?: 'primary' | 'secondary'
  children: ReactNode
  // it's also required by next.js for <a> https://nextjs.org/docs/api-reference/next/link
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
} & Pick<AnchorAttributes, 'className'> &
  (
    | {
        component: 'button'
        href?: never
        target?: never
        rel?: never
      }
    | {
        component?: 'a'
        href: string
        target?: LinkTarget
        rel?: LinkRel | LinkRel[]
      }
  )

/**
 * ### Purpose
 * Makes text in paragraphs actionable. Sometimes you want text that is actionable but not as attention-grabbing as a button. Maybe it sits inside a paragraph of text.
 * Text links let you add actions in the form of text that fits with its surroundings. Users can see they can take an action, but their focus is not drawn much from your main flow.
 *
 * ### General Info
 * - There are 2 kinds (colors) of Link available - primary (default) and secondary.
 * - There are 2 sizes of Link available - normal (default) and small.
 * - The default state of all types of link is underlined and on hover it has no underline.
 * - Link can be used as a stand-alone component with right chevron icon.
 * - You can change underlying semantics with a component property. Typescript will guard you on providing other properties related to the component type.
 */
export const Link: FC<LinkProps> = ({
  component: Component = 'a',
  kind = 'primary',
  size = 'normal',
  icon,
  ariaLabel,
  href,
  rel = 'noopener',
  target = '_self',
  onClick,
  className,
  children,
}) => {
  const relFinal = Array.isArray(rel) ? rel.join(' ') : rel

  return (
    <Component
      className={cn(
        styles[size],
        {
          [styles.primary]: kind === 'primary',
          [styles.secondary]: kind === 'secondary',
        },
        className,
      )}
      href={href}
      rel={Component === 'a' ? relFinal : undefined}
      target={Component === 'a' ? target : undefined}
      onClick={onClick}
    >
      {children}
      {icon && ariaLabel && <Icon icon={icon} ariaLabel={ariaLabel} size={size} />}
    </Component>
  )
}
