import React, { FC } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import { Dialog, DialogProps } from '../src/Dialog'

import utilsStyles from './utils.scss'
import styles from '../src/Dialog.module.scss'

export default {
  title: 'Components/Dialog',
  component: Dialog,
}

const onClose = () => console.log('onClose')

const onAction = () => console.log('onAction')
const actionLabel = 'Action'

const DialogWithPortalFactory: FC<DialogProps> = ({ children, modalClassName, ...props }) => {
  // We need dynamic id in order not to portal Default & Normal into same sandbox
  const id = `s${uuid()}`
  return (
    <div id={id} className={utilsStyles.modalWrapper}>
      <Dialog
        {...props}
        modalClassName={cn(modalClassName, utilsStyles.modal)}
        parentSelector={() => document.querySelector(`#${id}`) as HTMLElement}
      >
        <div className={utilsStyles.modalChildrenWrapper}>{children}</div>
      </Dialog>
    </div>
  )
}

export const Default = () => (
  <DialogWithPortalFactory title="Title of the Dialog" isOpen onClose={onClose}>
    <div>Dialog</div>
  </DialogWithPortalFactory>
)

export const Focused = () => (
  <DialogWithPortalFactory modalClassName={styles.focus} title="Title of the Dialog" isOpen onClose={onClose}>
    <div>Dialog</div>
  </DialogWithPortalFactory>
)

export const NotClosable = () => (
  <DialogWithPortalFactory title="Title of the Dialog" isOpen>
    <div>Dialog</div>
  </DialogWithPortalFactory>
)

export const PrimaryAction = () => (
  <DialogWithPortalFactory title="Title of the Dialog" isOpen actionLabel={actionLabel} onAction={onAction}>
    <div>Dialog</div>
  </DialogWithPortalFactory>
)

export const PrimaryActionDisabled = () => (
  <DialogWithPortalFactory title="Title of the Dialog" isOpen actionLabel={actionLabel} onAction={onAction} actionDisabled>
    <div>Dialog</div>
  </DialogWithPortalFactory>
)

export const CancelAndPrimaryAction = () => (
  <DialogWithPortalFactory title="Title of the Dialog" isOpen actionLabel={actionLabel} onAction={onAction} onClose={onClose}>
    <div>Dialog</div>
  </DialogWithPortalFactory>
)

export const CancelAndPrimaryActionDisabled = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
    onClose={onClose}
    actionDisabled
  >
    <div>Dialog</div>
  </DialogWithPortalFactory>
)

export const DangerAction = () => (
  <DialogWithPortalFactory title="Title of the Dialog" isOpen actionKind="danger" actionLabel={actionLabel} onAction={onAction}>
    <div>Dialog</div>
  </DialogWithPortalFactory>
)

export const CancelAndDangerAction = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    isOpen
    actionKind="danger"
    actionLabel={actionLabel}
    onAction={onAction}
    onClose={onClose}
  >
    <div>Dialog</div>
  </DialogWithPortalFactory>
)

export const CancelAndDangerActionDisabled = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    isOpen
    actionKind="danger"
    actionLabel={actionLabel}
    onAction={onAction}
    onClose={onClose}
    actionDisabled
  >
    <div>Dialog</div>
  </DialogWithPortalFactory>
)
