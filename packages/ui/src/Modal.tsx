import React, { FC, ReactNode } from 'react'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'
import { X } from 'react-feather'

import { IconButton } from './IconButton'

import styles from './Modal.module.scss'
import { Button, ButtonProps } from './Button'
import { IconProps } from './Icon'

export type ModalActionCorePropsPresent = {
  // Note: Source of `onClick` is nullable property from ButtonHTMLAttributes<HTMLButtonElement>
  onAction: NonNullable<ButtonProps['onClick']>
  actionKind?: ButtonProps['kind']
  actionLabel: string
}

export type ModalActionCorePropsNever = {
  onAction?: never
  actionKind?: never
  actionLabel?: never
}

// Pick + rename
// We could potentially create a mapped type for this, but I don't think that adds clarity
// I don't think we need autoFocus or type
// autoFocus does not make sense due to modal nature, the modal is gonna be autoFocused
// type does not make sense, as it'll always be type=button
// className may be added later on. Should not be needed though
export type ModalActionCoreProps = ModalActionCorePropsPresent | ModalActionCorePropsNever

export type ModalActionProps = ModalActionCoreProps

export type ModalProps = {
  closable?: boolean
  children?: ReactNode
  title: string
  onClose?: ReactModalProps['onRequestClose']
} & DataTestProp &
  ModalActionProps &
  Exclude<ReactModalProps, 'onRequestClose' | 'shouldFocusAfterRender' | 'shouldReturnFocusAfterClose'>

/*
 * Action button is optional
 * [x] We need to reflect it in the props
 * The icon is also optional
 * [ ] We need to reflect it in the props
 */
export const Modal: FC<ModalProps> = ({
  'data-test': dataTest,
  children,
  className,
  closable = true,
  onClose,
  overlayClassName,
  title,
  ...restWithActionButton
}) => {
  // const actionKind = undefined
  //const actionLabel = 'Label'
  // const onAction = () => { }

  const { actionKind, actionLabel, onAction, ...rest } = restWithActionButton

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
      shouldReturnFocusAfterClose
      {...rest}
    >
      <div className={styles.outline} />
      <div className={styles.container}>
        <div data-test="modal-header" className={styles.header}>
          <div data-test="modal-title" className={styles.title}>
            {title}
          </div>
          {onClose && (
            <div className={styles.close}>
              {/* TODO: Get color */}
              <IconButton
                data-test="modal-button-close"
                kind="transparent"
                size="small"
                ariaLabel="Close icon"
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
            {onAction && actionLabel && (
              <Button data-test="modal-button-action" kind={actionKind} onClick={onAction} type="button">
                {actionLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </ReactModal>
  )
}
