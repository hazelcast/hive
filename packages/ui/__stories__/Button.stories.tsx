import React from 'react'
import { Info, ChevronDown } from 'react-feather'

import { Button } from '../src/Button'

import styles from '../src/Button.module.scss'

export default {
  title: 'Components/Button',
  component: Button,
}

export const Primary = () => <Button kind="primary">Primary</Button>

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=880%3A4409',
  },
}

export const PrimaryHovered = () => (
  <Button className={styles.hover} kind="primary">
    Primary
  </Button>
)

PrimaryHovered.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=1491%3A261',
  },
}

export const PrimaryFocused = () => (
  <Button className={styles.focus} kind="primary">
    Primary
  </Button>
)

PrimaryFocused.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=1491%3A278',
  },
}

export const PrimaryActive = () => (
  <Button className={styles.active} kind="primary">
    Primary
  </Button>
)

PrimaryActive.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=1491%3A278',
  },
}

export const PrimaryDisabled = () => (
  <Button disabled kind="primary">
    Primary
  </Button>
)

PrimaryDisabled.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=1491%3A315',
  },
}

export const PrimaryiconLeft = () => (
  <Button kind="primary" iconLeft={Info} iconLeftAriaLabel="Info icon">
    Primary
  </Button>
)

export const PrimaryiconRight = () => (
  <Button kind="primary" iconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Primary
  </Button>
)

export const PrimaryiconBoth = () => (
  <Button kind="primary" iconLeft={Info} iconLeftAriaLabel="Info icon" iconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Primary
  </Button>
)

export const PrimaryiconBothHovered = () => (
  <Button
    className={styles.hover}
    kind="primary"
    iconLeft={Info}
    iconLeftAriaLabel="Info icon"
    iconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Primary
  </Button>
)

export const PrimaryiconBothFocused = () => (
  <Button
    className={styles.focus}
    kind="primary"
    iconLeft={Info}
    iconLeftAriaLabel="Info icon"
    iconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Primary
  </Button>
)

export const PrimaryiconBothActive = () => (
  <Button
    className={styles.active}
    kind="primary"
    iconLeft={Info}
    iconLeftAriaLabel="Info icon"
    iconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Primary
  </Button>
)

export const Secondary = () => <Button kind="secondary">Secondary</Button>

Secondary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=944%3A7',
  },
}

export const SecondaryHovered = () => (
  <Button className={styles.hover} kind="secondary">
    Secondary
  </Button>
)

export const SecondaryFocused = () => (
  <Button className={styles.focus} kind="secondary">
    Secondary
  </Button>
)

export const SecondaryActive = () => (
  <Button className={styles.active} kind="secondary">
    Secondary
  </Button>
)

export const SecondaryDisabled = () => (
  <Button disabled kind="secondary">
    Secondary
  </Button>
)

export const SecondaryiconLeft = () => (
  <Button kind="secondary" iconLeft={Info} iconLeftAriaLabel="Info icon">
    Secondary
  </Button>
)

export const SecondaryiconRight = () => (
  <Button kind="secondary" iconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Secondary
  </Button>
)

export const SecondaryiconBoth = () => (
  <Button kind="secondary" iconLeft={Info} iconLeftAriaLabel="Info icon" iconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Secondary
  </Button>
)

export const SecondaryiconBothHovered = () => (
  <Button
    className={styles.hover}
    kind="secondary"
    iconLeft={Info}
    iconLeftAriaLabel="Info icon"
    iconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Secondary
  </Button>
)

export const SecondaryiconBothFocused = () => (
  <Button
    className={styles.focus}
    kind="secondary"
    iconLeft={Info}
    iconLeftAriaLabel="Info icon"
    iconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Secondary
  </Button>
)

export const SecondaryiconBothActive = () => (
  <Button
    className={styles.active}
    kind="secondary"
    iconLeft={Info}
    iconLeftAriaLabel="Info icon"
    iconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Secondary
  </Button>
)

export const Long = () => (
  <Button kind="primary" iconLeft={Info} iconLeftAriaLabel="Info icon" iconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Looooong Primary Button
  </Button>
)
