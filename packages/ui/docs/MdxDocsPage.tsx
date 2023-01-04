import React from 'react'

export const MdxDocsPage: React.FC = ({ children }) => (
  <article
    style={{
      fontFamily: 'Open Sans',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }}
  >
    {children}
  </article>
)
