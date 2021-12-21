import React from 'react'

import * as icons from '../src'

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
