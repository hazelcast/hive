import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react-webpack5'
import { Activity, Database, Home, Layers, Menu, Settings, Terminal } from 'react-feather'

import { AppSidebarFavorites, AppSidebarItem, AppSidebarMenuItemCounter, AppSidebarSection } from '../src/components/AppSidebar'
import {
  SideNavigation,
  SideNavigationItem,
  SideNavigationLinkProps,
  SideNavigationProps,
  SideNavigationSection,
} from '../src/components/SideNavigation'
import { IconButton } from '../src/components/IconButton'
import styles from './SideNavigation.stories.module.css'

const CloudItems = ({ onNavigate }: { onNavigate?: () => void }) => (
  <>
    <SideNavigationSection>
      <SideNavigationItem label="Overview" icon={Home} href="#overview" active onClick={onNavigate} />
      <SideNavigationItem label="Clusters" icon={Layers} href="#clusters" badge={3} onClick={onNavigate} />
    </SideNavigationSection>
    <SideNavigationSection label="Cluster">
      <SideNavigationItem label="Metrics" icon={Activity} href="#metrics" onClick={onNavigate} />
      <SideNavigationItem label="SQL" icon={Terminal} disabled disabledTooltip="Select a cluster first" />
      <SideNavigationItem label="Settings" icon={Settings} href="#settings" onClick={onNavigate} />
    </SideNavigationSection>
  </>
)

const McItems = () => (
  <>
    <AppSidebarFavorites>{({ items }) => items.map((item) => <AppSidebarItem key={item} title={item} />)}</AppSidebarFavorites>
    <AppSidebarSection id="cluster" title="Cluster" ariaLabel="Cluster" icon={Layers} active>
      <AppSidebarItem id="members" title="Members" adornment={<AppSidebarMenuItemCounter>3</AppSidebarMenuItemCounter>} />
      <AppSidebarItem title="Clients" adornment={<AppSidebarMenuItemCounter>12</AppSidebarMenuItemCounter>} />
    </AppSidebarSection>
    <AppSidebarSection id="storage" title="Storage" ariaLabel="Storage" icon={Database} active={false}>
      <AppSidebarItem id="maps" title="Maps" adornment={<AppSidebarMenuItemCounter>3</AppSidebarMenuItemCounter>} />
      <AppSidebarItem id="flake" title="Flake ID Generators" adornment={<AppSidebarMenuItemCounter>12</AppSidebarMenuItemCounter>} />
    </AppSidebarSection>
    <AppSidebarSection title="Tools">
      <AppSidebarItem title="SQL" icon={Terminal} iconAriaLabel="SQL" />
    </AppSidebarSection>
  </>
)

type PlaygroundArgs = SideNavigationProps & { composition: 'cloud' | 'management-center' }

export default {
  title: 'Components/SideNavigation',
  component: SideNavigation,
  parameters: { layout: 'centered', docs: { canvas: { sourceState: 'hidden' } } },
  argTypes: {
    composition: {
      control: 'inline-radio',
      options: ['cloud', 'management-center'],
      description: 'Select the example navigation content.',
      table: { category: 'Content' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the navigation and mobile dialog.',
      table: { category: 'Accessibility' },
    },
    id: { control: 'text', description: 'Stable target for external controls.', table: { category: 'Accessibility' } },
    mobile: { control: 'boolean', description: 'Render the mobile drawer instead of the desktop rail.', table: { category: 'Layout' } },
    initialOpen: { control: 'boolean', description: 'Initial uncontrolled desktop expansion.', table: { category: 'State' } },
    initialMobileOpen: { control: 'boolean', description: 'Initial uncontrolled drawer state.', table: { category: 'State' } },
    showMobileTrigger: { control: 'boolean', table: { category: 'Layout' } },
    mobileDialogClassName: { control: false, description: 'Class for positioning the drawer and backdrop.', table: { category: 'Layout' } },
    hideFooterWhenCollapsed: { control: 'boolean', table: { category: 'Layout' } },
    open: { control: false, description: 'Controlled desktop expansion.', table: { category: 'State' } },
    onOpenChange: { control: false, table: { category: 'Events' } },
    mobileOpen: { control: false, description: 'Controlled mobile drawer state.', table: { category: 'State' } },
    onMobileOpenChange: { control: false, table: { category: 'Events' } },
    children: { control: false },
    footer: { control: false },
    className: { control: false },
    storageKey: { control: false },
    'data-test': { control: false },
  },
  args: {
    ariaLabel: 'Main navigation',
    composition: 'cloud',
    mobile: false,
    initialOpen: true,
    initialMobileOpen: false,
    showMobileTrigger: true,
  },
} satisfies Meta<PlaygroundArgs>

type Story = StoryObj<PlaygroundArgs>

const PlaygroundExample = ({ composition, ...args }: PlaygroundArgs) => {
  const [open, setOpen] = useState(args.initialOpen ?? true)
  const [mobileOpen, setMobileOpen] = useState(args.initialMobileOpen ?? false)
  return (
    <div className={styles.frame}>
      <SideNavigation
        {...args}
        open={open}
        onOpenChange={setOpen}
        mobileOpen={args.mobile ? mobileOpen : undefined}
        onMobileOpenChange={args.mobile ? setMobileOpen : undefined}
        storageKey="side-navigation-playground"
      >
        {composition === 'management-center' ? <McItems /> : <CloudItems onNavigate={() => setMobileOpen(false)} />}
      </SideNavigation>
    </div>
  )
}

export const Playground: Story = {
  render: (args) => (
    <PlaygroundExample key={`${args.composition}-${args.mobile}-${args.initialOpen}-${args.initialMobileOpen}`} {...args} />
  ),
}

export const CloudComposition: Story = {
  tags: ['!dev'],
  render: () => (
    <div className={styles.frame}>
      <SideNavigation ariaLabel="Cloud navigation" initialOpen={false} storageKey="side-navigation-cloud">
        <CloudItems />
      </SideNavigation>
    </div>
  ),
}

export const ManagementCenterComposition: Story = {
  tags: ['!dev'],
  render: () => (
    <div className={styles.frame}>
      <SideNavigation
        ariaLabel="Management Center navigation"
        storageKey="side-navigation-mc"
        footer="Management Center"
        hideFooterWhenCollapsed
      >
        <McItems />
      </SideNavigation>
    </div>
  ),
}

const LinkAdapter = ({ href, ...props }: SideNavigationLinkProps) => <a href={href} {...props} />

export const LinkRendering: Story = {
  tags: ['!dev'],
  render: () => (
    <div className={styles.frame}>
      <SideNavigation ariaLabel="Main navigation">
        <SideNavigationItem
          label="Documentation"
          icon={Home}
          href="https://docs.hazelcast.com"
          target="_blank"
          rel="noopener noreferrer"
          as={LinkAdapter}
        />
      </SideNavigation>
    </div>
  ),
}

export const Collapsed: Story = {
  tags: ['!dev'],
  render: () => (
    <div className={styles.frame}>
      <SideNavigation ariaLabel="Main navigation" open={false} onOpenChange={() => undefined}>
        <CloudItems />
        <SideNavigationItem label="Documentation" href="#documentation" />
      </SideNavigation>
    </div>
  ),
}

export const MobileDrawer: Story = {
  tags: ['!dev'],
  render: function MobileDrawerRender() {
    const [mobileOpen, setMobileOpen] = useState(false)
    return (
      <div className={styles.mobileFrame}>
        <SideNavigation ariaLabel="Main navigation" mobile mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen}>
          <CloudItems onNavigate={() => setMobileOpen(false)} />
        </SideNavigation>
      </div>
    )
  },
}

export const Controlled: Story = {
  tags: ['!dev'],
  render: function ControlledRender() {
    const [open, setOpen] = useState(true)
    return (
      <div className={styles.frame}>
        <SideNavigation ariaLabel="Main navigation" open={open} onOpenChange={setOpen}>
          <CloudItems />
        </SideNavigation>
      </div>
    )
  },
}

export const PageTemplate: Story = {
  tags: ['!dev'],
  parameters: { layout: 'fullscreen' },
  render: function PageTemplateRender(args) {
    const [mobileOpen, setMobileOpen] = useState(false)
    return (
      <div className={styles.page}>
        <header className={styles.pageHeader}>
          {args.mobile && (
            <IconButton
              variant="ghost"
              icon={Menu}
              ariaLabel="Open navigation"
              onClick={() => setMobileOpen(true)}
              {...{ 'aria-controls': 'page-navigation', 'aria-expanded': mobileOpen }}
            />
          )}
          <strong>Hazelcast</strong>
          <span>Cloud</span>
        </header>
        <div className={styles.pageBody}>
          <SideNavigation
            id="page-navigation"
            ariaLabel="Main navigation"
            mobile={args.mobile}
            mobileOpen={mobileOpen}
            onMobileOpenChange={setMobileOpen}
            showMobileTrigger={false}
            mobileDialogClassName={styles.belowHeader}
            storageKey="side-navigation-page"
          >
            <CloudItems onNavigate={() => setMobileOpen(false)} />
          </SideNavigation>
          <main className={styles.pageContent}>
            <h1>Clusters</h1>
            <p>Manage your Hazelcast clusters.</p>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <span>Name</span>
                <span>Region</span>
                <span>Status</span>
              </div>
              <div className={styles.tableRow}>
                <span>Production</span>
                <span>US East</span>
                <span>Running</span>
              </div>
              <div className={styles.tableRow}>
                <span>Development</span>
                <span>EU West</span>
                <span>Running</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  },
}

export const MobilePageTemplate: Story = {
  ...PageTemplate,
  args: { mobile: true },
}
