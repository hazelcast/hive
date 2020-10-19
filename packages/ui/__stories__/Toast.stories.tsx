import React from 'react'

import { Toast } from '../src/Toast'

export default {
  title: 'components/Toast',
  component: Toast,
}

const noOp = () => undefined

export const Success = () => <Toast type="success" content="Toast text" />

export const SuccessClose = () => <Toast type="success" content="Toast text" closeToast={noOp} />

export const Info = () => <Toast type="info" content="Toast text" />

export const InfoClose = () => <Toast type="info" content="Toast text" closeToast={noOp} />

export const Warning = () => <Toast type="warning" content="Toast text" />

export const WarningClose = () => <Toast type="warning" content="Toast text" closeToast={noOp} />

export const Critical = () => <Toast type="critical" content="Toast text" />

export const CriticalClose = () => <Toast type="critical" content="Toast text" closeToast={noOp} />
