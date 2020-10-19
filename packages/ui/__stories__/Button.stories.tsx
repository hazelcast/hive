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

export const PrimaryIconLeft = () => (
  <Button kind="primary" IconLeft={Info} iconLeftAriaLabel="Info icon">
    Primary
  </Button>
)

export const PrimaryIconRight = () => (
  <Button kind="primary" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Primary
  </Button>
)

export const PrimaryIconBoth = () => (
  <Button kind="primary" IconLeft={Info} iconLeftAriaLabel="Info icon" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Primary
  </Button>
)

export const PrimaryIconBothHovered = () => (
  <Button
    className={styles.hover}
    kind="primary"
    IconLeft={Info}
    iconLeftAriaLabel="Info icon"
    IconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Primary
  </Button>
)

export const PrimaryIconBothFocused = () => (
  <Button
    className={styles.focus}
    kind="primary"
    IconLeft={Info}
    iconLeftAriaLabel="Info icon"
    IconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Primary
  </Button>
)

export const PrimaryIconBothActive = () => (
  <Button
    className={styles.active}
    kind="primary"
    IconLeft={Info}
    iconLeftAriaLabel="Info icon"
    IconRight={ChevronDown}
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

export const SecondaryIconLeft = () => (
  <Button kind="secondary" IconLeft={Info} iconLeftAriaLabel="Info icon">
    Secondary
  </Button>
)

export const SecondaryIconRight = () => (
  <Button kind="secondary" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Secondary
  </Button>
)

export const SecondaryIconBoth = () => (
  <Button kind="secondary" IconLeft={Info} iconLeftAriaLabel="Info icon" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Secondary
  </Button>
)

export const SecondaryIconBothHovered = () => (
  <Button
    className={styles.hover}
    kind="secondary"
    IconLeft={Info}
    iconLeftAriaLabel="Info icon"
    IconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Secondary
  </Button>
)

export const SecondaryIconBothFocused = () => (
  <Button
    className={styles.focus}
    kind="secondary"
    IconLeft={Info}
    iconLeftAriaLabel="Info icon"
    IconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Secondary
  </Button>
)

export const SecondaryIconBothActive = () => (
  <Button
    className={styles.active}
    kind="secondary"
    IconLeft={Info}
    iconLeftAriaLabel="Info icon"
    IconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Secondary
  </Button>
)

export const Long = () => (
  <Button kind="primary" IconLeft={Info} iconLeftAriaLabel="Info icon" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Looooong Primary Button
  </Button>
)

/* export const SuccessPrimary = () => <Button kind="success">Primary Success</Button>

export const SuccessSecondary = () => <Button kind="successSecondary">Secondary Success</Button>

export const InfoPrimary = () => <Button kind="info">Primary Info</Button>

export const InfoSecondary = () => <Button kind="infoSecondary">Secondary Info</Button>

export const WarningPrimary = () => <Button kind="warning">Primary Warning</Button>

export const WarningSecondary = () => <Button kind="warningSecondary">Secondary Warning</Button>

export const CriticalPrimary = () => <Button kind="critical">Primary Critical</Button>

export const CriticalSecondary = () => <Button kind="criticalSecondary">Secondary Critical</Button>

export const Dashed = () => <Button kind="dashed">Dashed Button</Button>

export const DashedHovered = () => (
  <Button className={styles.hover} kind="dashed">
    Dashed Button
  </Button>
)

export const DashedFocused = () => (
  <Button className={styles.focus} kind="dashed">
    Dashed Button
  </Button>
)

export const DashedActive = () => (
  <Button className={styles.active} kind="dashed">
    Dashed Button
  </Button>
)

export const DashedDisabled = () => (
  <Button disabled kind="dashed">
    Dashed Button
  </Button>
)

export const DashedIconLeft = () => (
  <Button kind="dashed" IconLeft={Plus} iconLeftAriaLabel="Plus icon">
    Dashed Button
  </Button>
)

export const Danger = () => <Button kind="danger">Danger Button</Button>

export const DangerHovered = () => (
  <Button className={styles.hover} kind="danger">
    Danger Button
  </Button>
)

export const DangerFocused = () => (
  <Button className={styles.focus} kind="danger">
    Danger Button
  </Button>
)

export const DangerActive = () => (
  <Button className={styles.active} kind="danger">
    Danger Button
  </Button>
)

export const DangerDisabled = () => (
  <Button disabled kind="danger">
    Danger Button
  </Button>
)

export const DangerIconLeft = () => (
  <Button kind="danger" IconLeft={Trash2} iconLeftAriaLabel="Trash icon">
    Danger Button
  </Button>
) */
