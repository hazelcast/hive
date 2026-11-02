import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { ThemeSwitcher } from '../src/components/ThemeSwitcher'
import { useThemePreference } from '../src/hooks/useThemePreference'
import { ThemePreference } from '../src/utils/colorScheme'
import s from './Button.stories.module.scss'

export default {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: { layout: 'centered', docs: { canvas: { sourceState: 'hidden' } } },
  argTypes: {
    value: { control: 'inline-radio', options: ['light', 'dark', 'system'], table: { category: 'State' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    onChange: { control: false },
    className: { control: false },
  },
  args: { value: 'system', disabled: false },
} satisfies Meta<typeof ThemeSwitcher>

type Story = StoryObj<typeof ThemeSwitcher>

export const Playground: Story = {
  render: function PlaygroundRender(args) {
    const { preference, setPreference } = useThemePreference()
    return <ThemeSwitcher {...args} value={preference} onChange={setPreference} />
  },
  parameters: { controls: { exclude: ['value'] } },
}

export const Preferences: Story = {
  tags: ['!dev'],
  render: () => (
    <div className={s.gridSizes} style={{ display: 'grid' }}>
      {(['light', 'dark', 'system'] as const).map((initial) => (
        <Preference key={initial} initial={initial} />
      ))}
    </div>
  ),
}

const Preference = ({ initial }: { initial: ThemePreference }) => {
  const [value, onChange] = useState(initial)
  return (
    <div className={s.cell}>
      <span className={s.label}>{initial}</span>
      <ThemeSwitcher value={value} onChange={onChange} />
    </div>
  )
}

export const Disabled: Story = { tags: ['!dev'], args: { disabled: true } }
