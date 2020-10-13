import React from 'react'
import { Info, Trash2, Plus, ChevronDown } from 'react-feather'

import { Button } from '../src/Button'

import styles from '../src/Button.module.scss'

export default {
  title: 'Button',
  component: Button,
}

export const ButtonPrimary = () => <Button kind="primary">Primary Button</Button>

export const ButtonPrimaryHovered = () => (
  <Button className={styles.hover} kind="primary">
    Primary Button
  </Button>
)

export const ButtonPrimaryFocused = () => (
  <Button className={styles.focus} kind="primary">
    Primary Button
  </Button>
)

export const ButtonPrimaryActive = () => (
  <Button className={styles.active} kind="primary">
    Primary Button
  </Button>
)

export const ButtonPrimaryDisabled = () => (
  <Button disabled kind="primary">
    Primary Button
  </Button>
)

export const ButtonPrimaryIconLeft = () => (
  <Button kind="primary" IconLeft={Info} iconLeftAriaLabel="Info icon">
    Primary Button
  </Button>
)

export const ButtonPrimaryIconRight = () => (
  <Button kind="primary" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Primary Button
  </Button>
)

export const ButtonPrimaryIconBoth = () => (
  <Button kind="primary" IconLeft={Info} iconLeftAriaLabel="Info icon" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Primary Button
  </Button>
)

export const ButtonSecondary = () => <Button kind="secondary">Secondary Button</Button>

export const ButtonSecondaryHovered = () => (
  <Button className={styles.hover} kind="secondary">
    Secondary Button
  </Button>
)

export const ButtonSecondaryFocused = () => (
  <Button className={styles.focus} kind="secondary">
    Secondary Button
  </Button>
)

export const ButtonSecondaryActive = () => (
  <Button className={styles.active} kind="secondary">
    Secondary Button
  </Button>
)

export const ButtonSecondaryDisabled = () => (
  <Button disabled kind="secondary">
    Secondary Button
  </Button>
)

export const ButtonSecondaryIconLeft = () => (
  <Button kind="secondary" IconLeft={Info} iconLeftAriaLabel="Info icon">
    Secondary Button
  </Button>
)

export const ButtonSecondaryIconRight = () => (
  <Button kind="secondary" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Secondary Button
  </Button>
)

export const ButtonSecondaryIconBoth = () => (
  <Button kind="secondary" IconLeft={Info} iconLeftAriaLabel="Info icon" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Secondary Button
  </Button>
)

export const ButtonStatusSuccessPrimary = () => (
  <Button kind="status" statusKind="success" statusKindModifier="primary">
    Primary Action
  </Button>
)

export const ButtonStatusSuccessSecondary = () => (
  <Button kind="status" statusKind="success" statusKindModifier="secondary">
    Secondary Action
  </Button>
)

export const ButtonStatusInfoPrimary = () => (
  <Button kind="status" statusKind="info" statusKindModifier="primary">
    Primary Action
  </Button>
)

export const ButtonStatusInfoSecondary = () => (
  <Button kind="status" statusKind="info" statusKindModifier="secondary">
    Secondary Action
  </Button>
)

export const ButtonStatusWarningPrimary = () => (
  <Button kind="status" statusKind="warning" statusKindModifier="primary">
    Primary Action
  </Button>
)

export const ButtonStatusWarningSecondary = () => (
  <Button kind="status" statusKind="warning" statusKindModifier="secondary">
    Secondary Action
  </Button>
)

export const ButtonStatusCriticalPrimary = () => (
  <Button kind="status" statusKind="critical" statusKindModifier="primary">
    Primary Action
  </Button>
)

export const ButtonStatusCriticalSecondary = () => (
  <Button kind="status" statusKind="critical" statusKindModifier="secondary">
    Secondary Action
  </Button>
)

export const ButtonDashed = () => <Button kind="dashed">Dashed Button</Button>

export const ButtonDashedHovered = () => (
  <Button className={styles.hover} kind="dashed">
    Dashed Button
  </Button>
)

export const ButtonDashedFocused = () => (
  <Button className={styles.focus} kind="dashed">
    Dashed Button
  </Button>
)

export const ButtonDashedActive = () => (
  <Button className={styles.active} kind="dashed">
    Dashed Button
  </Button>
)

export const ButtonDashedDisabled = () => (
  <Button disabled kind="dashed">
    Dashed Button
  </Button>
)

export const ButtonDashedIconLeft = () => (
  <Button kind="dashed" IconLeft={Plus} iconLeftAriaLabel="Plus icon">
    Dashed Button
  </Button>
)

export const ButtonDanger = () => <Button kind="danger">Danger Button</Button>

export const ButtonDangerHovered = () => (
  <Button className={styles.hover} kind="danger">
    Danger Button
  </Button>
)

export const ButtonDangerFocused = () => (
  <Button className={styles.focus} kind="danger">
    Danger Button
  </Button>
)

export const ButtonDangerActive = () => (
  <Button className={styles.active} kind="danger">
    Danger Button
  </Button>
)

export const ButtonDangerDisabled = () => (
  <Button disabled kind="danger">
    Danger Button
  </Button>
)

export const ButtonDangerIconLeft = () => (
  <Button kind="danger" IconLeft={Trash2} iconLeftAriaLabel="Trash icon">
    Danger Button
  </Button>
)

export const ButtonFullWidth = () => (
  <div style={{ display: 'flex' }}>
    <Button kind="secondary" fullWidth>
      Large full-width Button
    </Button>
  </div>
)
