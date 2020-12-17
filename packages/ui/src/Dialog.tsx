import React, { FC, ReactNode } from 'react'
import { Modal, ModalProps, ModalActionCoreProps } from './Modal'

import styles from './Dialog.module.scss'

const AFFIRMATION_DEFAULT = 'Are you sure you wish to proceed?'

// Resolve the parentSelector
type DialogModalProps = Pick<ModalProps, 'isOpen' | 'title' | 'onClose' | 'parentSelector'> & ModalActionCoreProps

export type DialogProps = {
  children?: ReactNode
  modalClassName?: string
  affirmation?: ReactNode
  consequences?: ReactNode
} & DialogModalProps

/*
 * What's the difference between Modal and Dialog? Does it make sense to even separate them?
 *
 * Dialog is a modal with:
 * - Pre-set content of affirmation + consequences
 * - Always 2 buttons - Cancel + Action
 * - Styles (especially height) are limited, scroll is disallowed
 *
 * Use case is:
 * - Simple confirmations, that do not require scroll
 * - With simple confirmation, configurable button
 * - Don't forget to take into account dialog with just one button - Cancel. That's a relevant use-case.
 *
 * The problem:
 * - Button config properties
 * - WE need to pick them and rename them
 * - Potentially do some type-checking along the way, which has proven to be challenging so far, but let's see!
 */
export const Dialog: FC<DialogProps> = ({
  modalClassName,
  isOpen,
  title,
  onClose,
  consequences,
  affirmation = AFFIRMATION_DEFAULT,
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
          <div data-test="children" className={styles.children}>
            {children}
          </div>
        )}
      </div>
    </Modal>
  )
}
