import React, { ComponentType, ReactNode, useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import cn from 'classnames'
import { Icon as FeatherIcon, Menu, X } from 'react-feather'

import { AppSidebarProps } from '../AppSidebar'
import { AppSidebarWithStorageNamespace } from '../AppSidebar/AppSidebar'
import { appSidebarContext } from '../AppSidebar/appSidebarContext'
import { IconButton } from '../IconButton'
import { Tooltip } from '../Tooltip'
import styles from './SideNavigation.module.css'

export interface SideNavigationProps extends Omit<AppSidebarProps, 'variant' | 'hideToggle'> {
  ariaLabel: string
  id?: string
  mobile?: boolean
  mobileOpen?: boolean
  initialMobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
  showMobileTrigger?: boolean
  mobileDialogClassName?: string
  namespaceStorage?: boolean
}

export const SideNavigation = ({
  ariaLabel,
  id,
  mobile = false,
  mobileOpen: controlledMobileOpen,
  initialMobileOpen = false,
  onMobileOpenChange,
  showMobileTrigger = true,
  mobileDialogClassName,
  children,
  ...sidebarProps
}: SideNavigationProps) => {
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = useState(initialMobileOpen)
  const generatedId = useId()
  const navigationId = id ?? generatedId
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousMobile = useRef(mobile)
  const mobileOpen = controlledMobileOpen ?? uncontrolledMobileOpen
  const setMobileOpen = useCallback(
    (value: boolean) => {
      if (controlledMobileOpen === undefined) setUncontrolledMobileOpen(value)
      onMobileOpenChange?.(value)
    },
    [controlledMobileOpen, onMobileOpenChange],
  )
  useEffect(() => {
    if (previousMobile.current && !mobile && mobileOpen) setMobileOpen(false)
    previousMobile.current = mobile
  }, [mobile, mobileOpen, setMobileOpen])
  const content = (
    <nav id={mobile ? undefined : navigationId} aria-label={ariaLabel} className={styles.navigation}>
      {children}
    </nav>
  )

  if (!mobile)
    return (
      <AppSidebarWithStorageNamespace {...sidebarProps} variant="modern">
        {content}
      </AppSidebarWithStorageNamespace>
    )

  return (
    <>
      {showMobileTrigger && (
        <IconButton
          variant="ghost"
          icon={Menu}
          ariaLabel={`Open ${ariaLabel}`}
          onClick={() => setMobileOpen(true)}
          {...{ 'aria-controls': navigationId, 'aria-expanded': mobileOpen }}
        />
      )}
      <Dialog
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        initialFocus={closeRef}
        className={cn(styles.dialog, mobileDialogClassName)}
        aria-label={ariaLabel}
        unmount={false}
      >
        <DialogBackdrop transition className={styles.backdrop} />
        <DialogPanel transition id={navigationId} className={styles.panel}>
          <AppSidebarWithStorageNamespace
            {...sidebarProps}
            className={cn(styles.mobileSidebar, sidebarProps.className)}
            variant="modern"
            open
            hideToggle
          >
            <div className={styles.mobileHeader}>
              <button
                ref={closeRef}
                type="button"
                className={styles.close}
                aria-label={`Close ${ariaLabel}`}
                onClick={() => setMobileOpen(false)}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            {content}
          </AppSidebarWithStorageNamespace>
        </DialogPanel>
      </Dialog>
    </>
  )
}

export interface SideNavigationSectionProps {
  label?: ReactNode
  ariaLabel?: string
  children: ReactNode
}

export const SideNavigationSection = ({ label, ariaLabel, children }: SideNavigationSectionProps) => {
  const { isOpen } = useContext(appSidebarContext)
  return (
    <section aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined)} className={styles.section}>
      {label != null && isOpen && <h2 className={styles.sectionLabel}>{label}</h2>}
      {children}
    </section>
  )
}

export interface SideNavigationItemProps {
  label: ReactNode
  ariaLabel?: string
  icon?: FeatherIcon
  badge?: ReactNode
  active?: boolean
  color?: 'default' | 'danger'
  disabled?: boolean
  disabledTooltip?: ReactNode
  visible?: boolean
  href?: string
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel']
  as?: ComponentType<SideNavigationLinkProps>
  onClick?: () => void
  className?: string
}

export interface SideNavigationLinkProps {
  href?: string
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel']
  className: string
  'aria-current'?: 'page'
  'aria-label'?: string
  onClick?: () => void
  title?: string
  children: ReactNode
}

export const SideNavigationItem = ({
  label,
  ariaLabel,
  icon: ItemIcon,
  badge,
  active,
  color = 'default',
  disabled,
  disabledTooltip,
  visible = true,
  href,
  target,
  rel,
  as,
  onClick,
  className,
}: SideNavigationItemProps) => {
  const { isOpen } = useContext(appSidebarContext)
  if (!visible) return null
  const textLabel = ariaLabel ?? (typeof label === 'string' ? label : undefined)
  const content = (
    <>
      {ItemIcon && <ItemIcon className={styles.icon} aria-hidden="true" />}
      <span className={styles.label}>{label}</span>
      {badge != null && <span className={styles.badge}>{badge}</span>}
    </>
  )
  const itemClassName = cn(
    styles.item,
    {
      [styles.active]: active,
      [styles.colorDanger]: color === 'danger',
      [styles.disabled]: disabled,
      [styles.collapsed]: !isOpen,
      [styles.hasIcon]: !!ItemIcon,
    },
    className,
  )
  if (disabled) {
    const item = (
      <span
        className={itemClassName}
        aria-disabled={true}
        aria-label={textLabel}
        title={!isOpen && disabledTooltip == null ? textLabel : undefined}
      >
        {content}
      </span>
    )
    return disabledTooltip == null ? (
      item
    ) : (
      <div className={styles.disabledItem}>
        <Tooltip content={disabledTooltip} side="right">
          {item}
        </Tooltip>
      </div>
    )
  }
  if (href || as) {
    const Link = as || 'a'
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={itemClassName}
        aria-current={active ? 'page' : undefined}
        aria-label={ariaLabel}
        onClick={onClick}
        title={!isOpen ? textLabel : undefined}
      >
        {content}
      </Link>
    )
  }
  return (
    <button
      type="button"
      className={itemClassName}
      aria-current={active ? 'page' : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      title={!isOpen ? textLabel : undefined}
    >
      {content}
    </button>
  )
}
