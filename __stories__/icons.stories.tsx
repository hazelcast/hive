import React from 'react'
import { Cluster } from '../src'
import { PlusCircle } from '../src'
import { Streaming } from '../src'
import { Folder } from '../src'
import { Compute } from '../src'
import { Compare } from '../src'

const icons = [Cluster, PlusCircle, Streaming, Folder, Compute, Compare]

export default {
  title: 'Icons',
}

export const Icons = () => {
  return (
    <>
      {Object.values(icons)
        .filter((Icon) => Icon)
        .map((Icon, i) => (
          <Icon key={i} />
        ))}
    </>
  )
}
