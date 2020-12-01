import React, { FC, ReactNode } from 'react'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'

import styles from './Modal.module.scss'

// TODO: a11y
export type ModalProps = {
  children: ReactNode
  closable?: boolean
  onClose: ReactModalProps['onRequestClose']
  onSubmit?: () => void
  title: string
} & DataTestProp &
  Exclude<ReactModalProps, 'onRequestClose' | 'shouldFocusAfterRender'>

export const Modal: FC<ModalProps> = ({
  className,
  closable = true,
  children,
  onClose,
  overlayClassName,
  'data-test': dataTest,
  title,
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
      <div>{children}</div>
    </ReactModal>
  )
}
