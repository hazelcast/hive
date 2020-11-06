import React from 'react'

import { Cell } from '../../src/Table/Cell'

export default {
  title: 'Components/Table/Cell',
  component: Cell,
}

export const Default = () => <Cell>Cell</Cell>
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=2875%3A0',
  },
}

export const WithWarning = () => <Cell warning="Cell warning">Cell</Cell>
