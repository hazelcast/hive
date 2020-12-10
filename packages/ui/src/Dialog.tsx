import React, { FC, ReactElement } from 'react'
import { Modal, ModalProps, ModalActionProps } from '../src/Modal'

export type DialogCoreProps = {
  affirmation?: ReactElement
  consequences?: ReactElement
  dangerous?: boolean
}

export type DialogProps = DialogCoreProps & Pick<ModalProps, 'children' | 'isOpen' | 'title' | 'onClose' | 'action' | 'onAction'>

export const Dialog: FC<DialogProps> = ({ isOpen, title, onClose, consequences, affirmation, action, onAction, children }) => (
  <Modal isOpen={isOpen} title={title} onClose={onClose} action={action} onAction={onAction}>
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
