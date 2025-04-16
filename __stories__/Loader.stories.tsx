import React, { PropsWithChildren } from 'react'

import { Loader } from '../src'

export default {
  title: 'Components/Loader',
  component: Loader,
}

const InheritWrapper = ({ children }: PropsWithChildren) => <div style={{ color: 'red' }}>{children}</div>

export const InheritNormal = () => (
  <InheritWrapper>
    <Loader />
  </InheritWrapper>
)

export const InheritSmall = () => (
  <InheritWrapper>
    <Loader size="small" />
  </InheritWrapper>
)

export const InheritLarge = () => (
  <InheritWrapper>
    <Loader size="large" />
  </InheritWrapper>
)

export const InheritXLarge = () => (
  <InheritWrapper>
    <Loader size="xlarge" />
  </InheritWrapper>
)

export const PrimaryNormal = () => <Loader kind="primary" />

export const PrimarySmall = () => <Loader size="small" kind="primary" />
export const PrimaryLarge = () => <Loader size="large" kind="primary" />

export const PrimaryXLarge = () => <Loader size="xlarge" kind="primary" />

const ContrastWrapper = ({ children }: PropsWithChildren) => <div style={{ backgroundColor: 'black' }}>{children}</div>

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

export const ContrastLarge = () => (
  <ContrastWrapper>
    <Loader size="large" kind="contrast" />
  </ContrastWrapper>
)

export const ContrastXLarge = () => (
  <ContrastWrapper>
    <Loader size="xlarge" kind="contrast" />
  </ContrastWrapper>
)
