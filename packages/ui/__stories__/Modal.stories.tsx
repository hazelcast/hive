import React, { FC } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { Modal, ModalProps } from '../src/Modal'

import utilsStyles from './utils.scss'

export default {
  title: 'Components/Modal',
  component: Modal,
}

const onClose = () => console.log('onClose')
const onClick = () => console.log('onClick')
const children = 'Action'
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

export const WithAction = () => (
  <ModalWithPortalFactory
    title="Title of the Modal"
    isOpen
    onClose={onClose}
    actions={[
      {
        onClick,
        children: 'Action',
      },
    ]}
  >
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const WithActionDisabled = () => (
  <ModalWithPortalFactory
    title="Title of the Modal"
    isOpen
    onClose={onClose}
    actions={[
      {
        children,
        onClick,
        disabled: true,
        disabledTooltip,
      },
    ]}
  >
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const WithDangerAction = () => (
  <ModalWithPortalFactory
    title="Title of the Modal"
    isOpen
    onClose={onClose}
    actions={[
      {
        children,
        onClick,
        kind: 'danger',
      },
    ]}
  >
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const WithDangerActionDisabled = () => (
  <ModalWithPortalFactory
    title="Title of the Modal"
    isOpen
    onClose={onClose}
    actions={[
      {
        children,
        onClick,
        disabled: true,
        disabledTooltip,
        kind: 'danger',
      },
    ]}
  >
    <div>Content</div>
  </ModalWithPortalFactory>
)

export const WithMultipleActions = () => (
  <ModalWithPortalFactory
    title="Title of the Modal"
    isOpen
    onClose={onClose}
    actions={[
      {
        children,
        onClick,
      },
      {
        children,
        onClick,
        kind: 'danger',
      },
    ]}
  >
    <div>Content</div>
  </ModalWithPortalFactory>
)
