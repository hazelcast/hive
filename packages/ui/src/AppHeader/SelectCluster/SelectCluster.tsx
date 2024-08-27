import cn from 'classnames'
import React, { FC, useMemo } from 'react'
import { CheckCircle } from 'react-feather'

import { Loader } from '../../Loader'
import { SelectField } from '../../Select'

import styles from './SelectCluster.module.scss'

const getSafeValue = (
  clusterName: string | null,
  clusterNames: string[] | null,
): {
  status: 'disabled' | 'connected' | 'disconnected'
  value: string
} => {
  if (!clusterNames?.length) {
    return { status: 'disabled', value: 'No Clusters' }
  }

  if (!clusterName) {
    return {
      status: 'disconnected',
      value: clusterName || 'Select Cluster',
    }
  }

  return {
    status: clusterNames.includes(clusterName) ? 'connected' : 'disconnected',
    value: clusterName,
  }
}

export type SelectClusterProps = {
  clusterVersions?: Record<string, string | null> | null
  clusterName: string | null
  clusterNames: string[] | null
  isReadOnly?: boolean
  onChange: (value: string | null) => void
}

export const SelectCluster: FC<SelectClusterProps> = ({ clusterVersions, clusterName, clusterNames, isReadOnly, onChange }) => {
  const options = useMemo(
    () =>
      Object.entries(clusterVersions ?? {}).map(([clusterName, version]) => ({
        label: clusterName,
        value: clusterName,
        trailingNote: version ? <span data-test="cluster-version">{version}</span> : <Loader size="small" />,
      })),
    [clusterVersions],
  )

  const { status, value } = getSafeValue(clusterName, clusterNames)
  const disabled = isReadOnly || status === 'disabled'

  return (
    <SelectField
      name="cluster"
      label="Select Cluster"
      showAriaLabel
      size="small"
      data-test="select-cluster"
      className={cn(styles.select, { [styles.disabled]: disabled })}
      classNames={{
        menuPortal: () => styles.menuPortal,
      }}
      disabled={disabled}
      iconLeft={CheckCircle}
      iconLeftAriaLabel="Select cluster"
      iconLeftContainerClassName={styles.selectIconLeftContainer}
      iconLeftClassName={cn(styles.selectIconLeft, {
        [styles.disabled]: status === 'disabled',
        [styles.disconnected]: status === 'disconnected',
      })}
      isClearable={false}
      onChange={onChange}
      options={options}
      value={value}
    />
  )
}
