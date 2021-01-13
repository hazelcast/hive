import React, { FC, ReactNode, useMemo } from 'react'
import { Modal, ModalProps, ModalActionProps } from './Modal'

import styles from './Dialog.module.scss'

export const DIALOG_AFFIRMATION_DEFAULT = 'Are you sure you wish to proceed?'

type DialogActionProps =
  | {
      actionOnConfirm: ModalActionProps['onClick']
      actionChildren: ModalActionProps['children']
      actionDangerous?: boolean
      actionDisabled?: ModalActionProps['disabled']
      actionDisabledTooltip?: ModalActionProps['disabledTooltip']
    }
  | {
      actionDangerous?: never
      actionDisabled?: never
      actionDisabledTooltip?: never
      actionOnConfirm?: never
      actionChildren?: never
    }

export type DialogProps = {
  children?: ReactNode
  modalClassName?: string
  affirmation?: ReactNode
  consequences?: ReactNode
} & DialogActionProps &
  Pick<ModalProps, 'isOpen' | 'title' | 'onClose' | 'parentSelector'>

/*
 * ### Purpose
 * Occasionally there's a user-story that's not a part of the main user flow. Such action can be contained in a Dialog.
 * Dialogs are used to drive simple actions such as a mere confirmation. In case there is a more complex action (e.g larger form, table etc.) use Modal.
 *
 * ### General Info
 * - Dialog is a specification of Modal to fit a particular use-case of confirming an action
 * - Use affirmation` and `consequences` props to set the content of the Dialog.
 */
export const Dialog: FC<DialogProps> = ({
  modalClassName,
  isOpen,
  title,
  onClose,
  consequences,
  affirmation = DIALOG_AFFIRMATION_DEFAULT,
  parentSelector,
  actionChildren,
  actionDangerous,
  actionDisabled,
  actionDisabledTooltip,
  actionOnConfirm,
}) => {
  const actions: ModalProps['actions'] = useMemo(
    () =>
      actionChildren && actionOnConfirm
        ? [
            {
              autoFocus: !actionDangerous,
              kind: actionDangerous ? 'danger' : 'primary',
              ...(actionDisabled &&
                actionDisabledTooltip && {
                  disabled: actionDisabled,
                  disabledTooltip: actionDisabledTooltip,
                }),
              onClick: actionOnConfirm,
              children: actionChildren,
            },
          ]
        : [],
    [actionDangerous, actionDisabled, actionDisabledTooltip, actionOnConfirm, actionChildren],
  )

  return (
    <Modal
      className={modalClassName}
      footerClassName={styles.modalFooter}
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      parentSelector={parentSelector}
      actions={actions}
    >
      <div className={styles.content}>
        <div data-test="dialog-affirmation">{affirmation}</div>
        {consequences && (
          <div data-test="dialog-consequences" className={styles.consequences}>
            {consequences}
          </div>
        )}
      </div>
    </Modal>
  )
}
