import React, { ReactNode } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import {
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit2,
  ExternalLink,
  Heart,
  Menu,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Star,
  Trash2,
  X,
} from 'react-feather'

import { IconButton } from '../src/components/IconButton'
import { ButtonVariant, ButtonColor } from '../src/components/Button'
import { IconButton as LegacyIconButton } from '../src/old'

import styles from '../src/components/IconButton.module.css'
import s from './Button.stories.module.scss'

type Story = StoryObj<typeof IconButton>

const iconOptions = {
  Settings,
  Bell,
  Search,
  Menu,
  Plus,
  Edit2,
  Copy,
  Trash: Trash2,
  Star,
  Heart,
  MoreHorizontal,
  RefreshCw,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
}

const VARIANTS: { variant: ButtonVariant; label: string }[] = [
  { variant: 'contained', label: 'Contained' },
  { variant: 'outlined', label: 'Outlined' },
  { variant: 'ghost', label: 'Ghost' },
]

const COLORS: { color: ButtonColor; label: string }[] = [
  { color: 'primary', label: 'Primary' },
  { color: 'secondary', label: 'Secondary' },
  { color: 'warning', label: 'Warning' },
  { color: 'danger', label: 'Danger' },
]

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={s.cell}>
    <span className={s.label}>{label}</span>
    {children}
  </div>
)

export default {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      exclude: [
        'iconClassName',
        'iconColor',
        'iconRole',
        'loaderRole',
        'tabIndex',
        'style',
        'className',
        'component',
        'href',
        'rel',
        'target',
        'type',
        'onClick',
        'onMouseDown',
        'ariaLabelledBy',
        'ariaHidden',
        'disabledTooltipPlacement',
        'tooltipPlacement',
        'tooltipVisible',
        'data-test',
      ],
    },
  },
  argTypes: {
    icon: {
      name: 'icon',
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'The icon component to render.',
      table: { category: 'Content' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name. Required unless `ariaLabelledBy` or `ariaHidden` is set.',
      table: { category: 'Content' },
    },
    variant: {
      control: 'inline-radio',
      options: ['contained', 'outlined', 'ghost', 'link'],
      description: 'The visual treatment of the button.',
      table: { category: 'Appearance', defaultValue: { summary: 'contained' } },
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'warning', 'danger'],
      description: 'The semantic color. Ignored for `link`.',
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'inline-radio',
      options: ['regular', 'small'],
      table: { category: 'Appearance', defaultValue: { summary: 'regular' } },
    },
    loading: {
      control: 'boolean',
      description: 'Show a loader instead of the icon while an async action is in progress.',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'State' },
    },
    disabledTooltip: {
      control: 'text',
      description: 'Message shown in a tooltip while the button is disabled. Required when `disabled` is true.',
      table: { category: 'State' },
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip shown on hover when the button is enabled. Strongly recommended for icon-only controls.',
      table: { category: 'Content' },
    },
  },
  args: {
    icon: Settings,
    ariaLabel: 'Settings',
    variant: 'contained',
    color: 'primary',
    size: 'regular',
  },
} as Meta<typeof IconButton>

export const Playground: Story = {
  render: ({ tooltip, ...args }) => <IconButton {...args} tooltip={tooltip ? tooltip : undefined} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Tweak any prop in the Controls panel on the right. Pick an icon from the **icon** dropdown. Type into **tooltip** to enable a hover tooltip; clear it to disable. **ariaLabel** is required unless the icon is purely decorative.',
      },
    },
  },
}

export const Variants = () => (
  <div className={s.section}>
    <Caption>
      <strong>variant</strong> and <strong>color</strong> are independent. Pick the visual treatment with <strong>variant</strong>; pick the
      semantic intent with <strong>color</strong>.
      <ul>
        <li>
          <strong>Contained</strong> — filled background, highest emphasis.
        </li>
        <li>
          <strong>Outlined</strong> — bordered with white background, medium emphasis.
        </li>
        <li>
          <strong>Ghost</strong> — transparent until hovered, lowest emphasis. Most common in toolbars and table rows.
        </li>
      </ul>
    </Caption>
    <div className={`${s.grid} ${s.gridMatrix}`}>
      <span />
      {COLORS.map(({ color, label }) => (
        <span key={color} className={s.label}>
          {label}
        </span>
      ))}
      {VARIANTS.map(({ variant, label }) => (
        <React.Fragment key={variant}>
          <span className={s.rowLabel}>{label}</span>
          {COLORS.map(({ color }) => (
            <IconButton key={color} variant={variant} color={color} icon={Settings} ariaLabel={`${label} ${color}`} />
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
)
Variants.tags = ['!dev']

export const Sizes = () => (
  <div className={s.section}>
    <Caption>
      <strong>Regular</strong> (36px) is the default. Use <strong>Small</strong> (32px) in compact spaces such as toolbars and dense table
      rows. Both sizes scale the icon to match.
    </Caption>
    <div className={`${s.grid} ${s.gridSizes}`}>
      <Cell label="Regular">
        <IconButton size="regular" icon={Settings} ariaLabel="Settings" />
      </Cell>
      <Cell label="Small">
        <IconButton size="small" icon={Settings} ariaLabel="Settings" />
      </Cell>
    </div>
  </div>
)
Sizes.tags = ['!dev']

export const Loading = () => (
  <div className={s.section}>
    <Caption>
      Show a loader while waiting for an async action. The button keeps its size to avoid layout shift, stays focusable, and announces the
      busy state to assistive tech. The loader replaces the icon.
    </Caption>
    <div className={`${s.grid} ${s.gridIcons}`}>
      <span />
      {VARIANTS.map(({ variant, label }) => (
        <span key={variant} className={s.label}>
          {label}
        </span>
      ))}
      <span className={s.rowLabel}>Idle</span>
      {VARIANTS.map(({ variant }) => (
        <IconButton key={variant} variant={variant} icon={RefreshCw} ariaLabel="Refresh" />
      ))}
      <span className={s.rowLabel}>Loading</span>
      {VARIANTS.map(({ variant }) => (
        <IconButton key={variant} variant={variant} icon={RefreshCw} ariaLabel="Refresh" loading />
      ))}
    </div>
  </div>
)
Loading.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>
      Disabled buttons explain themselves. Provide a <strong>disabledTooltip</strong> describing what unblocks the action. Because the
      button has no visible label, the tooltip is the only way users discover why it&rsquo;s unavailable.
    </Caption>
    <div className={`${s.grid} ${s.gridSizes}`}>
      {VARIANTS.map(({ variant, label }) => (
        <Cell key={variant} label={label}>
          <IconButton
            variant={variant}
            icon={Trash2}
            ariaLabel="Delete"
            disabled
            disabledTooltip={`${label} is disabled because nothing is selected.`}
          />
        </Cell>
      ))}
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const WithTooltip = () => (
  <div className={s.section}>
    <Caption>
      Always pair an icon-only button with a <strong>tooltip</strong>. It surfaces the action on hover for sighted users and gives the
      button a visible label without taking up space.
    </Caption>
    <div className={s.row}>
      <IconButton variant="ghost" color="secondary" icon={Edit2} ariaLabel="Edit" tooltip="Edit" />
      <IconButton variant="ghost" color="secondary" icon={Copy} ariaLabel="Duplicate" tooltip="Duplicate" />
      <IconButton variant="ghost" color="secondary" icon={Trash2} ariaLabel="Delete" tooltip="Delete" />
      <IconButton variant="ghost" color="secondary" icon={MoreHorizontal} ariaLabel="More options" tooltip="More options" />
    </div>
  </div>
)
WithTooltip.tags = ['!dev']

export const AsLink = () => (
  <div className={s.section}>
    <Caption>
      Pass <strong>component=&quot;a&quot;</strong> and an <strong>href</strong> to render an anchor that looks like an icon button. Useful
      for &ldquo;open in new tab&rdquo; or external link affordances.
    </Caption>
    <div className={s.row}>
      <IconButton component="a" href="#" icon={ExternalLink} ariaLabel="Open docs" tooltip="Open docs" />
      <IconButton
        component="a"
        href="#"
        variant="outlined"
        color="secondary"
        icon={ExternalLink}
        ariaLabel="Open docs"
        tooltip="Open docs"
      />
      <IconButton component="a" href="#" variant="ghost" color="secondary" icon={ExternalLink} ariaLabel="Open docs" tooltip="Open docs" />
    </div>
  </div>
)
AsLink.tags = ['!dev']

export const States = () => {
  const stateRows: { label: string; className?: string; disabled?: boolean }[] = [
    { label: 'Default' },
    { label: 'Hover', className: styles.hover },
    { label: 'Focus', className: styles.focus },
    { label: 'Active', className: styles.active },
    { label: 'Disabled', disabled: true },
  ]
  return (
    <div className={s.section}>
      <Caption>
        QA matrix for visual states. Use this to verify CSS changes — interactive states are forced via classes that mirror the real{' '}
        <code>:hover</code>, <code>:focus</code> and <code>:active</code> rules.
      </Caption>
      <div className={`${s.grid} ${s.gridStates}`}>
        <span />
        {stateRows.map((r) => (
          <span key={r.label} className={s.label}>
            {r.label}
          </span>
        ))}
        {VARIANTS.map(({ variant, label }) => (
          <React.Fragment key={variant}>
            <span className={s.rowLabel}>{label}</span>
            {stateRows.map((r) =>
              r.disabled ? (
                <IconButton
                  key={r.label}
                  variant={variant}
                  className={r.className}
                  icon={Settings}
                  ariaLabel={`${label} ${r.label}`}
                  disabled
                  disabledTooltip="Disabled"
                />
              ) : (
                <IconButton key={r.label} variant={variant} className={r.className} icon={Settings} ariaLabel={`${label} ${r.label}`} />
              ),
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
States.parameters = {
  docs: {
    description: {
      story: 'Visual QA matrix. Not part of the public design spec — included so engineers can verify state styling in one glance.',
    },
  },
}
States.tags = ['!dev']

type DoDontPair = {
  heading: string
  good: { note: string; demo: ReactNode }
  bad: { note: string; demo: ReactNode }
}

const DO_DONT_PAIRS: DoDontPair[] = [
  {
    heading: 'Always provide an accessible name',
    good: {
      note: 'Set ariaLabel and a matching tooltip so the action is announced and discoverable on hover.',
      demo: <IconButton variant="ghost" color="secondary" icon={Trash2} ariaLabel="Delete item" tooltip="Delete" />,
    },
    bad: {
      note: 'Without ariaLabel the button has no name. Screen readers announce it as just "button".',
      demo: <IconButton variant="ghost" color="secondary" icon={Trash2} ariaHidden />,
    },
  },
  {
    heading: 'Use a tooltip on every icon-only button',
    good: {
      note: 'Tooltips give sighted users a visible label without sacrificing layout density.',
      demo: (
        <>
          <IconButton variant="ghost" color="secondary" icon={Edit2} ariaLabel="Edit" tooltip="Edit" />
          <IconButton variant="ghost" color="secondary" icon={Copy} ariaLabel="Duplicate" tooltip="Duplicate" />
        </>
      ),
    },
    bad: {
      note: 'Don\u2019t leave users guessing what an icon does — especially generic shapes like dots or stars.',
      demo: (
        <>
          <IconButton variant="ghost" color="secondary" icon={MoreHorizontal} ariaLabel="More" />
          <IconButton variant="ghost" color="secondary" icon={Star} ariaLabel="Star" />
        </>
      ),
    },
  },
  {
    heading: 'Prefer a labelled Button when space allows',
    good: {
      note: 'A button with a visible verb is the most discoverable. Reach for IconButton only when space is tight.',
      demo: <IconButton variant="contained" icon={Plus} ariaLabel="Add member" tooltip="Add member" />,
    },
    bad: {
      note: 'Avoid icon-only primary actions when there is room for a label — users hesitate to click an unlabelled CTA.',
      demo: <IconButton variant="contained" icon={Check} ariaLabel="Confirm" />,
    },
  },
  {
    heading: 'Danger actions need confirmation context',
    good: {
      note: 'Destructive icon buttons belong inside a row or menu where the target is unambiguous, paired with a tooltip.',
      demo: <IconButton variant="ghost" color="danger" icon={Trash2} ariaLabel="Delete project" tooltip="Delete project" />,
    },
    bad: {
      note: 'Don\u2019t place a destructive icon button next to unrelated controls — easy to fire by accident.',
      demo: (
        <>
          <IconButton variant="ghost" color="secondary" icon={Edit2} ariaLabel="Edit" tooltip="Edit" />
          <IconButton variant="ghost" color="secondary" icon={Copy} ariaLabel="Duplicate" tooltip="Duplicate" />
          <IconButton variant="contained" color="danger" icon={Trash2} ariaLabel="Delete" />
        </>
      ),
    },
  },
]

export const DoVsDont = () => (
  <div className={s.doDont}>
    {DO_DONT_PAIRS.map(({ heading, good, bad }) => (
      <section key={heading} className={s.doDontRow}>
        <h4 className={s.doDontHeading}>{heading}</h4>
        <div className={`${s.doDontCard} ${s.doDontGood}`}>
          <span className={s.doDontMarker}>
            <Check size={14} /> Do
          </span>
          <div className={s.doDontDemo}>{good.demo}</div>
          <p className={s.doDontNote}>{good.note}</p>
        </div>
        <div className={`${s.doDontCard} ${s.doDontBad}`}>
          <span className={s.doDontMarker}>
            <X size={14} /> Don&rsquo;t
          </span>
          <div className={s.doDontDemo}>{bad.demo}</div>
          <p className={s.doDontNote}>{bad.note}</p>
        </div>
      </section>
    ))}
  </div>
)
DoVsDont.tags = ['!dev']
DoVsDont.parameters = {
  docs: {
    description: {
      story: 'Concrete patterns to follow and pitfalls to avoid. Use these to settle review discussions quickly.',
    },
  },
}

export const LegacyV3 = () => (
  <div className={s.section}>
    <Caption>
      The v3 IconButton is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>. New code should use the
      IconButton above.
    </Caption>
    <div className={s.row}>
      <LegacyIconButton kind="primary" ariaLabel="Settings" icon={Settings} />
      <LegacyIconButton kind="transparent" ariaLabel="Settings" icon={Settings} />
    </div>
  </div>
)
LegacyV3.tags = ['!dev']
