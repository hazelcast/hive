import React from 'react'

import { HazelcastIcon } from './types'

export const Folder: HazelcastIcon = ({ color = 'currentColor', size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path
      d="M17.4167 15.0417C17.4167 15.4616 17.2499 15.8643 16.953 16.1613C16.656 16.4582 16.2533 16.625 15.8334 16.625H3.16671C2.74678 16.625 2.34405 16.4582 2.04712 16.1613C1.75019 15.8643 1.58337 15.4616 1.58337 15.0417V3.95833C1.58337 3.53841 1.75019 3.13568 2.04712 2.83875C2.34405 2.54181 2.74678 2.375 3.16671 2.375H7.12504L8.70837 4.75H15.8334C16.2533 4.75 16.656 4.91681 16.953 5.21375C17.2499 5.51068 17.4167 5.91341 17.4167 6.33333V15.0417Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
