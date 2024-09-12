import React from 'react'

import { HazelcastIcon } from './types'

export const Streaming: HazelcastIcon = ({ color = 'currentColor', size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path d="M3.95837 14.25L6.33337 16.625L8.70837 14.25" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.0416 13.4583L12.6666 11.0833L10.2916 13.4583" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.33337 11.0833V16.625" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.6666 16.625L12.6666 11.0833" stroke="#041A3B" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M16.53 14.3213C17.2182 13.8373 17.7344 13.1465 18.0035 12.3493C18.2726 11.5521 18.2807 10.6899 18.0265 9.88778C17.7724 9.08567 17.2693 8.38541 16.5902 7.88861C15.9111 7.39182 15.0914 7.12434 14.25 7.125H13.2525C13.0144 6.19707 12.5689 5.33524 11.9495 4.6044C11.3301 3.87356 10.553 3.29275 9.67668 2.9057C8.80036 2.51865 7.84765 2.33544 6.89027 2.36987C5.93289 2.4043 4.9958 2.65546 4.14954 3.10446C3.30328 3.55346 2.56991 4.18859 2.00463 4.96203C1.43935 5.73548 1.05689 6.62708 0.886059 7.56972C0.715225 8.51236 0.760461 9.48147 1.01836 10.4041C1.27626 11.3267 1.74011 12.1788 2.37498 12.8963"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
