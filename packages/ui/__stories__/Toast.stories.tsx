import React from 'react'

import { Toast } from '../src/Toast'

export default {
  title: 'Components/Toast',
  component: Toast,
}

const noOp = () => undefined

export const Success = () => <Toast type="success" content="Toast text" />

Success.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=1355%3A223',
  },
}

export const SuccessClose = () => <Toast type="success" content="Toast text" closeToast={noOp} />

export const Info = () => <Toast type="info" content="Toast text" />

export const InfoClose = () => <Toast type="info" content="Toast text" closeToast={noOp} />

export const Warning = () => <Toast type="warning" content="Toast text" />

export const WarningClose = () => <Toast type="warning" content="Toast text" closeToast={noOp} />

export const Critical = () => <Toast type="critical" content="Toast text" />

export const CriticalClose = () => <Toast type="critical" content="Toast text" closeToast={noOp} />

export const LongText = () => (
  <Toast type="critical" content="LoooooooooooooooooooooooooooooooooooooooooooooooooongWord" closeToast={noOp} />
)

export const LongWord = () => (
  <Toast type="critical" content="Long Toast text Long Toast text Long Toast text Long Toast text Long" closeToast={noOp} />
)
