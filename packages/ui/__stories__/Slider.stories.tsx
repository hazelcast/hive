import React, { useState } from 'react'
import { Slider } from '../src/Slider'

export default {
  title: 'Components/Slider',
  component: Slider,
}

export const DefaultSlider = () => {
  const [value, onChange] = useState<number>(50)
  return <Slider value={value} onChange={onChange} min={0} max={100} />
}

export const SliderWithRange = () => {
  const [value, setValue] = useState<[number, number]>([0, 10])
  return (
    <>
      <div>
        This is a text
        {JSON.stringify(value)}
      </div>
      <Slider value={value} onChange={setValue} min={0} max={10} />
      <div>
        <input type="range" value={value} onChange={setValue} />
      </div>
    </>
  )
}