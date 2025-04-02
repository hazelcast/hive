import React, { useState } from 'react'

import { CircularProgressBar, Slider } from '../src'

import styles from './CircularProgressBar.stories.module.scss'

export default {
  title: 'Components/CircularProgressBar',
  component: CircularProgressBar,
}

export const Default = () => {
  const [progress, setProgress] = useState<number>(30)
  const [rotate, setRotate] = useState<number>(0)
  const [cut, setCut] = useState<number>(0)

  return (
    <>
      <CircularProgressBar progress={progress} rotate={rotate} cut={cut} text={`${progress}%`} />
      <div style={{ marginTop: 20 }}>
        <Slider name="name" label="Progress" value={progress} onChange={setProgress} min={0} max={100} />
        <Slider name="name" label="Rotation" value={rotate} onChange={setRotate} min={0} max={360} />
        <Slider name="name" label="Cut" value={cut} onChange={setCut} min={0} max={180} />
      </div>
    </>
  )
}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}

export const MemoryUsageExample = () => {
  const [usedMemory, setUsedMemory] = useState<number>(100)
  const maxMemory = 740
  const progress = (usedMemory / maxMemory) * 100
  const rotate = 90
  const cut = 50

  return (
    <>
      <div className={styles.container}>
        <CircularProgressBar progress={progress} rotate={rotate} cut={cut} text="740MB" />
        <span className={styles.info}>Usage {usedMemory}MB</span>
      </div>
      <div style={{ marginTop: 20 }}>
        <Slider name="name" label="Used Memory" value={usedMemory} onChange={setUsedMemory} min={0} max={740} />
      </div>
    </>
  )
}
