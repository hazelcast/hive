import React from 'react'
import { Bell, Menu, Search, Settings, Trash2 } from 'react-feather'

import { IconButton, IconButtonProps, IconButtonVariant } from '../src/components/IconButton'
import { IconButton as LegacyIconButton } from '../src/old'

import styles from '../src/components/IconButton.module.css'

export default {
  title: 'Components/IconButton',
  component: IconButton,
}

const baseProps: IconButtonProps = {
  ariaLabel: 'Settings',
  icon: Settings,
}

export const Default = () => <IconButton {...baseProps} />

export const Hovered = () => <IconButton {...baseProps} className={styles.hover} />

export const Focused = () => <IconButton {...baseProps} className={styles.focus} />

export const Active = () => <IconButton {...baseProps} className={styles.active} />

export const Disabled = () => <IconButton {...baseProps} disabled disabledTooltip="Disabled" />

export const Loading = () => <IconButton {...baseProps} loading />

export const LinkSemantics = () => <IconButton ariaLabel="Settings" icon={Settings} component="a" href="#" />

export const WithTooltip = () => <IconButton {...baseProps} tooltipVisible tooltipPlacement="bottom" tooltip="Settings tooltip" />

const variants: IconButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'destructive']
const icons = [Search, Bell, Settings, Menu, Trash2]

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: 12 }}>
    {variants.map((variant, i) => (
      <IconButton key={variant} variant={variant} ariaLabel={variant} icon={icons[i]} />
    ))}
  </div>
)

export const AllSizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <IconButton {...baseProps} size="sm" />
    <IconButton {...baseProps} size="md" />
    <IconButton {...baseProps} size="lg" />
  </div>
)

export const LegacyV3 = () => (
  <div style={{ display: 'flex', gap: 12 }}>
    <LegacyIconButton kind="primary" ariaLabel="Settings" icon={Settings} />
    <LegacyIconButton kind="transparent" ariaLabel="Settings" icon={Settings} />
  </div>
)

LegacyV3.parameters = {
  docs: {
    description: {
      story: 'The v3 IconButton is preserved for gradual migration. Import from `@hazelcast/ui/old`.',
    },
  },
}
