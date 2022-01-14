import React from 'react'
import { Clipboard } from 'react-feather'

import { Alert } from '../src'
import { AlertAction, AlertActionButton, AlertActionLink } from '../src/Alert'

export default {
  title: 'components/Alert',
  component: Alert,
}

const noOp = () => undefined

const AlertAction1: AlertActionButton = {
  text: 'Copy',
  onClick: noOp,
  icon: Clipboard,
  ariaLabel: 'Icon copy to clipboard',
}

const AlertAction2: AlertActionLink = {
  text: 'Link',
  href: '#',
}

const AlertActions1: AlertAction[] = [AlertAction1]

const AlertActions2: AlertAction[] = [AlertAction1, AlertAction2]

const title = 'Title of message'

const content = 'Alert Description - make it short and clear'

export const Success = () => <Alert type="success" title={title} content={content} closeToast={noOp} />

export const SuccessAction = () => <Alert type="success" title={title} content={content} closeToast={noOp} actions={AlertActions1} />

export const SuccessActions = () => <Alert type="success" title={title} content={content} closeToast={noOp} actions={AlertActions2} />

export const SuccessWithoutCloseButton = () => <Alert type="success" title={title} content={content} />

export const Info = () => <Alert type="info" title={title} content={content} closeToast={noOp} />

export const InfoAction = () => <Alert type="info" title={title} content={content} closeToast={noOp} actions={AlertActions1} />

export const InfoActions = () => <Alert type="info" title={title} content={content} closeToast={noOp} actions={AlertActions2} />

export const InfoWithoutCloseButton = () => <Alert type="info" title={title} content={content} />

export const Warning = () => <Alert type="warning" title={title} content={content} closeToast={noOp} />

export const WarningAction = () => <Alert type="warning" title={title} content={content} closeToast={noOp} actions={AlertActions1} />

export const WarningActions = () => <Alert type="warning" title={title} content={content} closeToast={noOp} actions={AlertActions2} />

export const WarningWithoutCloseButton = () => <Alert type="warning" title={title} content={content} />

export const Critical = () => <Alert type="critical" title={title} content={content} closeToast={noOp} />

export const CriticalAction = () => <Alert type="critical" title={title} content={content} closeToast={noOp} actions={AlertActions1} />

export const CriticalActions = () => <Alert type="critical" title={title} content={content} closeToast={noOp} actions={AlertActions2} />

export const CriticalWithoutCloseButton = () => <Alert type="critical" title={title} content={content} />
