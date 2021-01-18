import React, { FC } from 'react'
import cn from 'classnames'
import { useUID } from 'react-uid'

import { Dialog, DialogProps } from '../src/Dialog'

import utilsStyles from './utils.scss'

export default {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
}

const onClose = () => console.log('onClose')
const actionOnConfirm = () => console.log('onClick')
const actionChildren = 'Action'
const actionDisabledTooltip = 'Disabled Tooltip'
const affirmation = 'Are you sure, young padawan?'
const consequences = 'This action may disturb the Force.'

const consequencesLong =
  'It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy….'

const DialogWithPortalFactory: FC<DialogProps> = ({ modalClassName, ...props }) => {
  const id = `s${useUID()}`
  return (
    <div id={id} className={utilsStyles.modalWrapper}>
      <Dialog
        {...props}
        modalClassName={cn(modalClassName, utilsStyles.modal)}
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

export const Long = () => <DialogWithPortalFactory affirmation={affirmation} consequences={consequencesLong} isOpen onClose={onClose} />
