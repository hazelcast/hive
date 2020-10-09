import React from 'react'

import { Link } from '../src/Link'
import styles from '../src/Link.module.scss'

export default {
  title: 'core/Link',
  component: Link,
}

export const PrimaryStandalone = () => (
  <Link type="primary" standalone href="https://hazelcast.com/">
    Primary Link
  </Link>
)
PrimaryStandalone.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%93%90-Management-Center-Design-System?node-id=0%3A1778',
  },
}
export const PrimaryStandaloneHovered = () => (
  <Link type="primary" standalone className={styles.hover} href="https://hazelcast.com/">
    Primary Link
  </Link>
)
export const PrimaryStandaloneFocused = () => (
  <Link type="primary" standalone className={styles.focus} href="https://hazelcast.com/">
    Primary Link
  </Link>
)
export const PrimarStandaloneyActive = () => (
  <Link type="primary" standalone className={styles.active} href="https://hazelcast.com/">
    Primary Link
  </Link>
)
export const Primary = () => (
  <Link type="primary" href="https://hazelcast.com/">
    Primary Link
  </Link>
)
export const PrimaryHovered = () => (
  <Link type="primary" className={styles.hover} href="https://hazelcast.com/">
    Primary Link
  </Link>
)
export const PrimaryFocused = () => (
  <Link type="primary" className={styles.focus} href="https://hazelcast.com/">
    Primary Link
  </Link>
)
export const PrimaryActive = () => (
  <Link type="primary" className={styles.active} href="https://hazelcast.com/">
    Primary Link
  </Link>
)

export const SecondaryStandalone = () => (
  <Link type="secondary" standalone href="https://hazelcast.com/">
    Secondary Link
  </Link>
)
SecondaryStandalone.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%93%90-Management-Center-Design-System?node-id=0%3A1787',
  },
}
export const SecondaryStandaloneHovered = () => (
  <Link type="secondary" standalone className={styles.hover} href="https://hazelcast.com/">
    Secondary Link
  </Link>
)
export const SecondaryStandaloneFocused = () => (
  <Link type="secondary" standalone className={styles.focus} href="https://hazelcast.com/">
    Secondary Link
  </Link>
)
export const SecondaryStandaloneActive = () => (
  <Link type="secondary" standalone className={styles.active} href="https://hazelcast.com/">
    Secondary Link
  </Link>
)
export const Secondary = () => (
  <Link type="secondary" href="https://hazelcast.com/">
    Secondary Link
  </Link>
)
export const SecondaryHovered = () => (
  <Link type="secondary" className={styles.hover} href="https://hazelcast.com/">
    Secondary Link
  </Link>
)
export const SecondaryFocused = () => (
  <Link type="secondary" className={styles.focus} href="https://hazelcast.com/">
    Secondary Link
  </Link>
)
export const SecondaryActive = () => (
  <Link type="secondary" className={styles.active} href="https://hazelcast.com/">
    Secondary Link
  </Link>
)

export const TertiaryStandalone = () => (
  <Link type="tertiary" standalone href="https://hazelcast.com/">
    Tertiary Link
  </Link>
)
TertiaryStandalone.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%93%90-Management-Center-Design-System?node-id=0%3A1796',
  },
}
export const TertiaryStandaloneHovered = () => (
  <Link type="tertiary" standalone href="https://hazelcast.com/" className={styles.hover}>
    Tertiary Link
  </Link>
)
export const TertiaryStandaloneFocused = () => (
  <Link type="tertiary" standalone href="https://hazelcast.com/" className={styles.focus}>
    Tertiary Link
  </Link>
)
export const TertiaryStandaloneActive = () => (
  <Link type="tertiary" standalone href="https://hazelcast.com/" className={styles.active}>
    Tertiary Link
  </Link>
)
export const Tertiary = () => (
  <Link type="tertiary" href="https://hazelcast.com/">
    Tertiary Link
  </Link>
)
export const TertiaryHovered = () => (
  <Link type="tertiary" href="https://hazelcast.com/" className={styles.hover}>
    Tertiary Link
  </Link>
)
export const TertiaryFocused = () => (
  <Link type="tertiary" href="https://hazelcast.com/" className={styles.focus}>
    Tertiary Link
  </Link>
)
export const TertiaryActive = () => (
  <Link type="tertiary" href="https://hazelcast.com/" className={styles.active}>
    Tertiary Link
  </Link>
)

export const Tooltip = () => (
  <Link type="tooltip" tooltip="Visit Hazelcast Webpage" href="https://hazelcast.com/">
    Tooltip Link
  </Link>
)
Tooltip.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%93%90-Management-Center-Design-System?node-id=0%3A1805',
  },
}
export const TooltipHovered = () => (
  <Link type="tooltip" tooltip="Visit Hazelcast Webpage" href="https://hazelcast.com/" className={styles.hover}>
    Tooltip Link
  </Link>
)
export const TooltipFocused = () => (
  <Link type="tooltip" tooltip="Visit Hazelcast Webpage" href="https://hazelcast.com/" className={styles.focus}>
    Tooltip Link
  </Link>
)
export const TooltipActive = () => (
  <Link type="tooltip" tooltip="Visit Hazelcast Webpage" href="https://hazelcast.com/" className={styles.active}>
    Tooltip Link
  </Link>
)
