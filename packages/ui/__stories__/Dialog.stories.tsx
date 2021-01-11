import React, { FC } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

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
const disabledTooltip = 'Disabled Tooltip'

const DialogWithPortalFactory: FC<DialogProps> = ({ children, modalClassName, ...props }) => {
  const id = `s${useUID()}`
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
  <DialogWithPortalFactory
    title="Title of the Dialog"
    onClose={onClose}
    affirmation={affirmation}
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
  />
)

export const PrimaryActionDisabled = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionLabel={actionLabel}
    onAction={onAction}
    actionDisabled
    actionDisabledTooltip={disabledTooltip}
    onClose={onClose}
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
    onClose={onClose}
  />
)

export const DangerActionDisabled = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionKind="danger"
    actionLabel={actionLabel}
    onAction={onAction}
    onClose={onClose}
    actionDisabled
    actionDisabledTooltip={disabledTooltip}
  />
)