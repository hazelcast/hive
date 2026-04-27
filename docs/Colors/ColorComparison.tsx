import React from 'react'

import styleConsts from '../../styles/constants/export.module.scss'

const v3Tokens = [
  'colorPrimaryLight',
  'colorPrimary',
  'colorPrimaryDark',
  'colorNeutralWhite',
  'colorNeutralGray',
  'colorNeutralGrayDarker',
  'colorNeutral',
  'colorNeutralLight',
  'colorNeutralLighter',
  'colorSuccess',
  'colorSuccessLight',
  'colorSuccessDark',
  'colorSuccessDarkest',
  'colorInfo',
  'colorInfoLight',
  'colorInfoDark',
  'colorInfoDarkest',
  'colorWarning',
  'colorWarningLight',
  'colorWarningDark',
  'colorWarningDarkest',
  'colorError',
  'colorErrorLight',
  'colorErrorDark',
  'colorText',
  'colorTextSecondary',
  'colorTextSubdued',
  'colorOverlayBackground',
  'colorAccessibilityOutline',
  'colorBrand',
  'colorBrandText',
  'colorShadow',
  'colorMenuDark',
  'colorAuthSecondary',
  'colorBrandPrimary',
  'colorBrandSecondary',
  'colorBrandAccent',
  'colorBrandOcean',
  'colorBrandRaspberry',
  'colorBrandCarrot',
  'colorBrandBlueberry',
]

const cellStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid #eee',
  verticalAlign: 'middle',
  width: '50%',
}

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 4,
        background: value,
        border: '1px solid rgba(0,0,0,0.1)',
        flex: '0 0 auto',
      }}
    />
    <div style={{ minWidth: 0 }}>
      <div style={{ fontFamily: 'monospace', fontSize: 'var(--hive-font-size-body-smaller)' }}>{name}</div>
      <div style={{ fontFamily: 'monospace', fontSize: 'var(--hive-font-size-body-tiny)', color: 'var(--hive-color-text-subdued-v4)' }}>
        {value}
      </div>
    </div>
  </div>
)

export const ColorComparison = () => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #ddd' }}>HIVE 3.0</th>
        <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #ddd' }}>HIVE 4.0 (OKLCH)</th>
      </tr>
    </thead>
    <tbody>
      {v3Tokens.map((v3) => {
        const v4 = `${v3}V4`
        const v4Value = styleConsts[v4]
        return (
          <tr key={v3}>
            <td style={cellStyle}>
              <Swatch name={v3} value={styleConsts[v3]} />
            </td>
            <td style={cellStyle}>
              {v4Value ? (
                <Swatch name={v4} value={v4Value} />
              ) : (
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 'var(--hive-font-size-body-smaller)',
                    color: 'var(--hive-color-text-subdued-v4)',
                  }}
                >
                  No new value
                </span>
              )}
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
)
