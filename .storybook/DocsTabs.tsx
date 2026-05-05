import React, { useState, ReactNode } from 'react'

type Tab = { id: string; label: string; content: ReactNode }

type Props = { tabs: Tab[]; defaultId?: string }

export const DocsTabs = ({ tabs, defaultId }: Props) => {
  const [active, setActive] = useState(defaultId ?? tabs[0]?.id)

  return (
    <div className="docs-tabs">
      <div className="docs-tabs-nav" role="tablist" aria-label="Documentation sections">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`docs-tab-panel-${t.id}`}
            id={`docs-tab-${t.id}`}
            className={`docs-tabs-tab${active === t.id ? ' is-active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} id={`docs-tab-panel-${t.id}`} role="tabpanel" aria-labelledby={`docs-tab-${t.id}`} hidden={active !== t.id}>
          {t.content}
        </div>
      ))}
    </div>
  )
}
