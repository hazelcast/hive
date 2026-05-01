import React, { ReactNode } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ChevronDown, Download, Upload, Send, ArrowRight, Plus, Info, Check, X, Trash2, ExternalLink } from 'react-feather'

import { Button, ButtonProps, ButtonTypeAnchorProps, ButtonVariant, ButtonColor } from '../src/components/Button'
import { Button as LegacyButton } from '../src/old'

import styles from '../src/components/Button.module.css'
import s from './Button.stories.module.scss'

type Story = StoryObj<typeof Button>

const iconOptions = {
  None: undefined,
  Download,
  Upload,
  Send,
  ArrowRight,
  ChevronDown,
  Plus,
  Info,
  Check,
  X,
  Trash: Trash2,
  ExternalLink,
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
  title: 'Components/Button',
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE-Hazelcast-Design-System?node-id=492%3A67',
    },
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      exclude: [
        'bodyClassName',
        'iconLeftClassName',
        'iconRightClassName',
        'iconLeftColor',
        'iconRightColor',
        'iconLeftAriaLabel',
        'iconRightAriaLabel',
        'iconSize',
        'tabIndex',
        'style',
        'className',
        'component',
        'href',
        'rel',
        'target',
        'type',
        'onClick',
        'disabledTooltipPlacement',
      ],
    },
  },
  argTypes: {
    children: {
      name: 'label',
      control: 'text',
      description: 'The button label.',
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
    outline: {
      control: 'inline-radio',
      options: ['outline', 'inset'],
      description: 'Where the focus ring renders. Tab to the button to see it. Use `inset` when the button sits flush to a container edge.',
      table: { category: 'Appearance', defaultValue: { summary: 'outline' } },
    },
    iconLeft: {
      name: 'left icon',
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon shown before the label.',
      table: { category: 'Content' },
    },
    iconRight: {
      name: 'right icon',
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon shown after the label.',
      table: { category: 'Content' },
    },
    loading: {
      control: 'boolean',
      description: 'Show a loader instead of the leading icon while an async action is in progress.',
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
    disabledTooltipVisible: {
      control: 'boolean',
      description: 'When `false`, the tooltip falls back to showing the truncated label instead of the disabled message.',
      table: { category: 'State' },
    },
    active: {
      control: 'boolean',
      description: 'Force the active (pressed) visual state.',
      table: { category: 'State' },
    },
    truncate: {
      control: 'boolean',
      table: { category: 'Content', defaultValue: { summary: 'true' } },
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip shown on hover when the button is enabled. Leave empty to disable.',
      table: { category: 'Content' },
    },
  },
  args: {
    children: 'Save changes',
    variant: 'contained',
    color: 'primary',
    size: 'regular',
  },
} as Meta<typeof Button>

export const Playground: Story = {
  args: {
    iconLeftAriaLabel: 'leading',
    iconRightAriaLabel: 'trailing',
  },
  render: ({ tooltip, ...args }) => <Button {...args} tooltip={tooltip ? tooltip : undefined} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Tweak any prop in the Controls panel on the right. Pick icons from the **left icon** and **right icon** dropdowns. Type into **tooltip** to enable a hover tooltip; clear it to disable.',
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
          <strong>Ghost</strong> — transparent until hovered, lowest emphasis.
        </li>
        <li>
          <strong>Link</strong> — looks like a hyperlink. Ignores <code>color</code>.
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
          {COLORS.map(({ color, label: colorLabel }) => (
            <Button key={color} variant={variant} color={color}>
              {`${label} ${colorLabel}`}
            </Button>
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
      <strong>Regular</strong> is the default. Use <strong>Small</strong> in compact spaces such as toolbars and dense tables.
    </Caption>
    <div className={`${s.grid} ${s.gridSizes}`}>
      <Cell label="Regular">
        <Button size="regular">Regular</Button>
      </Cell>
      <Cell label="Small">
        <Button size="small">Small</Button>
      </Cell>
    </div>
  </div>
)
Sizes.tags = ['!dev']

export const WithIcons = () => {
  const rows: { label: string; props: Partial<ButtonProps> }[] = [
    {
      label: 'Leading',
      props: { iconLeft: Download, iconLeftAriaLabel: 'Download' },
    },
    {
      label: 'Trailing',
      props: { iconRight: ArrowRight, iconRightAriaLabel: 'Continue' },
    },
    {
      label: 'Both',
      props: {
        iconLeft: Download,
        iconLeftAriaLabel: 'Download',
        iconRight: ChevronDown,
        iconRightAriaLabel: 'More options',
      },
    },
  ]
  return (
    <div className={s.section}>
      <Caption>
        Leading icons add context to a label. Trailing icons hint at what happens next (navigation, dropdown, external link). Avoid using
        both unless the meaning is clear.
      </Caption>
      <div className={`${s.grid} ${s.gridIcons}`}>
        <span />
        {VARIANTS.map(({ variant, label }) => (
          <span key={variant} className={s.label}>
            {label}
          </span>
        ))}
        {rows.map(({ label, props }) => (
          <React.Fragment key={label}>
            <span className={s.rowLabel}>{label}</span>
            {VARIANTS.map(({ variant }) => (
              <Button key={variant} variant={variant} {...(props as ButtonProps)}>
                {label}
              </Button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
WithIcons.tags = ['!dev']

export const Loading = () => {
  const rows: { label: string; idle: Partial<ButtonProps>; loadingProps: Partial<ButtonProps> }[] = [
    {
      label: 'Label only',
      idle: {},
      loadingProps: {},
    },
    {
      label: 'With leading icon',
      idle: { iconLeft: Upload, iconLeftAriaLabel: 'Upload' },
      loadingProps: { iconLeft: Upload, iconLeftAriaLabel: 'Upload' },
    },
    {
      label: 'With trailing icon',
      idle: { iconRight: Send, iconRightAriaLabel: 'Send' },
      loadingProps: { iconRight: Send, iconRightAriaLabel: 'Send' },
    },
  ]
  return (
    <div className={s.section}>
      <Caption>
        Show a loader while waiting for an async action. The button keeps its width to avoid layout shift, stays focusable, and announces
        the busy state to assistive tech. The loader replaces the leading icon, or moves to the right when only a trailing icon is set.
      </Caption>
      {VARIANTS.map(({ variant, label }) => (
        <div key={variant} className={s.loadingGroup}>
          <span className={s.label}>{label}</span>
          <div className={`${s.grid} ${s.gridLoading}`}>
            <span />
            <span className={s.label}>Idle</span>
            <span className={s.label}>Loading</span>
            {rows.map(({ label: rowLabel, idle, loadingProps }) => (
              <React.Fragment key={rowLabel}>
                <span className={s.rowLabel}>{rowLabel}</span>
                <Button {...({ variant, ...idle } as ButtonProps)}>Save</Button>
                <Button {...({ variant, loading: true, ...loadingProps } as ButtonProps)}>Save</Button>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
Loading.tags = ['!dev']

export const FullWidth = () => (
  <div className={s.section}>
    <Caption>
      Buttons stretch to fill their container when given a block-level class. Useful in modals, narrow forms, and mobile layouts. Long
      labels truncate with an ellipsis.
    </Caption>
    <div className={s.fullWidthDemo}>
      <Button className={s.block} iconLeft={Plus} iconLeftAriaLabel="Add">
        Create new project
      </Button>
      <Button className={s.block} variant="outlined" color="secondary">
        Cancel
      </Button>
      <Button className={s.block}>Looooooooooooooooooooooooooooooooong label that gets truncated</Button>
    </div>
  </div>
)
FullWidth.tags = ['!dev']

export const Disabled = () => (
  <div className={s.section}>
    <Caption>
      Disabled buttons explain themselves. Provide a <strong>disabledTooltip</strong> describing what unblocks the action. When the label
      itself is truncated, set <strong>disabledTooltipVisible={'{false}'}</strong> so the tooltip falls back to showing the full label.
    </Caption>
    <div className={`${s.grid} ${s.gridSizes}`}>
      {VARIANTS.map(({ variant, label }) => (
        <Cell key={variant} label={label}>
          <Button variant={variant} disabled disabledTooltip={`${label} is disabled because nothing is selected.`}>
            {label}
          </Button>
        </Cell>
      ))}
    </div>
    <div className={s.fullWidthDemo}>
      <Button className={s.block} disabled disabledTooltip="This button is disabled">
        Looooooooooooooooooooooooooooooooong Label
      </Button>
      <Button className={s.block} disabled disabledTooltip="This button is disabled" disabledTooltipVisible={false}>
        Looooooooooooooooooooooooooooooooong Label (tooltip shows full label)
      </Button>
    </div>
  </div>
)
Disabled.tags = ['!dev']

export const AsLink = () => {
  const linkProps: ButtonProps<ButtonTypeAnchorProps> = {
    component: 'a',
    href: '#',
    children: 'Open docs',
  }
  return (
    <div className={s.section}>
      <Caption>
        Pass <strong>component=&quot;a&quot;</strong> and an <strong>href</strong> to render an anchor that looks like a button. All
        variants support link semantics.
      </Caption>
      <div className={`${s.grid} ${s.gridSizes}`}>
        <Cell label="Contained">
          <Button {...linkProps} />
        </Cell>
        <Cell label="Outlined">
          <Button {...linkProps} variant="outlined" color="secondary" />
        </Cell>
        <Cell label="Ghost">
          <Button {...linkProps} variant="ghost" color="secondary" />
        </Cell>
      </div>
    </div>
  )
}
AsLink.tags = ['!dev']

export const States = () => {
  const stateRows: { label: string; className?: string; active?: boolean; disabled?: boolean }[] = [
    { label: 'Default' },
    { label: 'Hover', className: styles.hover },
    { label: 'Focus', className: styles.focus },
    { label: 'Active', active: true },
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
            {stateRows.map((r) => {
              const disabledProps = r.disabled ? ({ disabled: true, disabledTooltip: 'Disabled' } as const) : null
              return disabledProps ? (
                <Button key={r.label} variant={variant} className={r.className} active={r.active} {...disabledProps}>
                  {label}
                </Button>
              ) : (
                <Button key={r.label} variant={variant} className={r.className} active={r.active}>
                  {label}
                </Button>
              )
            })}
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

export const InsetOutline: Story = {
  args: { outline: 'inset' },
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: when a button sits flush against the edge of a container, use `outline="inset"` so the focus ring renders inside the button.',
      },
    },
  },
}

type DoDontPair = {
  heading: string
  good: { note: string; demo: ReactNode }
  bad: { note: string; demo: ReactNode }
}

const DO_DONT_PAIRS: DoDontPair[] = [
  {
    heading: 'One primary per group',
    good: {
      note: 'Pair a primary with a secondary so the hierarchy is obvious.',
      demo: (
        <>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button>Save changes</Button>
        </>
      ),
    },
    bad: {
      note: 'Two primaries compete — users can\u2019t tell which action is recommended.',
      demo: (
        <>
          <Button>Discard</Button>
          <Button>Save changes</Button>
        </>
      ),
    },
  },
  {
    heading: 'Sentence case, verb-led labels',
    good: {
      note: 'Lead with a verb. Use sentence case. Be specific about what happens.',
      demo: (
        <>
          <Button>Create project</Button>
          <Button variant="outlined" color="secondary">
            Invite members
          </Button>
        </>
      ),
    },
    bad: {
      note: 'Avoid ALL CAPS, title case, and vague labels like OK or Submit.',
      demo: (
        <>
          <Button>SAVE CHANGES</Button>
          <Button variant="outlined" color="secondary">
            OK
          </Button>
        </>
      ),
    },
  },
  {
    heading: 'Danger actions need context',
    good: {
      note: 'Use a danger button in a confirmation, paired with a clear cancel.',
      demo: (
        <>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button color="danger" iconLeft={Trash2} iconLeftAriaLabel="Delete">
            Delete project
          </Button>
        </>
      ),
    },
    bad: {
      note: 'Don\u2019t place a destructive button inline next to unrelated actions — easy to fire by accident.',
      demo: (
        <>
          <Button variant="ghost" color="secondary">
            Edit
          </Button>
          <Button variant="ghost" color="secondary">
            Duplicate
          </Button>
          <Button color="danger">Delete</Button>
        </>
      ),
    },
  },
  {
    heading: 'Use IconButton for icon-only',
    good: {
      note: 'Keep a visible label so the action is announced and tappable.',
      demo: (
        <Button iconLeft={Plus} iconLeftAriaLabel="Add">
          Add member
        </Button>
      ),
    },
    bad: {
      note: 'Button without a label has no accessible name. Reach for IconButton instead.',
      demo: (
        <Button iconLeft={Plus} iconLeftAriaLabel="Add">
          {''}
        </Button>
      ),
    },
  },
  {
    heading: 'Keep labels on one line',
    good: {
      note: 'Short, scannable labels. Truncate with an ellipsis if the container is narrow.',
      demo: <Button>Save changes</Button>,
    },
    bad: {
      note: 'Don\u2019t force a button to wrap or stuff a sentence into the label.',
      demo: (
        <div style={{ width: 140 }}>
          <Button className={s.block} truncate={false}>
            Save all of the changes you just made
          </Button>
        </div>
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
      The v3 Button is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>. New code should use the Button
      above.
    </Caption>
    <div className={s.row}>
      <LegacyButton>Primary</LegacyButton>
      <LegacyButton variant="outlined">Outlined</LegacyButton>
      <LegacyButton variant="text">Text</LegacyButton>
      <LegacyButton color="secondary">Secondary</LegacyButton>
    </div>
  </div>
)
LegacyV3.tags = ['!dev']
