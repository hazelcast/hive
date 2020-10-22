import React from 'react'

import { Alert, AlertAction, AlertActions } from '../src/Alert'

export default {
  title: 'components/Alert',
  component: Alert,
}

const noOp = () => undefined

const AlertAction1: AlertAction = {
  text: 'Action 1',
  href: '#',
}

const AlertAction2: AlertAction = {
  text: 'Action 2',
  href: '#',
}

const AlertActions1: AlertActions = [AlertAction1]

const title = 'Title of message'

const content = 'Alert Description - make it short and clear'

export const Success = () => <Alert type="success" title={title} content={content} closeToast={noOp} />

export const SuccessAction = () => <Alert type="success" title={title} content={content} closeToast={noOp} actions={AlertActions1} />

export const Info = () => <Alert type="info" title={title} content={content} closeToast={noOp} />

export const InfoAction = () => <Alert type="info" title={title} content={content} closeToast={noOp} actions={AlertActions1} />

export const Warning = () => <Alert type="warning" title={title} content={content} closeToast={noOp} />

export const WarningAction = () => <Alert type="warning" title={title} content={content} closeToast={noOp} actions={AlertActions1} />

export const Critical = () => <Alert type="critical" title={title} content={content} closeToast={noOp} />

export const CriticalAction = () => <Alert type="critical" title={title} content={content} closeToast={noOp} actions={AlertActions1} />
