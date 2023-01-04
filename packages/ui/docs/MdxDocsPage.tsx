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
      background: '#F2F5F9',
      overflow: 'auto',
    }}
  >
    {children}
  </article>
)
