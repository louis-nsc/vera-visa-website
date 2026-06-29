import { useState, useEffect } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  defaultTab?: string;
}

export default function TabBar({ tabs, defaultTab }: Props) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? '');

  // Show/hide panels in the DOM via data-tab-panel attribute.
  // Runs once on mount to set initial visibility, then on every tab change.
  useEffect(() => {
    tabs.forEach(({ id }) => {
      const el = document.querySelector<HTMLElement>(`[data-tab-panel="${id}"]`);
      if (el) el.hidden = id !== active;
    });
  }, [active, tabs]);

  return (
    <div className="vv-tabbar">
      <div className="vv-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            // NO className transition — switching classes must be instant so the
            // signal underline snaps rather than sliding from the previous tab.
            className={`vv-tab${active === tab.id ? ' vv-tab-on' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <style>{`
        .vv-tabbar {
          position: sticky;
          top: 0;
          z-index: 30;
          background: var(--paper);
          border-bottom: 1px solid var(--line);
        }
        .vv-tabs {
          display: flex;
          gap: 4px;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-pad);
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .vv-tabs::-webkit-scrollbar { display: none; }
        .vv-tab {
          flex: 0 0 auto;
          appearance: none;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-45);
          padding: 16px 14px;
          white-space: nowrap;
          /* No transition on border-color — underline must be instant */
        }
        .vv-tab:hover { color: var(--ink); }
        .vv-tab-on { color: var(--ink); border-bottom-color: var(--signal); }
      `}</style>
    </div>
  );
}
