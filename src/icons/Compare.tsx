import React, { FC, SVGAttributes } from 'react'

interface CompareIconProps extends SVGAttributes<SVGElement> {
  arrowRightColor?: string
  arrowLeftColor?: string
}

export const Compare: FC<CompareIconProps> = ({
  arrowRightColor = 'currentColor',
  arrowLeftColor = 'currentColor',
  strokeWidth = 1.5,
  width = 28,
  height = 29,
  ...rest
}) => (
  <svg width={width} height={height} viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path d="M4.16675 10H15.8334" stroke={arrowRightColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M10 4.16663L15.8333 9.99996L10 15.8333"
      stroke={arrowRightColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M23.8334 18.5H12.1667" stroke={arrowLeftColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M18.0001 24.625L12.1667 18.5L18.0001 12.375"
      stroke={arrowLeftColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
