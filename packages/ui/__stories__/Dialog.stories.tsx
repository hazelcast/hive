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

const onClose = () => console.log('onClose')
const actionOnConfirm = () => console.log('onClick')
const actionChildren = 'Action'
const actionDisabledTooltip = 'Disabled Tooltip'
const affirmation = 'Are you sure, young padawan?'
const consequences = 'This action may disturb the Force.'

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

export const WithAction = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    onClose={onClose}
    affirmation={affirmation}
    isOpen
    actionChildren={actionChildren}
    actionOnConfirm={actionOnConfirm}
  />
)

export const WithActionDisabled = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionChildren={actionChildren}
    actionOnConfirm={actionOnConfirm}
    actionDisabled
    actionDisabledTooltip={actionDisabledTooltip}
    onClose={onClose}
  />
)

export const WithDangerAction = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionDangerous
    actionChildren={actionChildren}
    actionOnConfirm={actionOnConfirm}
    onClose={onClose}
  />
)

export const WithDangerActionDisabled = () => (
  <DialogWithPortalFactory
    title="Title of the Dialog"
    affirmation={affirmation}
    isOpen
    actionDangerous
    actionChildren={actionChildren}
    actionOnConfirm={actionOnConfirm}
    onClose={onClose}
    actionDisabled
    actionDisabledTooltip={actionDisabledTooltip}
  />
)
