import React from 'react'

import { Alert, AlertAction, AlertActions } from '../src/Alert'

export default {
  title: 'components/Alert',
  component: Alert,
}

const noOp = () => undefined

const AlertAction1: AlertAction = {
  text: 'Action 1',
  onClick: noOp,
}

const AlertAction2: AlertAction = {
  text: 'Action 2',
  onClick: noOp,
}

const AlertActions1: AlertActions = [AlertAction1]

const AlertActions2: AlertActions = [AlertAction1, AlertAction2]

const title = 'Title of message'

const content = 'Alert Description - make it short and clear'

export const Success = () => <Alert type="success" title={title} content={content} closeToast={noOp} />

export const Info = () => <Alert type="info" title={title} content={content} closeToast={noOp} />

export const Warning = () => <Alert type="warning" title={title} content={content} closeToast={noOp} />

export const Critical = () => <Alert type="critical" title={title} content={content} closeToast={noOp} />
