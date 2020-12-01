import React, { FC } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import { Modal, ModalProps } from '../src/Modal'

import utilsStyles from './utils.scss'

export default {
  title: 'Components/Modal',
  component: Modal,
}

const onClose = () => console.log('onClose')

const ModalWithPortalFactory: FC<ModalProps> = ({ children, className, ...props }) => {
  const id = `s${uuid()}`
  return (
    <div id={id}>
      <Modal {...props} className={cn(className, utilsStyles.modal)} parentSelector={() => document.querySelector(`#${id}`) as HTMLElement}>
        {children}
      </Modal>
    </div>
  )
}

export const Normal = () => (
  <ModalWithPortalFactory title="Title" isOpen onClose={onClose} overlayClassName={utilsStyles.wrapperModal}>
    <div>Content</div>
  </ModalWithPortalFactory>
)
