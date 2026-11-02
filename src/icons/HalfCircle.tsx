import React, { FC, SVGAttributes } from 'react'

export const HalfCircle: FC<SVGAttributes<SVGElement>> = ({ width = 24, height = 24, strokeWidth = 1.5, ...rest }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={strokeWidth} />
    <path d="M12 3a9 9 0 0 0 0 18V3Z" fill="currentColor" />
  </svg>
)
