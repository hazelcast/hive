import React, { useState } from 'react'
import { Slider } from '../src/Slider'
import styles from '../src/Slider.module.scss'
import cn from 'classnames'
import utilStyles from './utils.scss'
import { SliderFormik } from '../src/SliderFormik'
import { logger } from '@hazelcast/services'
import { Form, Formik } from 'formik'

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
        { value: 0, label: '0GB' },
        { value: 30, label: '1GB' },
        { value: 70, label: '4GB' },
        { value: 100, label: '100GB' },
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
  const [value, onChange] = useState<number>(0)
  return (
    <div>
      <Slider name="name" label="Slider's label" value={value} onChange={onChange} min={0} max={100} helperText="Helper text" />
    </div>
  )
}

export const SliderWithMarks = () => {
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
      />
    </div>
  )
}

export const SliderInFormik = () => {
  type Values = {
    ram: number
  }
  return (
    <Formik<Values>
      initialValues={{
        ram: 3,
      }}
      initialErrors={{
        ram: 'Server Error: Invalid ram value for this cloud provider',
      }}
      validate={(values) => {
        const errors: Partial<{ [key in keyof Values]: string }> = {
          ram: values.ram === 4 ? 'RAM is invalid' : undefined,
        }

        return errors
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <SliderFormik<Values> name="ram" label="Slider's label" min={0} max={100} />
        </Form>
      )}
    </Formik>
  )
}

export const SliderMultiRangeInFormik = () => {
  type Values = {
    ramRange: [number, number]
  }
  return (
    <Formik<Values>
      initialValues={{
        ramRange: [3, 10],
      }}
      initialErrors={{
        ramRange: 'Server Error: Invalid ram rannge for this cloud provider',
      }}
      validate={(values) => {
        const errors: Partial<{ [key in keyof Values]: string }> = {
          ramRange: values.ramRange[0] < 4 ? 'RAM is invalid' : undefined,
        }

        return errors
      }}
      onSubmit={(values) => logger.log('submit', values)}
    >
      {({ values }) => (
        <Form>
          Values: {JSON.stringify(values)}
          <SliderFormik<Values> name="ramRange" label="Slider's label" min={0} max={100} />
        </Form>
      )}
    </Formik>
  )
}

/**
 * The following stories are here mostly mostly for visual regression testing and do not demonstrate the way
 * how this component should be used.
 * @constructor
 */
export const DoNotUse__OpacityThumb__Beginning = () => {
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
export const DoNotUse__OpacityThumb__Middle = () => {
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
export const DoNotUse__OpacityThumb__End = () => {
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
