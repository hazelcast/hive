import React, { FC } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import { Modal, ModalProps } from '../src/Modal'

import utilsStyles from './utils.scss'
import styles from '../src/Modal.module.scss'

export default {
  title: 'Components/Modal',
  component: Modal,
}

const onClose = () => console.log('onClose')

const onAction = () => console.log('onAction')
const actionLabel = 'Action'

const ModalWithPortalFactory: FC<ModalProps> = ({ children, className, ...props }) => {
  // We need dynamic id in order not to portal Default & Normal into same sandbox
  const id = `s${uuid()}`
  return (
    <div id={id} className={utilsStyles.modalWrapper}>
      <Modal {...props} className={cn(className, utilsStyles.modal)} parentSelector={() => document.querySelector(`#${id}`) as HTMLElement}>
        <div className={utilsStyles.modalChildrenWrapper}>{children}</div>
      </Modal>
    </div>
  )
}

export const Default = () => (
  <ModalWithPortalFactory title="Title of the Modal" isOpen onClose={onClose}>
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const Focused = () => (
  <ModalWithPortalFactory className={styles.focus} title="Title of the Modal" isOpen onClose={onClose}>
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const NotClosable = () => (
  <ModalWithPortalFactory title="Title of the Modal" isOpen>
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const WithAction = () => (
  <ModalWithPortalFactory title="Title of the Modal" isOpen onClose={onClose} onAction={onAction} actionLabel={actionLabel}>
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const NotClosableWithAction = () => (
  <ModalWithPortalFactory title="Title of the Modal" isOpen onAction={onAction} actionLabel={actionLabel}>
    <div>Content</div>
  </ModalWithPortalFactory>
)
