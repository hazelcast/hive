import { FC, SVGAttributes } from 'react'

// Copy-pase from react-feather
export interface HazelcastIconProps extends SVGAttributes<SVGElement> {
  color?: string
  size?: string | number
}

export type HazelcastIcon = FC<HazelcastIconProps>
