import React from 'react'

import { Notification } from '../src/Notification'

const text = 'Lorem ipsum dolor sit amet'
const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies orci sed laoreet tempus. Suspendisse eget semper odio. Nulla vel erat tempor, feugiat nulla vitae, mollis purus. Maecenas varius ante sed mauris scelerisque aliquam. Aenean et congue ante. Etiam dictum, libero sit amet semper posuere, leo metus vestibulum libero, et fringilla metus ante eget lorem. Donec facilisis non nunc at pulvinar. Quisque cursus mi libero, in malesuada nulla tempor et. In at ligula ac est vehicula congue. Donec eget est sed ante cursus malesuada maximus a felis. Phasellus vitae pretium nibh, sed auctor purus. In congue, tortor sed dictum egestas, ligula nibh vehicula nulla, nec euismod ligula diam sit amet mauris. Vivamus congue interdum lorem sit amet facilisis.'

const link = 'Link'
const linkHref = '/'

export default {
  title: 'Components/Notification',
  component: Notification,
}

export const Success = () => <Notification type="success">{text}</Notification>
Success.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=1735%3A1455',
  },
}

export const SuccessWithLongText = () => <Notification type="success">{longText}</Notification>

export const SuccessWithLink = () => (
  <Notification type="success" link={link} linkHref={linkHref}>
    {text}
  </Notification>
)

export const SuccessWithLongTextAndLink = () => (
  <Notification type="success" link={link} linkHref={linkHref}>
    {longText}
  </Notification>
)

export const Info = () => <Notification type="info">{text}</Notification>
Info.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=1735%3A1453',
  },
}

export const InfoWithLongText = () => <Notification type="info">{longText}</Notification>

export const InfoWithLink = () => (
  <Notification type="info" link={link} linkHref={linkHref}>
    {text}
  </Notification>
)

export const InfoWithLongTextAndLink = () => (
  <Notification type="info" link={link} linkHref={linkHref}>
    {longText}
  </Notification>
)

export const Warning = () => <Notification type="warning">{text}</Notification>
Warning.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=1735%3A1452',
  },
}

export const WarningWithLongText = () => <Notification type="warning">{longText}</Notification>

export const WarningWithLink = () => (
  <Notification type="warning" link={link} linkHref={linkHref}>
    {text}
  </Notification>
)

export const WarningWithLongTextAndLink = () => (
  <Notification type="warning" link={link} linkHref={linkHref}>
    {longText}
  </Notification>
)

export const Error = () => <Notification type="error">{text}</Notification>
Error.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=1735%3A1454',
  },
}

export const ErrorWithLongText = () => <Notification type="error">{longText}</Notification>

export const ErrorWithLink = () => (
  <Notification type="error" link={link} linkHref={linkHref}>
    {text}
  </Notification>
)

export const ErrorWithLongTextAndLink = () => (
  <Notification type="error" link={link} linkHref={linkHref}>
    {longText}
  </Notification>
)
