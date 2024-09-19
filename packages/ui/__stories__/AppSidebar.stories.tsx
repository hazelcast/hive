import React from 'react'
import { Story } from '@storybook/react'
import { Disc, AlertTriangle, HardDrive, Wifi, Activity, Droplet, Airplay } from 'react-feather'

import {
  AppSidebar,
  AppSidebarSection,
  AppSidebarMenuItemCounter,
  AppSidebarItem,
  AppSidebarProps,
  AppSidebarFavorites,
} from '../src/AppSidebar'
import { Icon } from '../src/Icon'

export default {
  title: 'App/Sidebar',
  component: AppSidebar,
}

const Template: Story<Partial<AppSidebarProps>> = (props) => (
  <AppSidebar footer={<span>24/08/14 01:49 PM Ver. 5.5.0</span>} {...props}>
    <AppSidebarFavorites>{({ items }) => items.map((item) => <AppSidebarItem key={item} id={item} title={item} />)}</AppSidebarFavorites>
    <AppSidebarSection active id="maps" title="Maps wan replication" ariaLabel="maps" icon={Disc}>
      <AppSidebarItem id="1" title="Test" active />
      <AppSidebarItem title="Wan healthcheck replication" />
      <AppSidebarItem title="Test 2" />
    </AppSidebarSection>
    <AppSidebarSection active id="cluster" title="Cluster" ariaLabel="cluster" icon={HardDrive}>
      <AppSidebarItem id="2" title="Cluster-1" adornment={<AppSidebarMenuItemCounter>13</AppSidebarMenuItemCounter>} />
      <AppSidebarItem title="Cluster-2" adornment={<AppSidebarMenuItemCounter>3</AppSidebarMenuItemCounter>} />
      <AppSidebarItem title="Maps" adornment={<Icon size="small" icon={AlertTriangle} />} />
    </AppSidebarSection>
    <AppSidebarSection active={false} id="members" title="Memebers" ariaLabel="memebers" icon={Wifi}>
      <AppSidebarItem title="Cluster-1" adornment={<AppSidebarMenuItemCounter>13</AppSidebarMenuItemCounter>} />
      <AppSidebarItem title="Cluster-2" adornment={<AppSidebarMenuItemCounter>3</AppSidebarMenuItemCounter>} />
    </AppSidebarSection>
    <AppSidebarSection active={false} id="storage" title="Storage" ariaLabel="storage" icon={Activity}>
      <AppSidebarItem title="Cluster-1" adornment={<AppSidebarMenuItemCounter>13</AppSidebarMenuItemCounter>} />
    </AppSidebarSection>
    <AppSidebarSection title="TOOLS">
      <AppSidebarItem title="SQL" icon={Airplay} iconAriaLabel="SQL" onClick={console.log} />
      <AppSidebarItem title="Flow" color="authPrimary" icon={Droplet} iconAriaLabel="Flow" available={false} onClick={console.log} />
    </AppSidebarSection>
  </AppSidebar>
)

export const Default = () => <Template open />

export const WithScroll = () => {
  return (
    <div style={{ height: 200, overflow: 'hidden' }}>
      <Template open />
    </div>
  )
}

export const Collapsed = () => <Template open={false} />

export const CollapsedWithScroll = () => {
  return (
    <div style={{ height: 200, overflow: 'hidden' }}>
      <Template open={false} />
    </div>
  )
}
