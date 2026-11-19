import React, { ComponentType, ReactNode, useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import cn from 'classnames'
import { ChevronDown, ChevronUp, Icon as FeatherIcon, Menu, X } from 'react-feather'

import { AppSidebarProps, AppSidebarWithStorageNamespace } from '../AppSidebar/AppSidebar'
import { appSidebarContext } from '../AppSidebar/appSidebarContext'
import { IconButton } from '../IconButton'
import { Tooltip } from '../Tooltip'
import styles from './SideNavigation.module.css'

export interface SideNavigationClassNames {
  mobileTrigger?: string
  mobileBackdrop?: string
  mobilePanel?: string
  mobileCloseButton?: string
}

export interface SideNavigationProps extends Omit<AppSidebarProps, 'variant' | 'hideToggle'> {
  ariaLabel: string
  classNames?: SideNavigationClassNames
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
  classNames,
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
          className={classNames?.mobileTrigger}
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
        <DialogBackdrop transition className={cn(styles.backdrop, classNames?.mobileBackdrop)} />
        <DialogPanel transition id={navigationId} className={cn(styles.panel, classNames?.mobilePanel)}>
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
                className={cn(styles.close, classNames?.mobileCloseButton)}
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

export type SideNavigationExpandableSectionClassNames = Partial<Record<'root' | 'toggle' | 'content' | 'chevron', string>>

export interface SideNavigationExpandableSectionProps {
  label: ReactNode
  ariaLabel?: string
  icon?: FeatherIcon
  active?: boolean
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  classNames?: SideNavigationExpandableSectionClassNames
  children: ReactNode
  'data-test'?: string
}

export const SideNavigationExpandableSection = ({
  label,
  ariaLabel,
  icon,
  active,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onExpandedChange,
  classNames,
  children,
  'data-test': dataTest = 'side-navigation-expandable-section',
}: SideNavigationExpandableSectionProps) => {
  const { isOpen: sidebarOpen, open: openSidebar } = useContext(appSidebarContext)
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded)
  const expanded = controlledExpanded ?? uncontrolledExpanded
  const isExpanded = sidebarOpen && expanded
  const contentId = `side-navigation-section-content-${useId()}`
  const Chevron = isExpanded ? ChevronUp : ChevronDown

  const setExpanded = (value: boolean) => {
    if (controlledExpanded === undefined) setUncontrolledExpanded(value)
    onExpandedChange?.(value)
  }
  const toggle = () => {
    if (!sidebarOpen) {
      openSidebar()
      setExpanded(true)
      return
    }

    setExpanded(!expanded)
  }

  return (
    <section data-test={dataTest} className={cn(styles.section, classNames?.root)}>
      <SideNavigationItem
        label={label}
        ariaLabel={ariaLabel}
        icon={icon}
        active={active}
        className={classNames?.toggle}
        badge={<Chevron className={cn(styles.sectionChevron, classNames?.chevron)} aria-hidden="true" />}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={toggle}
      />
      <div
        id={contentId}
        hidden={!isExpanded}
        inert={!isExpanded}
        aria-hidden={!isExpanded}
        className={cn(styles.expandableContent, classNames?.content)}
      >
        {children}
      </div>
    </section>
  )
}

export interface SideNavigationItemProps {
  label: ReactNode
  ariaLabel?: string
  icon?: FeatherIcon
  badge?: ReactNode
  nested?: boolean
  leadingAction?: ReactNode
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
  'aria-expanded'?: boolean
  'aria-controls'?: string
  'data-test'?: string
}

export interface SideNavigationLinkProps {
  href?: string
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel']
  className: string
  'aria-current'?: 'page'
  'aria-label'?: string
  'aria-expanded'?: boolean
  'aria-controls'?: string
  'data-test'?: string
  onClick?: () => void
  title?: string
  children: ReactNode
}

export const SideNavigationItem = ({
  label,
  ariaLabel,
  icon: ItemIcon,
  badge,
  nested,
  leadingAction,
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
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  'data-test': dataTest,
}: SideNavigationItemProps) => {
  const { isOpen } = useContext(appSidebarContext)
  if (!visible) return null
  const showLeadingAction = isOpen && Boolean(leadingAction)
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
      [styles.indented]: isOpen && (nested || showLeadingAction),
    },
    className,
  )
  const renderRow = (item: ReactNode) =>
    showLeadingAction ? (
      <div className={styles.row}>
        {item}
        <div className={styles.leadingAction}>{leadingAction}</div>
      </div>
    ) : (
      item
    )
  if (disabled) {
    const item = (
      <span
        className={itemClassName}
        aria-disabled={true}
        aria-label={textLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        data-test={dataTest}
        title={!isOpen && disabledTooltip == null ? textLabel : undefined}
      >
        {content}
      </span>
    )
    return renderRow(
      disabledTooltip == null ? (
        item
      ) : (
        <div className={styles.disabledItem}>
          <Tooltip content={disabledTooltip} side="right">
            {item}
          </Tooltip>
        </div>
      ),
    )
  }
  if (href || as) {
    const Link = as || 'a'
    return renderRow(
      <Link
        href={href}
        target={target}
        rel={rel}
        className={itemClassName}
        aria-current={active ? 'page' : undefined}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        data-test={dataTest}
        onClick={onClick}
        title={!isOpen ? textLabel : undefined}
      >
        {content}
      </Link>,
    )
  }
  return renderRow(
    <button
      type="button"
      className={itemClassName}
      aria-current={active ? 'page' : undefined}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      data-test={dataTest}
      onClick={onClick}
      title={!isOpen ? textLabel : undefined}
    >
      {content}
    </button>,
  )
}
