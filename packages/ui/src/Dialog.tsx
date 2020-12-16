import React, { FC, ReactNode } from 'react'
import { Modal, ModalProps, ModalActionCoreProps } from './Modal'

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
  affirmation,
  children,
  parentSelector,
  ...rest
}) => {
  return (
    <Modal className={modalClassName} isOpen={isOpen} title={title} onClose={onClose} parentSelector={parentSelector} {...rest}>
      <div>
        <p className="lead">
          {affirmation}
          <br />
        </p>
        {consequences && (
          <blockquote>
            <p>{consequences}</p>
          </blockquote>
        )}
        {children}
      </div>
    </Modal>
  )
}
