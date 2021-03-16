import React from 'react'

import * as icons from '../src'

export default {
  title: 'Icons',
}

export const Icons = () => {
  return (
    <>
      {Object.values(icons).map((Icon, i) => (
        <Icon key={i} />
      ))}
    </>
  )
}
