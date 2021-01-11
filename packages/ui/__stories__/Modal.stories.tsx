import React, { FC } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

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
const disabledTooltip = 'Disabled Tooltip'

const ModalWithPortalFactory: FC<ModalProps> = ({ children, className, ...props }) => {
  const id = `s${useUID()}`
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

export const WithActionDisabled = () => (
  <ModalWithPortalFactory
    title="Title of the Modal"
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
    onClose={onClose}
    actionDisabled
    actionDisabledTooltip={disabledTooltip}
  >
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const NotClosableWithActionDisabled = () => (
  <ModalWithPortalFactory
    title="Title of the Modal"
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
    actionDisabled
    actionDisabledTooltip={disabledTooltip}
  >
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const WithDangerAction = () => (
  <ModalWithPortalFactory
    title="Title of the Modal"
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
    actionKind="danger"
    onClose={onClose}
  >
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const WithDangerActionDisabled = () => (
  <ModalWithPortalFactory
    title="Title of the Modal"
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
    actionDisabled
    actionDisabledTooltip={disabledTooltip}
    actionKind="danger"
  >
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const NotClosableWithDangerActionDisabled = () => (
  <ModalWithPortalFactory
    title="Title of the Modal"
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
    actionDisabled
    actionDisabledTooltip={disabledTooltip}
    actionKind="danger"
  >
    <div>Content</div>
  </ModalWithPortalFactory>
)
