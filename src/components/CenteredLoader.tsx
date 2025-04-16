import React, { FC } from 'react'
import { DataTestProp } from '../../src'

import { LoaderProps, Loader } from './Loader'

import styles from './CenteredLoader.module.scss'

export type CenteredLoaderProps = LoaderProps & DataTestProp
export const CenteredLoader: FC<CenteredLoaderProps> = ({ 'data-test': dataTest = 'centered-loader', ...props }) => (
  <div className={styles.container} data-test={dataTest}>
    <Loader {...props} />
  </div>
)
