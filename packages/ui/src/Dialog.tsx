import React, { FC, ReactNode } from 'react'
import { Modal, ModalProps, ModalActionProps } from './Modal'

import styles from './Dialog.module.scss'

export const DIALOG_AFFIRMATION_DEFAULT = 'Are you sure you wish to proceed?'

// Resolve the parentSelector
type DialogModalProps = Pick<ModalProps, 'isOpen' | 'title' | 'onClose' | 'parentSelector'> & ModalActionProps

export type DialogProps = {
  children?: ReactNode
  modalClassName?: string
  affirmation?: ReactNode
  consequences?: ReactNode
} & DialogModalProps

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
  children,
  parentSelector,
  ...actionProps
}) => {
  return (
    <Modal
      className={modalClassName}
      footerClassName={styles.modalFooter}
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      parentSelector={parentSelector}
      {...actionProps}
    >
      <div className={styles.content}>
        <div data-test="dialog-affirmation">{affirmation}</div>
        {consequences && (
          <div data-test="dialog-consequences" className={styles.consequences}>
            {consequences}
          </div>
        )}
        {children && (
          <div data-test="dialog-children" className={styles.children}>
            {children}
          </div>
        )}
      </div>
    </Modal>
  )
}
