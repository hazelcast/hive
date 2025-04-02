import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { Button, Card, Tab, TabList, TabPanel, Overlay, TabContextProvider } from '../src'

import styles from './Overlay.stories.module.scss'
import { OverlayProps } from '../src/components/Overlay'

const content = (
  <TabContextProvider>
    <TabList ariaLabel="Settings Tabs" className={styles.tablist}>
      <Tab value={0}>My Account</Tab>
      <Tab value={1}>Billing</Tab>
    </TabList>
    <TabPanel value={0}>
      <Card title="Account Information">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis tortor sed nibh elementum congue. Phasellus leo mi,
          pellentesque in consequat sed, semper id felis. Quisque sed eros tristique, suscipit libero eu, varius ex. Mauris luctus sem et
          lorem tincidunt, id pellentesque eros pretium. Fusce consectetuer risus a nunc. Vestibulum fermentum tortor id mi. Ut tempus purus
          at lorem. Aliquam erat volutpat. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Curabitur vitae diam non enim
          vestibulum interdum. Aliquam in lorem sit amet leo accumsan lacinia.
        </p>
        <p>
          Etiam bibendum elit eget erat. Maecenas sollicitudin. Sed ac dolor sit amet purus malesuada congue. Quisque tincidunt scelerisque
          libero. Maecenas lorem. Suspendisse nisl. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus
          maiores alias consequatur aut perferendis doloribus asperiores repellat. Etiam posuere lacus quis dolor. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Ut tempus purus at lorem. Vivamus
          luctus egestas leo. Nullam sit amet magna in magna gravida vehicula.
        </p>
      </Card>
    </TabPanel>
    <TabPanel value={1}>
      <Card title="What do I pay for?">
        <p>
          Etiam bibendum elit eget erat. Maecenas sollicitudin. Sed ac dolor sit amet purus malesuada congue. Quisque tincidunt scelerisque
          libero. Maecenas lorem. Suspendisse nisl. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus
          maiores alias consequatur aut perferendis doloribus asperiores repellat. Etiam posuere lacus quis dolor. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Ut tempus purus at lorem. Vivamus
          luctus egestas leo. Nullam sit amet magna in magna gravida vehicula.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis tortor sed nibh elementum congue. Phasellus leo mi,
          pellentesque in consequat sed, semper id felis. Quisque sed eros tristique, suscipit libero eu, varius ex. Mauris luctus sem et
          lorem tincidunt, id pellentesque eros pretium. Fusce consectetuer risus a nunc. Vestibulum fermentum tortor id mi. Ut tempus purus
          at lorem. Aliquam erat volutpat. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Curabitur vitae diam non enim
          vestibulum interdum. Aliquam in lorem sit amet leo accumsan lacinia.
        </p>
      </Card>
    </TabPanel>
  </TabContextProvider>
)
const appElementId = 'overlay-app-id'

export default {
  title: 'Components/Overlay',
  component: Overlay,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 700,
    },
  },
  args: {
    title: 'Settings',
    children: content,
    isOpen: true,

    parentSelector: () => document.getElementById(appElementId)!,
  },
} as Meta<OverlayProps>

const Template: StoryFn<OverlayProps> = ({ isOpen: isOpenInitially, ...args }) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenInitially)

  return (
    <div id={appElementId}>
      <Overlay {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Button onClick={() => setIsOpen(true)}>Open Overlay</Button>
    </div>
  )
}

export const Default = Template.bind({})

export const WithoutCloseText = Template.bind({})
WithoutCloseText.args = {
  closeText: null,
}

export const WithoutTitle = Template.bind({})
WithoutTitle.args = {
  title: undefined,
}

export const NotClosable = Template.bind({})
NotClosable.args = {
  closable: false,
}

export const Fullscreen = Template.bind({})
Fullscreen.args = {
  contentWidth: 'fullscreen',
}

export const FullscreenWithFullHeightContent = Template.bind({})
FullscreenWithFullHeightContent.args = {
  ...Fullscreen.args,
  children: <div style={{ height: '100%', background: '#87a7ee' }}>{content}</div>,
}

export const FullscreenWithLongContent = Template.bind({})
FullscreenWithLongContent.args = {
  ...Fullscreen.args,
  children: <div style={{ height: '3500px', background: '#87a7ee' }}>{content}</div>,
}
