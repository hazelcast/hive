import React from 'react'

import { HazelcastIcon } from '../types'

export const PlusCircle: HazelcastIcon = ({ color = 'currentColor', size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <circle cx="28" cy="28.9834" r="27.5" fill="#2160C0" stroke={color} />
    <path d="M28 20V38" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 29H37" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
