import React from 'react'

import { HazelcastIcon } from './types'

export const MessageCircle: HazelcastIcon = ({ color = 'currentColor', size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path
      d="M16.625 9.10417C16.6277 10.1491 16.3836 11.1798 15.9125 12.1125C15.3539 13.2301 14.4952 14.1702 13.4326 14.8273C12.3699 15.4845 11.1453 15.8328 9.89583 15.8333C8.85094 15.8361 7.82017 15.5919 6.8875 15.1208L2.375 16.625L3.87917 12.1125C3.40807 11.1798 3.16394 10.1491 3.16667 9.10417C3.16715 7.85472 3.51548 6.63009 4.17265 5.56744C4.82982 4.50478 5.76987 3.64607 6.8875 3.0875C7.82017 2.6164 8.85094 2.37228 9.89583 2.375H10.2917C11.9418 2.46603 13.5003 3.16252 14.6689 4.3311C15.8375 5.49967 16.534 7.05822 16.625 8.70833V9.10417Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
