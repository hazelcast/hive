import React from 'react'
import { ChevronRight } from 'react-feather'

import { Link } from '../src/Link'
import styles from '../src/Link.module.scss'

export default {
  title: 'Components/Link',
  component: Link,
}

export const Normal = () => <Link href="https://hazelcast.com/">Normal Text Link</Link>
Normal.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=2875%3A0',
  },
}
export const NormalHovered = () => (
  <Link href="https://hazelcast.com/" className={styles.hover}>
    Normal Text Link
  </Link>
)
export const NormalFocused = () => (
  <Link href="https://hazelcast.com/" className={styles.focus}>
    Normal Text Link
  </Link>
)
export const NormalActive = () => (
  <Link href="https://hazelcast.com/" className={styles.active}>
    Normal Text Link
  </Link>
)

export const NormalWithIcon = () => (
  <Link icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/">
    Normal Text Link
  </Link>
)
export const NormalWithIconHovered = () => (
  <Link icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/" className={styles.hover}>
    Normal Text Link
  </Link>
)
export const NormalWithIconFocused = () => (
  <Link icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/" className={styles.focus}>
    Normal Text Link
  </Link>
)
export const NormalWithIconActive = () => (
  <Link icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/" className={styles.active}>
    Normal Text Link
  </Link>
)

export const Small = () => (
  <Link size="small" href="https://hazelcast.com/">
    Small Text Link
  </Link>
)
Small.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=2875%3A2',
  },
}
export const SmallHovered = () => (
  <Link size="small" href="https://hazelcast.com/" className={styles.hover}>
    Small Text Link
  </Link>
)
export const SmallFocused = () => (
  <Link size="small" href="https://hazelcast.com/" className={styles.focus}>
    Small Text Link
  </Link>
)
export const SmallActive = () => (
  <Link size="small" href="https://hazelcast.com/" className={styles.active}>
    Small Text Link
  </Link>
)

export const SmallWithIcon = () => (
  <Link size="small" icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/">
    Small Text Link
  </Link>
)
export const SmallWithIconHovered = () => (
  <Link size="small" icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/" className={styles.hover}>
    Small Text Link
  </Link>
)
export const SmallWithIconFocused = () => (
  <Link size="small" icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/" className={styles.focus}>
    Small Text Link
  </Link>
)
export const SmallWithIconActive = () => (
  <Link size="small" icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/" className={styles.active}>
    Small Text Link
  </Link>
)

// A few 'secondary' kind variations:

export const SecondaryNormal = () => (
  <Link kind="secondary" href="https://hazelcast.com/">
    Secondary Normal Link
  </Link>
)

export const SecondaryNormalWithIcon = () => (
  <Link kind="secondary" href="https://hazelcast.com/" icon={ChevronRight} iconAriaLabel="Chevron right">
    Secondary Normal Link With Icon
  </Link>
)

export const SecondarySmall = () => (
  <Link kind="secondary" size="small" href="https://hazelcast.com/">
    Secondary Small Link
  </Link>
)

export const SecondarySmallWithIcon = () => (
  <Link kind="secondary" size="small" icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/">
    Secondary Small Link With Icon
  </Link>
)
