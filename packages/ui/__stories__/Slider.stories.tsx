import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { logger } from '@hazelcast/services'
import cn from 'classnames'

import { Slider } from '../src/Slider'
import { SliderFormik } from '../src/SliderFormik'
import { Button } from '../src/Button'

import utilStyles from './utils.module.scss'
import styles from '../src/Slider.module.scss'

export default {
  title: 'Components/Slider',
  component: Slider,
}

export const DefaultSlider = () => {
  const [value, onChange] = useState<number>(0)
  return (
    <div>
      Hello
      <Slider name="name" label="Slider's label" value={value} onChange={onChange} min={0} max={100} />
      World
    </div>
  )
}

DefaultSlider.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8mVm6LTbp2Z0RaWWjTZoft/%F0%9F%90%9DHIVE---Hazelcast-Design-System?node-id=510%3A265',
  },
}

export const HoveredSlider = () => {
  const [value, onChange] = useState<number>(40)
  return <Slider name="name" label="Slider's label" value={value} onChange={onChange} min={0} max={100} sliderClassName={styles.hover} />
}

export const FocusedSlider = () => {
  const [value, onChange] = useState<number>(40)
  return <Slider name="name" label="Slider's label" value={value} onChange={onChange} min={0} max={100} sliderClassName={styles.focus} />
}

export const HoveredFocusedSlider = () => {
  const [value, onChange] = useState<number>(40)
  return (
    <Slider
      name="name"
      label="Slider's label"
      value={value}
      onChange={onChange}
      min={0}
      max={100}
      sliderClassName={cn(styles.focus, styles.hover)}
    />
  )
}

export const DisabledHoveredFocusedSlider = () => {
  const [value, onChange] = useState<number>(40)
  return (
    <Slider
      name="name"
      label="Slider's label"
      value={value}
      disabled
      onChange={onChange}
      min={0}
      max={100}
      sliderClassName={cn(styles.focus, styles.hover)}
      marks={[
        { value: 0, label: '0 GB' },
        { value: 30, label: '1 GB' },
        { value: 70, label: '4 GB' },
        { value: 100, label: '100 GB' },
      ]}
    />
  )
}

export const SliderWithRange = () => {
  const [value, setValue] = useState<[number, number]>([0, 10])
  return (
    <>
      <div>{JSON.stringify(value)}</div>
      <hr />
      <Slider name="name" label="Slider's label" value={value} onChange={setValue} min={0} max={10} />
    </>
  )
}

export const SliderWithError = () => {
  const [value, onChange] = useState<number>(0)
  return (
    <div>
      <Slider name="name" label="Slider's label" value={value} onChange={onChange} min={0} max={100} error="This value is invalid" />
    </div>
  )
}

export const SliderWithHelperText = () => {
  const [value, onChange] = useState<number>(2)
  return (
    <div>
      <Slider name="name" label="Slider's label" value={value} onChange={onChange} min={2} max={100} helperText="Helper text" />
    </div>
  )
}

export const SliderWithMarks = () => {
  const [value, onChange] = useState<number>(0)
  return (
    <Slider
      name="name"
      label="Slider's label"
      value={value}
      onChange={onChange}
      min={0}
      max={100}
      helperText="Helper text"
      marks={[
        { value: 0, label: '0GB' },
        { value: 30, label: '1GB' },
        { value: 70, label: '4GB' },
        { value: 100, label: '100GB' },
      ]}
    />
  )
}

export const SliderWithDynamicMin = () => {
  const firstMin = 0
  const secondMin = 30
  const [value, onChange] = useState<number>(0)
  const [min, setMin] = useState(firstMin)

  const swapMin = () => {
    setMin((prev) => (prev === firstMin ? secondMin : firstMin))
  }

  return (
    <>
      <Button onClick={swapMin}>Swap Min</Button>
      <Slider
        name="name"
        label="Slider's label"
        value={value}
        onChange={onChange}
        min={min}
        max={100}
        helperText="Helper text"
        marks={[
          { value: 0, label: '0GB' },
          { value: 30, label: '1GB' },
          { value: 70, label: '4GB' },
          { value: 100, label: '100GB' },
        ]}
      />
    </>
  )
}

export const SliderWithMaxOver100 = () => {
  const [value, onChange] = useState<number>(0)
  return <Slider name="name" label="Slider's label" value={value} onChange={onChange} min={0} max={360} helperText="Helper text" />
}

export const RangeSliderWithMarks = () => {
  const [value, onChange] = useState<[number, number]>([3, 9])
  return (
    <Slider
      name="nameaaaa"
      label="Slider's label"
      value={value}
      onChange={onChange}
      min={2}
      max={10}
      helperText="Helper text"
      marks={[
        { value: 2, label: '2GB' },
        { value: 3, label: '3GB' },
        { value: 7, label: '7GB' },
        { value: 10, label: '10GB' },
      ]}
    />
  )
}

export const SliderWithCustomCurrentValueFormatter = () => {
  const [value, onChange] = useState<number>(0)
  return (
    <div>
      <Slider
        name="name"
        label="Slider's label"
        value={value}
        onChange={onChange}
        min={0}
        max={100}
        helperText="Helper text"
        marks={[
          { value: 0, label: '0GB' },
          { value: 30, label: '1GB' },
          { value: 70, label: '4GB' },
          { value: 100, label: '100GB' },
        ]}
        formatCurrentValue={(x) => (
          <p style={{ margin: 0 }}>
            {`${x} GB`} <small>(2 nodes)</small>
          </p>
        )}
      />
    </div>
  )
}

export const SliderWithNoValueIndicators = () => {
  const [value, onChange] = useState<number>(0)
  return (
    <div>
      Hello
      <Slider name="name" value={value} onChange={onChange} min={0} max={100} hideValueIndicators />
      World
    </div>
  )
}

export const SliderInFormik = () => {
  type Values = {
    ram: number
  }

  const validateRAM = (value: number) => (value <= 4 ? 'RAM is too low' : undefined)

  return (
    <Formik<Values>
      initialValues={{
        ram: 3,
      }}
      initialErrors={{
        ram: 'Server Error: Invalid ram value for this cloud provider',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <SliderFormik<Values> name="ram" label="Slider's label" min={0} max={100} validate={validateRAM} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}

export const SliderMultiRangeInFormik = () => {
  type Values = {
    ramRange: [number, number]
  }

  const validateRAMRange = ([value]: [number, number]) => (value <= 4 ? 'Lower boundary is too low' : undefined)

  return (
    <Formik<Values>
      initialValues={{
        ramRange: [3, 10],
      }}
      initialErrors={{
        ramRange: 'Server Error: Invalid ram rannge for this cloud provider',
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <SliderFormik<Values> name="ramRange" label="Slider's label" min={0} max={100} validate={validateRAMRange} />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}

/**
 * The following stories are here mostly mostly for visual regression testing and do not demonstrate the way
 * how this component should be used.
 *
 * The main goals of these stories is to make sure that the blue center of a thumb is exactly aligned with the
 * track's border and the white border will just overflow as requested by a design.
 *
 * You can read about common implementation problems here
 * https://css-tricks.com/multi-thumb-sliders-particular-two-thumb-case/#issues
 * @constructor
 */
export const DoNotUseOpacityThumbBeginning = () => {
  const [value, onChange] = useState<number>(0)
  return (
    <Slider
      name="name"
      label="Slider's label"
      value={value}
      onChange={onChange}
      min={0}
      max={100}
      sliderClassName={utilStyles.sliderSmallThumb}
    />
  )
}

/**
 * The scenario checks that the track's fill is exactly in the middle of the thumb when progress is 50%.
 */
export const DoNotUseOpacityThumbMiddle = () => {
  const [value, onChange] = useState<number>(50)
  return (
    <Slider
      name="name"
      label="Slider's label"
      value={value}
      onChange={onChange}
      min={0}
      max={100}
      sliderClassName={utilStyles.sliderSmallThumb}
    />
  )
}
export const DoNotUseOpacityThumbEnd = () => {
  const [value, onChange] = useState<number>(100)
  return (
    <Slider
      name="name"
      label="Slider's label"
      value={value}
      onChange={onChange}
      min={0}
      max={100}
      sliderClassName={utilStyles.sliderSmallThumb}
    />
  )
}
