import React, { useState } from 'react'
import { Slider } from '../src/Slider'

export default {
  title: 'Components/Slider',
  component: Slider,
}

export const DefaultSlider = () => {
  const [value, onChange] = useState<number>(50)
  return <Slider value={value} onChange={(value) => onChange(value as number)} />
}

export const SliderWithRange = () => {
  const [value, setValue] = useState<[number, number]>([0, 10])
  return (
    <>
      <Slider value={value} onChange={(value) => setValue(value as [number, number])} min={0} max={10} />
      {JSON.stringify(value)}
    </>
  )
}
