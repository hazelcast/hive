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

const affirmation = 'Are you sure, young padawan?'
const consequences = 'This action may disturb the Force.'

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
        {children}
      </Dialog>
    </div>
  )
}

export const Default = () => <DialogWithPortalFactory title="Title of the Dialog" affirmation={affirmation} isOpen onClose={onClose} />

export const Focused = () => (
  <DialogWithPortalFactory modalClassName={styles.focus} title="Title of the Dialog" affirmation={affirmation} isOpen onClose={onClose} />
)

export const NotClosable = () => <DialogWithPortalFactory title="Title of the Dialog" affirmation={affirmation} isOpen />

export const WithConsequences = () => (
  <DialogWithPortalFactory title="Title of the Dialog" affirmation={affirmation} consequences={consequences} isOpen onClose={onClose} />
)

export const WithChildren = () => (
  <DialogWithPortalFactory title="Title of the Dialog" affirmation={affirmation} isOpen onClose={onClose}>
    <div>Content</div>
  </DialogWithPortalFactory>
)

export const WithConsequencesAndChildren = () => (
  <DialogWithPortalFactory title="Title of the Dialog" affirmation={affirmation} consequences={consequences} isOpen onClose={onClose}>
    <div>Content</div>
  </DialogWithPortalFactory>
)

export const PrimaryAction = () => (
  <DialogWithPortalFactory title="Title of the Dialog" affirmation={affirmation} isOpen actionLabel={actionLabel} onAction={onAction} />
)

export const PrimaryActionDisabled = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
    actionDisabled
  />
)

export const CancelAndPrimaryAction = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
    onClose={onClose}
  />
)

export const CancelAndPrimaryActionDisabled = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
    onClose={onClose}
    actionDisabled
  />
)

export const DangerAction = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionKind="danger"
    actionLabel={actionLabel}
    onAction={onAction}
  />
)

export const CancelAndDangerAction = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionKind="danger"
    actionLabel={actionLabel}
    onAction={onAction}
    onClose={onClose}
  />
)

export const CancelAndDangerActionDisabled = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionKind="danger"
    actionLabel={actionLabel}
    onAction={onAction}
    onClose={onClose}
    actionDisabled
  />
)
