import React, { FC, ReactNode } from 'react'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'
import { X } from 'react-feather'

import { IconButton } from './IconButton'

import styles from './Modal.module.scss'
import { Button } from './Button'

type ActionType =
  | {
      action: string
      onAction: () => void
    }
  | {
      action?: never
      onAction?: never
    }

export type ModalProps = {
  closable?: boolean
  children: ReactNode
  title: string
  onClose?: ReactModalProps['onRequestClose']
} & DataTestProp &
  ActionType &
  Exclude<ReactModalProps, 'onRequestClose' | 'shouldFocusAfterRender' | 'shouldReturnFocusAfterClose'>

export const Modal: FC<ModalProps> = ({
  action,
  className,
  closable = true,
  children,
  onClose,
  overlayClassName,
  'data-test': dataTest,
  title,
  onAction,
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
        <div data-test="modal-title" className={styles.title}>
          {title}
        </div>
        {closable && (
          <div className={styles.close}>
            {/* TODO: Get color */}
            <IconButton
              data-test="modal-button-close"
              kind="transparent"
              size="small"
              iconAriaLabel="Close icon"
              icon={X}
              onClick={onClose}
            />
          </div>
        )}
      </div>
      <div data-test="modal-content" className={styles.content}>
        {children}
      </div>
      {(onClose || onAction) && (
        <div data-test="modal-footer" className={styles.footer}>
          {onClose && (
            <Button data-test="modal-button-cancel" kind="secondary" onClick={onClose}>
              Cancel
            </Button>
          )}
          {onAction && action && (
            <Button data-test="modal-button-action" onClick={onAction}>
              {action}
            </Button>
          )}
        </div>
      )}
    </div>
  </ReactModal>
)
