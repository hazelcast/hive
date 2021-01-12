import React, { FC, ReactNode } from 'react'
import ReactModal, { Props as ReactModalProps, setAppElement as setAppElementRM } from 'react-modal'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'
import { X } from 'react-feather'

import { IconButton } from './IconButton'

import styles from './Modal.module.scss'
import { Button, ButtonProps } from './Button'

export const setAppElement = setAppElementRM

export type ModalActionProps = ButtonProps

export type ModalProps = {
  closable?: boolean
  children?: ReactNode
  title: string
  onClose: ReactModalProps['onRequestClose']
  footerClassName?: string
  actions?: ModalActionProps[]
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
  actions,
  'data-test': dataTest,
  children,
  className,
  footerClassName,
  closable = true,
  onClose,
  overlayClassName,
  title,
  ...rest
}) => (
  <ReactModal
    contentLabel={title}
    className={cn(styles.modal, className)}
    overlayClassName={cn(styles.overlay, overlayClassName)}
    data-test={dataTest}
    onRequestClose={onClose}
    shouldCloseOnEsc={closable}
    shouldCloseOnOverlayClick={closable}
    shouldFocusAfterRender
    shouldReturnFocusAfterClose
    {...rest}
  >
    <div className={styles.outline} />
    <div className={styles.container}>
      <div data-test="modal-header" className={styles.header}>
        <h3 data-test="modal-title">{title}</h3>
        <div className={styles.close}>
          {/* TODO: Get color */}
          <IconButton data-test="modal-button-close" kind="transparent" size="small" ariaLabel="Close icon" icon={X} onClick={onClose} />
        </div>
      </div>
      <div data-test="modal-content">{children}</div>
      <div data-test="modal-footer" className={cn(styles.footer, footerClassName)}>
        <Button data-test="modal-button-cancel" kind="secondary" onClick={onClose}>
          Cancel
        </Button>
        {actions?.map(({ children, ...actionPropsRest }, key) => (
          <Button key={key} data-test="modal-button-action" {...actionPropsRest}>
            {children}
          </Button>
        ))}
      </div>
    </div>
  </ReactModal>
)
