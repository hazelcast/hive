import React, { FC, ReactNode } from 'react'
import ReactModal, { Props as ReactModalProps } from 'react-modal'
import cn from 'classnames'
import { DataTestProp } from '@hazelcast/helpers'
import { X } from 'react-feather'

import { IconButton } from './IconButton'

import styles from './Modal.module.scss'
import { Button, ButtonProps, ButtonDisabledProps, ButtonAccessibleIconLeftProps } from './Button'

/*
 * What we do here, is pull the properties from Button and rename them. Unfortunately, we have to pull
 * both part of the union separately, as picking the result discriminates the type and breaks the constrains of A | B.
 *
 * When Storybook supports tsc@4.1, this can be replaced with:
 * type MapObjectUnion<T> = T extends Record<string, unknown> ? ModalActionMappedProps<T> : T
 * type ModalActionMappedProps<T> = { [U in keyof T as `action${Capitalize<U>}`]: T[U] }
 */
type ModalActionDisabledProps =
  | {
      actionDisabledTooltip: ButtonDisabledProps['disabledTooltip']
      actionDisabled: ButtonDisabledProps['disabled']
    }
  | {
      actionDisabledTooltip?: never
      actionDisabled?: never
    }

type ModalActionIconProps =
  | {
      actionIconLeft: ButtonAccessibleIconLeftProps['iconLeft']
      actionIconLeftAriaLabel: ButtonAccessibleIconLeftProps['iconLeftAriaLabel']
    }
  | {
      actionIconLeft?: never
      actionIconLeftAriaLabel?: never
    }

type ModalActionCoreProps =
  | {
      // Note: Source of `onClick` is nullable property from ButtonHTMLAttributes<HTMLButtonElement>
      onAction: NonNullable<ButtonProps['onClick']>
      actionLabel: string
    }
  | { onAction?: never; actionLabel?: never }

export type ModalActionProps = ModalActionCoreProps & {
  actionKind?: ButtonProps['kind']
} & ModalActionDisabledProps &
  ModalActionIconProps

export type ModalProps = {
  closable?: boolean
  children?: ReactNode
  title: string
  onClose?: ReactModalProps['onRequestClose']
  footerClassName?: string
} & DataTestProp &
  ModalActionProps &
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
  children,
  className,
  footerClassName,
  closable = true,
  onClose,
  overlayClassName,
  title,
  ...restWithActionButton
}) => {
  const {
    actionKind,
    actionLabel,
    // Disabled
    actionDisabled = false,
    actionDisabledTooltip,
    // Icon
    actionIconLeft,
    actionIconLeftAriaLabel,
    // Rest
    onAction,
    ...rest
  } = restWithActionButton

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
        <div data-test="modal-content">{children}</div>
        {(onClose || onAction) && (
          <div data-test="modal-footer" className={cn(styles.footer, footerClassName)}>
            {onClose && (
              <Button data-test="modal-button-cancel" kind="secondary" onClick={onClose}>
                Cancel
              </Button>
            )}
            {onAction && actionLabel && (
              <Button
                data-test="modal-button-action"
                kind={actionKind}
                onClick={onAction}
                type="button"
                {...(actionDisabled &&
                  actionDisabledTooltip && {
                    disabled: actionDisabled,
                    disabledTooltip: actionDisabledTooltip,
                  })}
                {...(actionIconLeft &&
                  actionIconLeftAriaLabel && {
                    iconLeft: actionIconLeft,
                    iconLeftAriaLabel: actionIconLeftAriaLabel,
                  })}
              >
                {actionLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </ReactModal>
  )
}
