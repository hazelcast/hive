import React from 'react'

import { HazelcastIcon } from './types'

export const Cluster: HazelcastIcon = ({ color = 'currentColor', size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path d="M12.5 3.75H3.75V12.5H12.5V3.75Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26.25 3.75H17.5V12.5H26.25V3.75Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M26.25 17.5H17.5V26.25H26.25V17.5Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12.5 17.5H3.75V26.25H12.5V17.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
