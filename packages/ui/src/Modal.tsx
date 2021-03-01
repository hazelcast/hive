import React, { FC, ReactNode, useMemo } from 'react'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'
import { X } from 'react-feather'

import { Button, ButtonProps, ButtonTypeButtonProps } from './Button'
import { Icon, IconProps } from './Icon'
import { IconButton } from './IconButton'

import styles from './Modal.module.scss'

// Direct re-exporting is breaking tests in MC
// TODO: Investigate why
export const setAppElement = (appElement: string | HTMLElement) => ReactModal.setAppElement(appElement)

export type ModalActionProps = ButtonProps<ButtonTypeButtonProps>

export type ModalProps = {
  actions?: ModalActionProps[]
  // Useful when dealing with e.g. forms in the Modal
  hideActions?: boolean
  // Note: Turns of default autoFocus biding to Cancel/Action buttons. Set to "false" when a content element should be auto focused.
  autoFocus?: boolean
  children?: ReactNode
  closable?: boolean
  bodyClassName?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
  icon?: IconProps['icon']
  iconAriaLabel?: IconProps['ariaLabel']
  onClose: ReactModalProps['onRequestClose']
  title: string
} & DataTestProp &
  Exclude<ReactModalProps, 'onRequestClose' | 'shouldFocusAfterRender' | 'shouldReturnFocusAfterClose'>

/*
 * ### Purpose
 * Occasionally there's a user-story that's not a part of the main user flow. Such action can be contained in a Modal.
 * Modals can contain components like forms, menus, tables etc.
 * Usually modals are used to drive a complex action. In case there is a simple action (e.g. confirmation), consider using a Dialog.
 *
 * ### General Info
 * - Modal always contains a title, icon "X" in the header, content and active buttons in the footer.
 * - No interactions on the underlying page can be performed while a Modal.
 * - Content beneath the modal is covered by a "blanket".
 * - To close the Modal, use "Cancel" button in the footer, "X" button in the header, press "Esc" key or click anywhere on the "blanket".
 */
export const Modal: FC<ModalProps> = ({
  'data-test': dataTest,
  actions,
  hideActions = false,
  autoFocus = true,
  children,
  className,
  closable = true,
  bodyClassName,
  headerClassName,
  contentClassName,
  footerClassName,
  icon,
  iconAriaLabel,
  onClose,
  overlayClassName,
  title,
  ...rest
}) => {
  const shouldAutoFocusCancelButton = useMemo(() => autoFocus && !actions?.some((action) => action?.autoFocus), [autoFocus, actions])

  return (
    <ReactModal
      portalClassName={styles.portal}
      className={cn(styles.modal, className)}
      contentLabel={title}
      data-test={dataTest}
      onRequestClose={onClose}
      overlayClassName={cn(styles.overlay, overlayClassName)}
      shouldCloseOnEsc={closable}
      shouldCloseOnOverlayClick={closable}
      shouldFocusAfterRender={false}
      shouldReturnFocusAfterClose
      {...rest}
    >
      <div className={styles.outline} />
      <div className={cn(styles.body, bodyClassName)}>
        <div data-test="modal-header" className={cn(styles.header, headerClassName)}>
          {icon && iconAriaLabel && <Icon data-test="modal-header-icon" className={styles.icon} icon={icon} ariaLabel={iconAriaLabel} />}
          <h3 data-test="modal-header-title" className={styles.title}>
            {title}
          </h3>
          {closable && (
            // Note: Dialog use-case. "Not closable" modal can only be closed via "Cancel" button.
            <div className={styles.close}>
              <IconButton data-test="modal-button-close" kind="transparent" ariaLabel="Close icon" icon={X} onClick={onClose} />
            </div>
          )}
        </div>
        <div data-test="modal-content" className={cn(styles.content, contentClassName)}>
          {children}
        </div>
        {!hideActions && (
          <div data-test="modal-footer" className={cn(styles.footer, footerClassName)}>
            {actions?.map(({ children, ...actionPropsRest }, key) => (
              <Button key={key} data-test="modal-button-action" {...actionPropsRest}>
                {children}
              </Button>
            ))}
            <Button autoFocus={shouldAutoFocusCancelButton} data-test="modal-button-cancel" kind="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </ReactModal>
  )
}
