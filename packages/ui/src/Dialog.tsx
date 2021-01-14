import React, { FC, ReactNode, useMemo } from 'react'
import cn from 'classnames'

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
  modalClassName?: string
  affirmation: string
  consequences: ReactNode
} & DialogActionProps &
  Pick<ModalProps, 'isOpen' | 'onClose' | 'parentSelector' | 'portalClassName'>

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
  consequences,
  affirmation = DIALOG_AFFIRMATION_DEFAULT,
  actionChildren,
  actionDangerous,
  actionDisabled,
  actionDisabledTooltip,
  actionOnConfirm,
  ...rest
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
      className={cn(styles.dialog, modalClassName)}
      headerClassName={styles.dialogHeader}
      bodyClassName={styles.dialogBody}
      contentClassName={styles.dialogContent}
      footerClassName={styles.dialogFooter}
      actions={actions}
      title={affirmation}
      closable={false}
      {...rest}
    >
      <div data-test="dialog-content" className={styles.content}>
        {consequences}
      </div>
    </Modal>
  )
}
