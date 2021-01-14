import React, { FC } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { Dialog, DialogProps } from '../src/Dialog'

import utilsStyles from './utils.scss'

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

const DialogWithPortalFactory: FC<DialogProps> = ({ modalClassName, ...props }) => {
  const id = `s${useUID()}`
  return (
    <div id={id} className={utilsStyles.modalWrapper}>
      <Dialog
        {...props}
        modalClassName={cn(modalClassName, utilsStyles.modal)}
        portalClassName={utilsStyles.modalPortal}
        parentSelector={() => document.querySelector(`#${id}`) as HTMLElement}
      />
    </div>
  )
}

export const Default = () => <DialogWithPortalFactory affirmation={affirmation} consequences={consequences} isOpen onClose={onClose} />

export const WithAction = () => (
  <DialogWithPortalFactory
    onClose={onClose}
    affirmation={affirmation}
    consequences={consequences}
    isOpen
    actionChildren={actionChildren}
    actionOnConfirm={actionOnConfirm}
  />
)

export const WithActionDisabled = () => (
  <DialogWithPortalFactory
    affirmation={affirmation}
    consequences={consequences}
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
    affirmation={affirmation}
    consequences={consequences}
    isOpen
    actionDangerous
    actionChildren={actionChildren}
    actionOnConfirm={actionOnConfirm}
    onClose={onClose}
  />
)

export const WithDangerActionDisabled = () => (
  <DialogWithPortalFactory
    affirmation={affirmation}
    consequences={consequences}
    isOpen
    actionDangerous
    actionChildren={actionChildren}
    actionOnConfirm={actionOnConfirm}
    onClose={onClose}
    actionDisabled
    actionDisabledTooltip={actionDisabledTooltip}
  />
)
