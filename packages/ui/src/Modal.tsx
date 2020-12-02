import React, { FC, ReactNode } from 'react'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'
import { X } from 'react-feather'

import { IconButton } from './IconButton'

import styles from './Modal.module.scss'
import { Button } from './Button'

type ActionButtonType =
  | {
      action: string
      onAction: () => void
    }
  | {
      action?: never
      onAction?: never
    }

// TODO: a11y
export type ModalProps = {
  actionTitle: string
  children: ReactNode
  closable?: boolean
  onClose: ReactModalProps['onRequestClose']
  title: string
} & ActionButtonType &
  DataTestProp &
  Exclude<ReactModalProps, 'onRequestClose' | 'shouldFocusAfterRender'>

export const Modal: FC<ModalProps> = ({
  actionTitle,
  className,
  closable = true,
  children,
  onClose,
  overlayClassName,
  'data-test': dataTest,
  title,
  onAction,
  ...rest
}) => {
  return (
    <ReactModal
      contentLabel={title}
      className={cn(styles.modal, className)}
      overlayClassName={cn(styles.overlay, overlayClassName)}
      data-test={dataTest}
      onRequestClose={onClose}
      shouldCloseOnEsc={closable}
      shouldCloseOnOverlayClick={closable}
      shouldFocusAfterRender
      {...rest}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          {closable && (
            <div className={styles.close}>
              <IconButton data-test="modal-close" kind="transparent" iconAriaLabel="Close icon" icon={X} onClick={onClose} />
            </div>
          )}
        </div>
        <div className={styles.content}>{children}</div>
        {(closable || onAction) && (
          <div className={styles.footer}>
            {closable && <Button kind="secondary">Cancel</Button>}
            {onAction && <Button>{actionTitle}</Button>}
          </div>
        )}
      </div>
    </ReactModal>
  )
}
