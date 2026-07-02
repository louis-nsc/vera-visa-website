import { useState, useEffect, useRef } from 'react';

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
  const tabsRef = useRef<HTMLDivElement>(null);
  // Tracks whether the tab strip has scrolled content hidden past each edge,
  // so the fade cues only render when there's actually more to discover.
  const [edges, setEdges] = useState({ start: true, end: true });

  // Show/hide panels in the DOM via data-tab-panel attribute, and assign the
  // id each button's aria-controls points to (panels are static Astro markup,
  // so they don't carry the id themselves).
  // Runs once on mount to set initial visibility, then on every tab change.
  useEffect(() => {
    tabs.forEach(({ id }) => {
      const el = document.querySelector<HTMLElement>(`[data-tab-panel="${id}"]`);
      if (el) {
        el.hidden = id !== active;
        el.id = `panel-${id}`;
      }
    });
  }, [active, tabs]);

  // Deep-link support, once on mount: if the URL hash matches a tab id,
  // activate it directly. If it matches something else (e.g. an
  // AccordionSection's slug id), that element still exists in the DOM even
  // inside a hidden panel — `hidden` only affects rendering, not querying —
  // so find its panel ancestor and activate that tab instead.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    if (tabs.some((t) => t.id === hash)) {
      setActive(hash);
      return;
    }

    const target = document.getElementById(hash);
    const panel = target?.closest<HTMLElement>('[data-tab-panel]');
    const tabId = panel?.getAttribute('data-tab-panel');
    if (tabId) setActive(tabId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    const updateEdges = () => {
      setEdges({
        start: el.scrollLeft <= 0,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
      });
    };

    updateEdges();
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [tabs]);

  return (
    <div className="vv-tabbar">
      <div className="vv-tabs-wrap">
        <div className="vv-tabs" role="tablist" ref={tabsRef}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              // NO className transition — switching classes must be instant so the
              // signal underline snaps rather than sliding from the previous tab.
              className={`vv-tab${active === tab.id ? ' vv-tab-on' : ''}`}
              onClick={() => {
                setActive(tab.id);
                history.replaceState(null, '', `#${tab.id}`);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={`vv-tab-fade vv-tab-fade--start${edges.start ? ' vv-tab-fade--hidden' : ''}`} aria-hidden="true" />
        <div className={`vv-tab-fade vv-tab-fade--end${edges.end ? ' vv-tab-fade--hidden' : ''}`} aria-hidden="true" />
      </div>

      <style>{`
        .vv-tabbar {
          position: sticky;
          top: 0;
          z-index: 30;
          background: var(--paper);
          border-bottom: 1px solid var(--line);
        }
        .vv-tabs-wrap {
          position: relative;
          max-width: var(--container-max);
          margin: 0 auto;
        }
        .vv-tabs {
          display: flex;
          gap: 4px;
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

        /* Edge fades: the only cue that more tabs exist off-screen, since the
           scrollbar itself is hidden above. Opacity-only, so they never block
           pointer events on the tabs underneath. */
        .vv-tab-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 32px;
          pointer-events: none;
          opacity: 1;
          transition: opacity var(--dur-fast) ease;
        }
        .vv-tab-fade--hidden { opacity: 0; }
        .vv-tab-fade--start {
          left: 0;
          background: linear-gradient(to right, var(--paper), transparent);
        }
        .vv-tab-fade--end {
          right: 0;
          background: linear-gradient(to left, var(--paper), transparent);
        }
      `}</style>
    </div>
  );
}
