import React from 'react'
import { ChevronRight } from 'react-feather'

import { Link } from '../src/components/Link'
import styles from '../src/components/Link.module.scss'
import { logger } from '../src'

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

export const Bold = () => (
  <Link bold href="https://hazelcast.com/">
    Bold Text Link
  </Link>
)
export const BoldHovered = () => (
  <Link bold href="https://hazelcast.com/" className={styles.hover}>
    Bold Text Link
  </Link>
)
export const BoldFocused = () => (
  <Link bold href="https://hazelcast.com/" className={styles.focus}>
    Bold Text Link
  </Link>
)
export const BoldActive = () => (
  <Link bold href="https://hazelcast.com/" className={styles.active}>
    Bold Text Link
  </Link>
)

export const BoldWithIcon = () => (
  <Link bold icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/">
    Bold Text Link
  </Link>
)
export const BoldWithIconHovered = () => (
  <Link bold icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/" className={styles.hover}>
    Bold Text Link
  </Link>
)
export const BoldWithIconFocused = () => (
  <Link bold icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/" className={styles.focus}>
    Bold Text Link
  </Link>
)
export const BoldWithIconActive = () => (
  <Link bold icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/" className={styles.active}>
    Bold Text Link
  </Link>
)

// A few 'secondary' kind variations:

export const SecondaryNormal = () => (
  <Link kind="secondary" href="https://hazelcast.com/">
    Secondary Normal Link
  </Link>
)

export const SecondaryNormalWithIcon = () => (
  <Link kind="secondary" href="https://hazelcast.com/" icon={ChevronRight} ariaLabel="Chevron right">
    Secondary Normal Link With Icon
  </Link>
)

export const SecondarySmall = () => (
  <Link kind="secondary" size="small" href="https://hazelcast.com/">
    Secondary Small Link
  </Link>
)

export const SecondarySmallWithIcon = () => (
  <Link kind="secondary" size="small" icon={ChevronRight} ariaLabel="Chevron right" href="https://hazelcast.com/">
    Secondary Small Link With Icon
  </Link>
)

export const InheritSize = () => (
  <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
    Some Parent Text{' '}
    <Link href="https://hazelcast.com/" size="inherit">
      Inherited Text Link
    </Link>
  </p>
)

export const ButtonSemanticsNormal = () => <Link component="button">Normal Text Link</Link>

export const ButtonSemanticsSecondarySmallWithIcon = () => (
  <Link kind="secondary" size="small" icon={ChevronRight} ariaLabel="Chevron right" component="button" onClick={(e) => logger.log(e)}>
    Secondary Small Link With Icon
  </Link>
)
