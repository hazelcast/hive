import React, { FC, ReactNode, useMemo, AnchorHTMLAttributes } from 'react'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import cn from 'classnames'
import { X, ExternalLink } from 'react-feather'

import { DataTestProp } from '../helpers/types'
import { Button, ButtonProps, ButtonTypeButtonProps } from './Button'
import { Icon, IconProps } from './Icon'

import styles from './Modal.module.css'

// Direct re-exporting is breaking tests in MC
// TODO: Investigate why
export const setAppElement = (appElement: string | HTMLElement) => ReactModal.setAppElement(appElement)

export type ModalActionProps = ButtonProps<ButtonTypeButtonProps>

export type ModalIntent = 'action' | 'confirm' | 'info' | 'danger' | 'success'

export type ModalHelperLinkProps = {
  label: ReactNode
  href: string
  ariaLabel?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel']
}

export type ModalProps = {
  actions?: ModalActionProps[]
  hideActions?: boolean
  autoFocus?: boolean
  children?: ReactNode
  closable?: boolean
  showCloseButton?: boolean
  bodyClassName?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
  overlayClassName?: string
  className?: string
  icon?: IconProps['icon']
  iconAriaLabel?: IconProps['ariaLabel']
  onClose: ReactModalProps['onRequestClose']
  title: string
  description?: ReactNode
  eyebrow?: ReactNode
  intent?: ModalIntent
  helperLink?: ModalHelperLinkProps
} & DataTestProp &
  Exclude<ReactModalProps, 'onRequestClose' | 'shouldFocusAfterRender' | 'shouldReturnFocusAfterClose'>

const intentClass: Record<ModalIntent, string | undefined> = {
  action: undefined,
  confirm: styles.intentConfirm,
  info: styles.intentInfo,
  danger: styles.intentDanger,
  success: styles.intentSuccess,
}

/*
 * ### Purpose
 * Modal surfaces a focused, secondary user-story on top of the current page. Use it for
 * confirmations, short forms, or any flow that should pause the underlying page.
 *
 * ### General Info
 * - Always contains a title, an "X" close button, content and action buttons in the footer.
 * - Optional `eyebrow`, `description`, `icon` and `intent` define the redesigned HIVE 4.0 header.
 * - Optional `helperLink` renders a docs/help link in the footer.
 * - Underlying page is blocked by an overlay; click overlay, press Esc, or click Cancel to close.
 */
export const Modal: FC<ModalProps> = ({
  'data-test': dataTest = 'modal',
  actions,
  hideActions = false,
  autoFocus = true,
  children,
  className,
  closable = true,
  showCloseButton = true,
  bodyClassName,
  headerClassName,
  contentClassName,
  footerClassName,
  icon,
  iconAriaLabel,
  onClose,
  overlayClassName,
  title,
  description,
  eyebrow,
  intent = 'action',
  helperLink,
  ...rest
}) => {
  const shouldAutoFocusCancelButton = useMemo(() => autoFocus && !actions?.some((action) => action?.autoFocus), [autoFocus, actions])

  const hasFooter = !hideActions || !!helperLink
  const hasIcon = !!(icon && iconAriaLabel)
  const hasBody = children !== undefined && children !== null && children !== false

  return (
    <ReactModal
      portalClassName={styles.portal}
      className={cn(styles.modal, intent !== 'action' && intentClass[intent], className)}
      contentLabel={title}
      onRequestClose={onClose}
      overlayClassName={cn(styles.overlay, overlayClassName)}
      shouldCloseOnEsc={closable}
      shouldCloseOnOverlayClick={closable}
      shouldFocusAfterRender={false}
      shouldReturnFocusAfterClose
      {...rest}
    >
      <div data-test="modal-header" className={cn(styles.header, headerClassName)}>
        <div className={styles.headerRow}>
          {hasIcon && (
            <div className={styles.iconBox}>
              <Icon data-test="modal-header-icon" icon={icon} ariaLabel={iconAriaLabel} />
            </div>
          )}
          <div className={styles.headerText}>
            {eyebrow && (
              <p data-test="modal-header-eyebrow" className={styles.eyebrow}>
                {eyebrow}
              </p>
            )}
            <h3 data-test="modal-header-title" className={styles.title}>
              {title}
            </h3>
            {description && (
              <p data-test="modal-header-description" className={styles.description}>
                {description}
              </p>
            )}
          </div>
        </div>
        {closable && showCloseButton && (
          <button
            type="button"
            data-test={`${dataTest}-button-close`}
            className={styles.close}
            aria-label="Close icon"
            onClick={(e) => onClose?.(e)}
          >
            <X size={16} aria-hidden />
          </button>
        )}
      </div>
      {hasBody && (
        <div data-test="modal-content" className={cn(styles.body, bodyClassName, contentClassName)}>
          {children}
        </div>
      )}
      {hasFooter && (
        <div data-test="modal-footer" className={cn(styles.footer, footerClassName)}>
          {helperLink && (
            <a
              data-test="modal-helper-link"
              className={styles.helperLink}
              href={helperLink.href}
              target={helperLink.target ?? '_blank'}
              rel={helperLink.rel ?? 'noopener noreferrer'}
              aria-label={helperLink.ariaLabel}
            >
              {helperLink.label}
              <ExternalLink size={12} aria-hidden />
            </a>
          )}
          {!hideActions && (
            <div className={styles.footerActions}>
              <Button
                autoFocus={shouldAutoFocusCancelButton}
                data-test="modal-button-cancel"
                variant="ghost"
                color="secondary"
                size="small"
                onClick={(e) => onClose?.(e)}
              >
                Cancel
              </Button>
              {actions?.map(({ children: actionChildren, size = 'small', ...actionPropsRest }, key) => (
                <Button key={key} data-test="modal-button-action" size={size} {...actionPropsRest}>
                  {actionChildren}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </ReactModal>
  )
}
