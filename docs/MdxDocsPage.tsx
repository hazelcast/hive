import React, { PropsWithChildren } from 'react'

export const MdxDocsPage = ({ children }: PropsWithChildren) => (
  <article
    style={{
      fontFamily: 'Open Sans',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: '#F2F5F9',
      overflow: 'auto',
    }}
  >
    {children}
  </article>
)
