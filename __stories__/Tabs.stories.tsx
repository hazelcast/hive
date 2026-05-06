import React, { ReactNode, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Settings, Info, PenTool } from 'react-feather'

import { TabContextProvider, TabContextProviderControlled } from '../src/components/Tabs/TabContext'
import { TabList } from '../src/components/Tabs/TabList'
import { AnchorTabProps, ButtonTabProps, Tab } from '../src/components/Tabs/Tab'
import { TabPanel } from '../src/components/Tabs/TabPanel'
import {
  TabContextProvider as LegacyTabContextProvider,
  TabList as LegacyTabList,
  Tab as LegacyTab,
  TabPanel as LegacyTabPanel,
} from '../src/old'
import { Icon } from '../src/components/Icon'
import s from './Button.stories.module.scss'

type Story = StoryObj<typeof TabList>

type PlaygroundArgs = {
  fullWidth: boolean
  navigation: boolean
  tab1: string
  tab2: string
  tab3: string
}

type TabsDemoProps = {
  fullWidth?: boolean
  navigation?: boolean
  labels?: [string, string, string]
  withIcons?: boolean
  customLabel?: boolean
  value?: number
  onChange?: (value: number) => void
}

const Caption = ({ children }: { children: ReactNode }) => <div className={s.caption}>{children}</div>

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={s.cell}>
    <span className={s.label}>{label}</span>
    {children}
  </div>
)

const TabPanels = ({ labels }: { labels: [string, string, string] }) => (
  <>
    <TabPanel value={0}>
      <p>Content for {labels[0].toLowerCase()}</p>
    </TabPanel>
    <TabPanel value={1}>
      <p>Content for {labels[1].toLowerCase()}</p>
    </TabPanel>
    <TabPanel value={2}>
      <p>Content for {labels[2].toLowerCase()}</p>
    </TabPanel>
  </>
)

const iconByIndex = [Info, PenTool, Settings]

const TabsDemo = ({
  fullWidth = true,
  navigation,
  labels = ['Tab 1', 'Tab 2', 'Tab 3'],
  withIcons,
  customLabel,
  value,
  onChange,
}: TabsDemoProps) => {
  const frameStyle = fullWidth ? ({ width: 1121, maxWidth: '100%', padding: '0 24px', boxSizing: 'border-box' } as const) : undefined

  const tabProps: AnchorTabProps | ButtonTabProps = navigation
    ? {
        component: 'a',
        href: '#',
      }
    : {}

  const content = (
    <>
      <TabList ariaLabel="Tabs demo">
        {labels.map((label, idx) => {
          const icon = iconByIndex[idx] ?? Settings
          return (
            <Tab key={label} ariaLabel={label} value={idx} {...tabProps}>
              {withIcons ? <Icon icon={icon} size="small" ariaLabel={label} /> : null}
              {customLabel ? (
                <>
                  <strong>{label.split(' ')[0]}</strong> {idx + 1}
                </>
              ) : (
                label
              )}
            </Tab>
          )
        })}
      </TabList>
      <TabPanels labels={labels} />
    </>
  )

  if (typeof value === 'number' && onChange) {
    return (
      <TabContextProviderControlled value={value} onChange={onChange} fullWidth={fullWidth}>
        <div style={frameStyle}>{content}</div>
      </TabContextProviderControlled>
    )
  }

  return (
    <TabContextProvider fullWidth={fullWidth}>
      <div style={frameStyle}>{content}</div>
    </TabContextProvider>
  )
}

const PlaygroundComponent = ({ fullWidth, navigation, tab1, tab2, tab3 }: PlaygroundArgs) => {
  const [value, setValue] = useState(0)
  return <TabsDemo value={value} onChange={setValue} fullWidth={fullWidth} navigation={navigation} labels={[tab1, tab2, tab3]} />
}

export default {
  title: 'Components/Tabs',
  component: TabList,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/uGTDLFJEVy4dCNIhlmTPRw/%F0%9F%90%9D-HIVE-3.0?node-id=88-790',
    },
    docs: {
      canvas: { sourceState: 'hidden' },
    },
    controls: {
      exclude: ['ariaLabel', 'children', 'className'],
    },
  },
  argTypes: {
    fullWidth: {
      control: 'boolean',
      table: { category: 'Layout' },
      description: 'Stretch tabs to fill the row width equally.',
    },
    navigation: {
      control: 'boolean',
      table: { category: 'Behavior' },
      description: 'Render tabs as links (`component="a"`) instead of buttons.',
    },
    tab1: {
      control: 'text',
      table: { category: 'Content' },
    },
    tab2: {
      control: 'text',
      table: { category: 'Content' },
    },
    tab3: {
      control: 'text',
      table: { category: 'Content' },
    },
  },
  args: {
    fullWidth: true,
    navigation: false,
    tab1: 'Tab 1',
    tab2: 'Tab 2',
    tab3: 'Tab 3',
  },
} as Meta<PlaygroundArgs>

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Tweak any prop in the Controls panel on the right. Rename tabs via **tab1**, **tab2**, **tab3**. Toggle **fullWidth** to stretch the list and **navigation** to render anchor tabs.',
      },
    },
  },
}

export const Basic = () => (
  <div className={s.section}>
    <Caption>
      Tabs organize related content within one surface. Use concise labels and keep the count low enough that users can scan options
      quickly.
    </Caption>
    <TabsDemo fullWidth={false} labels={['Tab 1', 'Tab 2', 'Tab 3']} />
  </div>
)
Basic.tags = ['!dev']

export const FullWidth = () => (
  <div className={s.section}>
    <Caption>
      Use <strong>fullWidth</strong> when tabs should span the entire row. This matches the selected Hive 4.0 design for container-level tab
      navigation.
    </Caption>
    <TabsDemo fullWidth labels={['Tab 1', 'Tab 2', 'Tab 3']} />
  </div>
)
FullWidth.tags = ['!dev']

export const Navigation = () => (
  <div className={s.section}>
    <Caption>
      Render tabs as links when each tab maps to URL navigation. Use this for route-driven pages where users can deep-link directly to a
      tab.
    </Caption>
    <TabsDemo fullWidth={false} navigation labels={['Overview', 'Metrics', 'Settings']} />
  </div>
)
Navigation.tags = ['!dev']

export const Controlled = () => {
  const [value, setValue] = useState(0)
  return (
    <div className={s.section}>
      <Caption>
        Use <strong>TabContextProviderControlled</strong> when the active tab is controlled from outside (URL, persisted preferences, or
        analytics state).
      </Caption>
      <p className={s.caption}>
        Active tab index: <strong>{value}</strong>
      </p>
      <TabsDemo fullWidth={false} value={value} onChange={setValue} labels={['Tab 1', 'Tab 2', 'Tab 3']} />
    </div>
  )
}
Controlled.tags = ['!dev']

export const WithIcons = () => (
  <div className={s.section}>
    <Caption>
      Icons can improve recognition, but the text label must still carry the meaning. Keep icon usage consistent across all tabs.
    </Caption>
    <TabsDemo fullWidth={false} withIcons labels={['Info', 'Design', 'Settings']} />
  </div>
)
WithIcons.tags = ['!dev']

export const CustomLabel = () => (
  <div className={s.section}>
    <Caption>Rich labels are supported, but keep labels short and legible. Avoid heavy formatting that makes scanning harder.</Caption>
    <TabsDemo fullWidth={false} customLabel labels={['Tab 1', 'Tab 2', 'Tab 3']} />
  </div>
)
CustomLabel.tags = ['!dev']

export const States = () => (
  <div className={s.section}>
    <Caption>
      QA matrix for visual verification. Each row sets a different active tab so engineers can validate selected styling and panel
      switching.
    </Caption>
    <div className={`${s.grid} ${s.gridSizes}`}>
      <Cell label="Active: Tab 1">
        <TabsDemo fullWidth={false} value={0} onChange={() => {}} labels={['Tab 1', 'Tab 2', 'Tab 3']} />
      </Cell>
      <Cell label="Active: Tab 2">
        <TabsDemo fullWidth={false} value={1} onChange={() => {}} labels={['Tab 1', 'Tab 2', 'Tab 3']} />
      </Cell>
      <Cell label="Active: Tab 3">
        <TabsDemo fullWidth={false} value={2} onChange={() => {}} labels={['Tab 1', 'Tab 2', 'Tab 3']} />
      </Cell>
    </div>
  </div>
)
States.parameters = {
  docs: {
    description: {
      story: 'Visual QA matrix. Not part of the public design spec - included so engineers can verify selected tab state quickly.',
    },
  },
}
States.tags = ['!dev']

export const DoVsDont = () => (
  <div className={s.doDont}>
    <div className={s.doDontRow}>
      <h3 className={s.doDontHeading}>Label Length</h3>
      <div className={`${s.doDontCard} ${s.doDontGood}`}>
        <div className={s.doDontMarker}>Do</div>
        <div className={s.doDontDemo}>
          <TabsDemo fullWidth={false} value={0} onChange={() => {}} labels={['Overview', 'Metrics', 'Settings']} />
        </div>
        <p className={s.doDontNote}>Use short, parallel labels that are easy to scan.</p>
      </div>
      <div className={`${s.doDontCard} ${s.doDontBad}`}>
        <div className={s.doDontMarker}>Don&apos;t</div>
        <div className={s.doDontDemo}>
          <TabsDemo
            fullWidth={false}
            value={0}
            onChange={() => {}}
            labels={['Overview and summary details', 'Performance metrics and health', 'Settings and configuration']}
          />
        </div>
        <p className={s.doDontNote}>Avoid sentence-length tab labels.</p>
      </div>
    </div>

    <div className={s.doDontRow}>
      <h3 className={s.doDontHeading}>Hierarchy</h3>
      <div className={`${s.doDontCard} ${s.doDontGood}`}>
        <div className={s.doDontMarker}>Do</div>
        <div className={s.doDontDemo}>
          <TabsDemo fullWidth={false} value={0} onChange={() => {}} labels={['General', 'Security', 'Notifications']} />
        </div>
        <p className={s.doDontNote}>Use one clear tab row per content section.</p>
      </div>
      <div className={`${s.doDontCard} ${s.doDontBad}`}>
        <div className={s.doDontMarker}>Don&apos;t</div>
        <div className={s.doDontDemo}>
          <TabsDemo fullWidth={false} value={0} onChange={() => {}} labels={['General', 'Security', 'Notifications']} />
          <TabsDemo fullWidth={false} value={0} onChange={() => {}} labels={['Billing', 'Access', 'Audit']} />
        </div>
        <p className={s.doDontNote}>Do not stack nested tab bars unless absolutely required.</p>
      </div>
    </div>
  </div>
)
DoVsDont.tags = ['!dev']

export const LegacyV3 = () => (
  <div className={s.section}>
    <Caption>
      The v3 Tabs is preserved for gradual migration. Import from <strong>@hazelcast/ui/old</strong>. New code should use the Tabs above.
    </Caption>
    <div className={s.row}>
      <LegacyTabContextProvider>
        <LegacyTabList ariaLabel="Tabs demo">
          <LegacyTab value={0}>General</LegacyTab>
          <LegacyTab value={1}>Security</LegacyTab>
          <LegacyTab value={2}>Notifications</LegacyTab>
        </LegacyTabList>
        <LegacyTabPanel value={0}>Content for General</LegacyTabPanel>
        <LegacyTabPanel value={1}>Content for Security</LegacyTabPanel>
        <LegacyTabPanel value={2}>Content for Notifications</LegacyTabPanel>
      </LegacyTabContextProvider>
    </div>
  </div>
)
LegacyV3.tags = ['!dev']
