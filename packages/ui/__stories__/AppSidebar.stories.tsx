import React from 'react'
import { Disc, HardDrive, Wifi, Activity, Airplay } from 'react-feather'

import { AppSidebar, AppSidebarSection, AppSidebarMenuItemCounter, AppSidebarItem } from '../src/AppSidebar'

export default {
  title: 'App/Sidebar',
  component: AppSidebar,
}

export const Default = () => {
  return (
    <div style={{ height: 200, overflow: 'hidden' }}>
      <AppSidebar>
        <AppSidebarSection active id="maps" title="Maps wan replication" ariaLabel="maps" icon={Disc}>
          <a href="/">
            <AppSidebarItem id="1" title="Test" active />
          </a>
          <AppSidebarItem title="Wan healthcheck replication" />
          <AppSidebarItem title="Test 2" />
        </AppSidebarSection>
        <AppSidebarSection active={false} id="cluster" title="Cluster" ariaLabel="cluster" icon={HardDrive}>
          <AppSidebarItem id="2" title="Cluster-1" adornment={<AppSidebarMenuItemCounter>13</AppSidebarMenuItemCounter>} />
          <AppSidebarItem title="Cluster-2" adornment={<AppSidebarMenuItemCounter>3</AppSidebarMenuItemCounter>} />
        </AppSidebarSection>
        <AppSidebarSection active={false} id="members" title="Memebers" ariaLabel="memebers" icon={Wifi}>
          <AppSidebarItem title="Cluster-1" adornment={<AppSidebarMenuItemCounter>13</AppSidebarMenuItemCounter>} />
          <AppSidebarItem title="Cluster-2" adornment={<AppSidebarMenuItemCounter>3</AppSidebarMenuItemCounter>} />
        </AppSidebarSection>
        <AppSidebarSection active={false} id="storage" title="Storage" ariaLabel="storage" icon={Activity}>
          <AppSidebarItem title="Cluster-1" adornment={<AppSidebarMenuItemCounter>13</AppSidebarMenuItemCounter>} />
        </AppSidebarSection>
        <AppSidebarSection title="Tools">
          <AppSidebarItem title="SQL" icon={Airplay} iconAriaLabel="SQL" onClick={console.log} />
        </AppSidebarSection>
      </AppSidebar>
    </div>
  )
}
