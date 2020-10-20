import React from 'react'
import { ChevronRight } from 'react-feather'

import { Link } from '../src/Link'
import styles from '../src/Link.module.scss'

export default {
  title: 'Components/Link',
  component: Link,
}

export const Regular = () => <Link href="https://hazelcast.com/">Primary Link</Link>
Regular.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%93%90-Management-Center-Design-System?node-id=0%3A1778',
  },
}
export const RegularHovered = () => (
  <Link href="https://hazelcast.com/" className={styles.hover}>
    Primary Link
  </Link>
)
export const RegularFocused = () => (
  <Link href="https://hazelcast.com/" className={styles.focus}>
    Primary Link
  </Link>
)
export const RegularActive = () => (
  <Link href="https://hazelcast.com/" className={styles.active}>
    Primary Link
  </Link>
)

export const RegularWithIcon = () => (
  <Link Icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/">
    Primary Link
  </Link>
)
export const RegularWithIconHovered = () => (
  <Link Icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/" className={styles.hover}>
    Primary Link
  </Link>
)
export const RegularWithIconFocused = () => (
  <Link Icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/" className={styles.focus}>
    Primary Link
  </Link>
)
export const RegularWithIconActive = () => (
  <Link Icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/" className={styles.active}>
    Primary Link
  </Link>
)

export const Small = () => (
  <Link size="small" href="https://hazelcast.com/">
    Secondary Link
  </Link>
)
Small.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%93%90-Management-Center-Design-System?node-id=0%3A1787',
  },
}
export const SmallHovered = () => (
  <Link size="small" href="https://hazelcast.com/" className={styles.hover}>
    Secondary Link
  </Link>
)
export const SmallFocused = () => (
  <Link size="small" href="https://hazelcast.com/" className={styles.focus}>
    Secondary Link
  </Link>
)
export const SmallActive = () => (
  <Link size="small" href="https://hazelcast.com/" className={styles.active}>
    Secondary Link
  </Link>
)

export const SmallWithIcon = () => (
  <Link size="small" Icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/">
    Secondary Link
  </Link>
)
export const SmallWithIconHovered = () => (
  <Link size="small" Icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/" className={styles.hover}>
    Secondary Link
  </Link>
)
export const SmallWithIconFocused = () => (
  <Link size="small" Icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/" className={styles.focus}>
    Secondary Link
  </Link>
)
export const SmallWithIconActive = () => (
  <Link size="small" Icon={ChevronRight} iconAriaLabel="Chevron right" href="https://hazelcast.com/" className={styles.active}>
    Secondary Link
  </Link>
)
