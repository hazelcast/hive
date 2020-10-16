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

const title = 'Title message'

const content = 'Alert Description - make it short and clear'

export const Success = () => <Alert type="success" title={title} onClose={noOp} />

export const SuccessContent = () => <Alert type="success" title={title} onClose={noOp} content={content} />

export const SuccessActions1 = () => <Alert type="success" title={title} onClose={noOp} content={content} actions={AlertActions1} />

export const SuccessActions2 = () => <Alert type="success" title={title} onClose={noOp} content={content} actions={AlertActions2} />

export const Info = () => <Alert type="info" title={title} onClose={noOp} />

export const InfoContent = () => <Alert type="info" title={title} onClose={noOp} content={content} />

export const InfoActions1 = () => <Alert type="info" title={title} onClose={noOp} content={content} actions={AlertActions1} />

export const InfoActions2 = () => <Alert type="info" title={title} onClose={noOp} content={content} actions={AlertActions2} />

export const Warning = () => <Alert type="warning" title={title} onClose={noOp} />

export const WarningContent = () => <Alert type="warning" title={title} onClose={noOp} content={content} />

export const WarningActions1 = () => <Alert type="warning" title={title} onClose={noOp} content={content} actions={AlertActions1} />

export const WarningActions2 = () => <Alert type="warning" title={title} onClose={noOp} content={content} actions={AlertActions2} />

export const Critical = () => <Alert type="critical" title={title} onClose={noOp} />

export const CriticalContent = () => <Alert type="critical" title={title} onClose={noOp} content={content} />

export const CriticalActions1 = () => <Alert type="critical" title={title} onClose={noOp} content={content} actions={AlertActions1} />

export const CriticalActions2 = () => <Alert type="critical" title={title} onClose={noOp} content={content} actions={AlertActions2} />
