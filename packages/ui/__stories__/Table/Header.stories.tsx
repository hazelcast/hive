import React from 'react'

import { Header } from '../../src/Table/Header'

export default {
  title: 'Components/Table/Header',
  component: Header,
}

export const Default = () => <Header canSort={false}>Header</Header>
Default.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=2875%3A0',
  },
}

export const SortableNotSorted = () => (
  <Header canSort isSorted={false} isSortedDesc={false}>
    Header
  </Header>
)

export const SortedDescending = () => (
  <Header canSort isSorted isSortedDesc>
    Header
  </Header>
)

export const SortedAscending = () => (
  <Header canSort isSorted isSortedDesc={false}>
    Header
  </Header>
)
