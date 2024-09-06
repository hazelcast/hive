import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef, MouseEventHandler, MutableRefObject, ReactNode } from 'react'
import { Icon as FeatherIcon } from 'react-feather'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import { Icon } from './Icon'

import styles from './Link.module.scss'

const sizes = {
  normal: styles.normal,
  small: styles.small,
  inherit: styles.inherit,
}

type AnchorAttributes = AnchorHTMLAttributes<HTMLAnchorElement>

type IconProps =
  | {
      icon: FeatherIcon
      ariaLabel: string
      iconClassName?: string
    }
  | {
      icon?: never
      ariaLabel?: never
      iconClassName?: never
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
  kind?: 'primary' | 'secondary' | 'contrast'
  children: ReactNode
  bold?: boolean
  // it's also required by next.js for <a> https://nextjs.org/docs/api-reference/next/link
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
} & Pick<AnchorAttributes, 'className'> &
  DataTestProp &
  (
    | {
        component: 'button'
        href?: never
        target?: never
        rel?: never
        type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
      }
    | {
        component?: 'a'
        href: string
        target?: LinkTarget
        rel?: LinkRel | LinkRel[]
        type?: never
      }
  )

/**
 * ### Purpose
 * Makes text in paragraphs actionable. Sometimes you want text that is actionable but not as attention-grabbing as a button. Maybe it sits inside a paragraph of text.
 * Text links let you add actions in the form of text that fits with its surroundings. Users can see they can take an action, but their focus is not drawn much from your main flow.
 *
 * ### General Info
 * - There are 2 kinds (colors) of Link available - primary (default) and secondary.
 * - There are 3 sizes of Link available - normal (default), small and inherit.
 * - The default state of all types of link is underlined and on hover it has no underline.
 * - Link can be used as a stand-alone component with right chevron icon.
 * - You can change underlying semantics with a component property. Typescript will guard you on providing other properties related to the component type.
 */
export const Link = forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(
  (
    {
      component = 'a',
      kind = 'primary',
      size = 'normal',
      bold = false,
      icon,
      ariaLabel,
      iconClassName,
      href,
      rel = 'noopener',
      target = '_self',
      type = 'button',
      onClick,
      className,
      children,
      'data-test': dataTest = 'link',
    },
    ref,
  ) => {
    const relFinal = Array.isArray(rel) ? rel.join(' ') : rel

    const commonProps = {
      className: cn(
        styles.link,
        styles[size],
        {
          // kind
          [styles.primary]: kind === 'primary',
          [styles.secondary]: kind === 'secondary',
          [styles.contrast]: kind === 'contrast',
          // bold
          [styles.bold]: bold,
        },
        className,
      ),
      href: href,
      onClick: onClick,
    }

    const iconComponent =
      icon && ariaLabel ? (
        <Icon bold={bold} icon={icon} ariaLabel={ariaLabel} size={size === 'normal' ? 'medium' : 'small'} className={iconClassName} />
      ) : undefined

    return component === 'a' ? (
      <a {...commonProps} rel={relFinal} target={target} ref={ref as MutableRefObject<HTMLAnchorElement>} data-test={dataTest}>
        {children}
        {iconComponent}
      </a>
    ) : (
      <button {...commonProps} type={type} ref={ref as MutableRefObject<HTMLButtonElement>} data-test={dataTest}>
        {children}
        {iconComponent}
      </button>
    )
  },
)
Link.displayName = 'Link'
