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
    <TabPanel value={0}>
      <p>Panel 1</p>
    </TabPanel>
    <TabPanel value={1}>
      <p>Panel 2</p>
    </TabPanel>
    <TabPanel value={2}>
      <p>Panel 3</p>
    </TabPanel>
    <TabPanel value={3}>
      <p>Panel 4</p>
    </TabPanel>
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
    <TabPanel value={0}>
      <p>Panel 1</p>
    </TabPanel>
    <TabPanel value={1}>
      <p>Panel 2</p>
    </TabPanel>
  </TabContextProvider>
)

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
        </TabList>
        <TabPanel value={0}>
          <p>Panel 1</p>
        </TabPanel>
        <TabPanel value={1}>
          <p>Panel 2</p>
        </TabPanel>
      </TabContextProviderControlled>
    </>
  )
}

export const NavigationTabs = () => (
  <>
    <p>By default tabs use a `button` element, but you can also use an `a` element to implement a tabbed navigation.</p>
    <TabContextProvider>
      <TabList ariaLabel="Tabs Story">
        <Tab component="a" href="#" label="Tab 1" value={0} />
        <Tab component="a" href="#" label="Tab 2" value={1} />
      </TabList>
      <TabPanel value={0}>Panel 1</TabPanel>
      <TabPanel value={1}>Panel 2</TabPanel>
    </TabContextProvider>
  </>
)
