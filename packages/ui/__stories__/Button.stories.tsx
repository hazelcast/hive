import React from 'react'
import { Info, Trash2, Plus, ChevronDown } from 'react-feather'

import { Button } from '../src/Button'

export default {
  title: 'Button',
  component: Button,
}

export const ButtonPrimary = () => (
  <Button kind="primary" size="normal">
    Primary Button
  </Button>
)

export const ButtonPrimaryDisabled = () => (
  <Button disabled kind="primary" size="normal">
    Primary Button
  </Button>
)

export const ButtonPrimaryIconLeft = () => (
  <Button kind="primary" size="normal" IconLeft={Info} iconLeftAriaLabel="Info icon">
    Primary Button
  </Button>
)

export const ButtonPrimaryIconRight = () => (
  <Button kind="primary" size="normal" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Primary Button
  </Button>
)

export const ButtonPrimaryIconBoth = () => (
  <Button
    kind="primary"
    size="normal"
    IconLeft={Info}
    iconLeftAriaLabel="Info icon"
    IconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Primary Button
  </Button>
)

export const ButtonSecondary = () => (
  <Button kind="secondary" size="normal">
    Secondary Button
  </Button>
)

export const ButtonSecondaryDisabled = () => (
  <Button disabled kind="secondary" size="normal">
    Secondary Button
  </Button>
)

export const ButtonSecondaryIconLeft = () => (
  <Button kind="secondary" size="normal" IconLeft={Info} iconLeftAriaLabel="Info icon">
    Secondary Button
  </Button>
)

export const ButtonSecondaryIconRight = () => (
  <Button kind="secondary" size="normal" IconRight={ChevronDown} iconRightAriaLabel="Chevron icon">
    Secondary Button
  </Button>
)

export const ButtonSecondaryIconBoth = () => (
  <Button
    kind="secondary"
    size="normal"
    IconLeft={Info}
    iconLeftAriaLabel="Info icon"
    IconRight={ChevronDown}
    iconRightAriaLabel="Chevron icon"
  >
    Secondary Button
  </Button>
)

export const ButtonStatusSuccessPrimary = () => (
  <Button kind="status" statusKind="success" statusKindModifier="primary" size="normal">
    Primary Action
  </Button>
)

export const ButtonStatusSuccessSecondary = () => (
  <Button kind="status" statusKind="success" statusKindModifier="secondary" size="normal">
    Secondary Action
  </Button>
)

export const ButtonStatusInfoPrimary = () => (
  <Button kind="status" statusKind="info" statusKindModifier="primary" size="normal">
    Primary Action
  </Button>
)

export const ButtonStatusInfoSecondary = () => (
  <Button kind="status" statusKind="info" statusKindModifier="secondary" size="normal">
    Secondary Action
  </Button>
)

export const ButtonStatusWarningPrimary = () => (
  <Button kind="status" statusKind="warning" statusKindModifier="primary" size="normal">
    Primary Action
  </Button>
)

export const ButtonStatusWarningSecondary = () => (
  <Button kind="status" statusKind="warning" statusKindModifier="secondary" size="normal">
    Secondary Action
  </Button>
)

export const ButtonStatusCriticalPrimary = () => (
  <Button kind="status" statusKind="critical" statusKindModifier="primary" size="normal">
    Primary Action
  </Button>
)

export const ButtonStatusCriticalSecondary = () => (
  <Button kind="status" statusKind="critical" statusKindModifier="secondary" size="normal">
    Secondary Action
  </Button>
)

export const ButtonDashed = () => (
  <Button kind="dashed" size="normal">
    Dashed Button
  </Button>
)

export const ButtonDashedDisabled = () => (
  <Button disabled kind="dashed" size="normal">
    Dashed Button
  </Button>
)

export const ButtonDashedIconLeft = () => (
  <Button kind="dashed" size="normal" IconLeft={Plus} iconLeftAriaLabel="Plus icon">
    Dashed Button
  </Button>
)

export const ButtonDanger = () => (
  <Button kind="danger" size="normal">
    Danger Button
  </Button>
)

export const ButtonDangerDisabled = () => (
  <Button disabled kind="danger" size="normal">
    Danger Button
  </Button>
)

export const ButtonDangerIconLeft = () => (
  <Button kind="danger" size="normal" IconLeft={Trash2} iconLeftAriaLabel="Trash icon">
    Danger Button
  </Button>
)

export const ButtonSmall = () => (
  <Button kind="secondary" size="small">
    Small Button
  </Button>
)

export const ButtonNormal = () => (
  <Button kind="secondary" size="normal">
    Normal Button
  </Button>
)

export const ButtonLarge = () => (
  <Button kind="secondary" size="large">
    Large Button
  </Button>
)

export const ButtonFullWidth = () => (
  <div style={{ display: 'flex' }}>
    <Button kind="secondary" size="large" fullWidth>
      Large full-width Button
    </Button>
  </div>
)
