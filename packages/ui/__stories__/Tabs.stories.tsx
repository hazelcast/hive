import React from 'react'

import { TabContextComponent } from '../src/Tabs/TabContext'
import { TabList } from '../src/Tabs/TabList'
import { Tab } from '../src/Tabs/Tab'

export default {
  title: 'Components/Tabs',
  component: TabList,
}

export const Default = () => (
  <TabContextComponent>
    <TabList ariaLabel="SQL browser menu">
      <Tab label="Query Results" value={0} />
      <Tab label="JSON View" value={1} />
      <Tab label="History" value={2} />
    </TabList>
    {/* <TabPanel value={0}>Panel 1</TabPanel>
    <TabPanel value={1}>Panel 2</TabPanel>
    <TabPanel value={2}>Panel 3</TabPanel> */}
  </TabContextComponent>
)

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE?node-id=880%3A4409',
  },
}
