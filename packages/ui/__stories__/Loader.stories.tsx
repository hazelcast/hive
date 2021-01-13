import React, { FC } from 'react'

import { Loader } from '../src'

export default {
  title: 'Components/Loader',
  component: Loader,
}

export const PrimaryNormal = () => <Loader />

export const PrimarySmall = () => <Loader size="small" />

export const PrimaryXLarge = () => <Loader size="xlarge" />

const ContrastWrapper: FC = ({ children }) => <div style={{ backgroundColor: 'black' }}>{children}</div>

export const ContrastNormal = () => (
  <ContrastWrapper>
    <Loader kind="contrast" />
  </ContrastWrapper>
)

export const ContrastSmall = () => (
  <ContrastWrapper>
    <Loader size="small" kind="contrast" />
  </ContrastWrapper>
)

export const ContrastXLarge = () => (
  <ContrastWrapper>
    <Loader size="xlarge" kind="contrast" />
  </ContrastWrapper>
)
