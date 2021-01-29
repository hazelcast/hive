import React, { useState } from 'react'

import { TabContextProvider, TabContextProviderControlled } from '../src/Tabs/TabContext'
import { TabList } from '../src/Tabs/TabList'
import { Tab } from '../src/Tabs/Tab'
import { TabPanel } from '../src/Tabs/TabPanel'

export default {
  title: 'Components/Tabs',
  component: TabList,
}

export const Default = () => (
  <TabContextProvider>
    <TabList ariaLabel="Tabs Story">
      <Tab label="Tab 1" value={0} />
      <Tab label="Tab 2" value={1} />
      <Tab label="Tab 3" value={2} />
      <Tab label="Tab 4" value={3} />
    </TabList>
    <TabPanel value={0}>Panel 1</TabPanel>
    <TabPanel value={1}>Panel 2</TabPanel>
    <TabPanel value={2}>Panel 3</TabPanel>
    <TabPanel value={3}>Panel 4</TabPanel>
  </TabContextProvider>
)

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=880%3A4409',
  },
}

export const FullWidth = () => (
  <TabContextProvider fullWidth>
    <TabList ariaLabel="Tabs Story">
      <Tab label="Tab 1" value={0} />
      <Tab label="Tab 2" value={1} />
    </TabList>
    <TabPanel value={0}>Panel 1</TabPanel>
    <TabPanel value={1}>Panel 2</TabPanel>
  </TabContextProvider>
)

export const Controlled = () => {
  const [value, setValue] = useState<number>(0)

  return (
    <>
      <div>You can have more control over the value state by using TabContextProviderControlled component.</div>
      <div>Active Tab: {value + 1}</div>
      <TabContextProviderControlled value={value} onChange={setValue}>
        <TabList ariaLabel="Tabs Story">
          <Tab label="Tab 1" value={0} />
          <Tab label="Tab 2" value={1} />
        </TabList>
        <TabPanel value={0}>Panel 1</TabPanel>
        <TabPanel value={1}>Panel 2</TabPanel>
      </TabContextProviderControlled>
    </>
  )
}
