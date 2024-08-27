import React, { useState } from 'react'

import { Button } from '../src/Button'
import { AppHeader as AppHeaderComponent } from '../src/AppHeader'

export default {
  title: 'App/Header',
  component: AppHeaderComponent,
}

export const Default = () => {
  const [cluster, setCluster] = useState<string | null>(null)

  return (
    <AppHeaderComponent
      name="Management Center"
      logoProps={{
        LinkComponent: ({ children, className }) => <span className={className}>{children}</span>,
      }}
      clusterSelectProps={{
        clusterName: cluster,
        clusterNames: ['Cluster-1', 'Cluster-2'],
        clusterVersions: { 'Cluster-1': '5.5', 'Cluster-2': '6.0', 'Cluster-3': '3.1.2' },
        onChange: setCluster,
      }}
      menuContent={() => (
        <>
          <span>Item</span>
        </>
      )}
    />
  )
}

export const WithBadge = () => {
  const [cluster, setCluster] = useState<string | null>(null)

  return (
    <AppHeaderComponent
      name="Management Center"
      clusterSelectProps={{
        clusterName: cluster,
        clusterNames: ['Cluster-1', 'Cluster-2'],
        clusterVersions: { 'Cluster-1': '5.5', 'Cluster-2': '6.0', 'Cluster-3': '3.1.2' },
        onChange: setCluster,
      }}
      menuContent={() => (
        <>
          <Button color="light" variant="text">
            Item 1
          </Button>
        </>
      )}
      environment="production"
      logoProps={{
        LinkComponent: ({ children, className }) => <span className={className}>{children}</span>,
      }}
    />
  )
}

export const WithoutSelectCluster = () => (
  <AppHeaderComponent
    name="Management Center"
    logoProps={{
      LinkComponent: ({ children, className }) => <span className={className}>{children}</span>,
    }}
    menuContent={() => (
      <>
        <Button color="light" variant="text">
          Item 1
        </Button>
      </>
    )}
  />
)

export const DisabledSelectCluster = () => {
  const [cluster, setCluster] = useState<string | null>(null)

  return (
    <AppHeaderComponent
      name="Management Center"
      clusterSelectProps={{
        clusterNames: [],
        clusterName: cluster,
        onChange: setCluster,
      }}
      logoProps={{
        LinkComponent: ({ children, className }) => <span className={className}>{children}</span>,
      }}
      menuContent={() => (
        <>
          <Button color="light" variant="text">
            Item 1
          </Button>
        </>
      )}
    />
  )
}

export const WithoutMenu = () => {
  const [cluster, setCluster] = useState<string | null>(null)

  return (
    <AppHeaderComponent
      name="Management Center"
      clusterSelectProps={{
        clusterName: cluster,
        clusterNames: ['Cluster-1', 'Cluster-2'],
        clusterVersions: { 'Cluster-1': '5.5', 'Cluster-2': '6.0', 'Cluster-3': '3.1.2' },
        onChange: setCluster,
      }}
      logoProps={{
        LinkComponent: ({ children, className }) => <span className={className}>{children}</span>,
      }}
    />
  )
}
