import { FC, SVGAttributes } from 'react'

// Copy-paste from react-feather
export interface HazelcastIconProps extends SVGAttributes<SVGElement> {
  color?: string
  size?: string | number
}

export type HazelcastIcon = FC<HazelcastIconProps>
