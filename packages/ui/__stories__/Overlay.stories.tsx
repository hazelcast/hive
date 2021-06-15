import React, { FC, useState } from 'react'
import { Settings } from 'react-feather'

import { Button, Card, Tab, TabContextProvider, TabList, TabPanel, Overlay } from '../src'

import styles from './Overlay.stories.module.scss'

export default {
  title: 'Components/Overlay',
  component: Overlay,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 700,
    },
  },
}

const onClose = () => console.log('onClose')
const title = 'Settings'
const Content = (
  <TabContextProvider>
    <TabList ariaLabel="Settings Tabs" className={styles.tablist}>
      <Tab label="My Account" value={0} />
      <Tab label="Billing" value={1} />
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
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const parentSelector = () => document.getElementById(appElementId)!
const AppElement: FC = ({ children }) => <div id={appElementId}>{children}</div>

export const Default = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <AppElement>
      <Overlay icon={Settings} title={title} isOpen={isOpen} onClose={() => setIsOpen(false)} parentSelector={parentSelector}>
        {Content}
      </Overlay>
      <Button onClick={() => setIsOpen(true)}>Open Overlay</Button>
    </AppElement>
  )
}

export const Open = () => (
  <AppElement>
    <Overlay icon={Settings} title={title} isOpen onClose={onClose} parentSelector={parentSelector}>
      {Content}
    </Overlay>
  </AppElement>
)

export const NotClosable = () => (
  <AppElement>
    <Overlay icon={Settings} title={title} isOpen onClose={onClose} parentSelector={parentSelector} closable={false}>
      {Content}
    </Overlay>
  </AppElement>
)

export const OpenFullscreen = () => (
  <AppElement>
    <Overlay icon={Settings} title={title} isOpen onClose={onClose} parentSelector={parentSelector} contentWidth="fullscreen">
      {Content}
    </Overlay>
  </AppElement>
)

export const OpenFullscreenFullheight = () => (
  <AppElement>
    <Overlay icon={Settings} title={title} isOpen onClose={onClose} parentSelector={parentSelector} contentWidth="fullscreen">
      <div style={{ height: '100%', background: 'red' }}>{Content}</div>
    </Overlay>
  </AppElement>
)

export const OpenFullscreenLongContent = () => (
  <AppElement>
    <Overlay icon={Settings} title={title} isOpen onClose={onClose} parentSelector={parentSelector} contentWidth="fullscreen">
      <div style={{ height: '3000px', background: 'red' }}></div>
    </Overlay>
  </AppElement>
)
