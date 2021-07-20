import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { Settings, Info, PenTool } from 'react-feather'

import { TabContextProvider, TabContextProviderControlled } from '../src/Tabs/TabContext'
import { TabList } from '../src/Tabs/TabList'
import { AnchorTabProps, ButtonTabProps, Tab } from '../src/Tabs/Tab'
import { TabPanel } from '../src/Tabs/TabPanel'

type Args = {
  fullWidth: boolean
  navigation: boolean
}

export default {
  title: 'Components/Tabs',
  component: TabList,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=880%3A4409',
    },
  },
  args: {
    fullWidth: false,
    navigation: false,
  },
} as Meta<Args>

const Template: Story<Args> = (args) => {
  const tabProps: AnchorTabProps | ButtonTabProps = args.navigation
    ? {
        component: 'a',
        href: '#',
      }
    : {}

  return (
    <TabContextProvider fullWidth={args.fullWidth}>
      <TabList ariaLabel="Tabs Story">
        <Tab label="Tab 1" value={0} {...tabProps} />
        <Tab label="Tab 2" value={1} {...tabProps} />
        <Tab label="Tab 3" value={2} {...tabProps} />
      </TabList>
      <TabPanel value={0}>
        <p>Panel 1</p>
      </TabPanel>
      <TabPanel value={1}>
        <p>Panel 2</p>
      </TabPanel>
      <TabPanel value={2}>
        <p>Panel 3</p>
      </TabPanel>
    </TabContextProvider>
  )
}

export const Default = Template.bind({})

export const FullWidth = Template.bind({})
FullWidth.args = {
  fullWidth: true,
}

export const Navigation = Template.bind({})
Navigation.args = {
  navigation: true,
}

export const Controlled = () => {
  const [value, setValue] = useState<number>(0)

  return (
    <>
      <p>
        You can have more control over the value state by using TabContextProviderControlled component and providing your own `value` and
        `onChange` props.
      </p>
      <p>Active Tab: {value + 1}</p>
      <TabContextProviderControlled value={value} onChange={setValue}>
        <TabList ariaLabel="Tabs Story">
          <Tab label="Tab 1" value={0} />
          <Tab label="Tab 2" value={1} />
          <Tab label="Tab 3" value={2} />
        </TabList>
        <TabPanel value={0}>
          <p>Panel 1</p>
        </TabPanel>
        <TabPanel value={1}>
          <p>Panel 2</p>
        </TabPanel>
        <TabPanel value={2}>
          <p>Panel 3</p>
        </TabPanel>
      </TabContextProviderControlled>
    </>
  )
}

export const WithIcons = () => (
  <TabContextProvider>
    <TabList ariaLabel="Tabs Story">
      <Tab label="Tab 1" value={0} icon={Info} iconAriaLabel="Info" />
      <Tab label="Tab 2" value={1} icon={PenTool} iconAriaLabel="PenTool" />
      <Tab label="Tab 3" value={2} icon={Settings} iconAriaLabel="Settings" />
    </TabList>
    <TabPanel value={0}>
      <p>Panel 1</p>
    </TabPanel>
    <TabPanel value={1}>
      <p>Panel 2</p>
    </TabPanel>
    <TabPanel value={2}>
      <p>Panel 3</p>
    </TabPanel>
  </TabContextProvider>
)
