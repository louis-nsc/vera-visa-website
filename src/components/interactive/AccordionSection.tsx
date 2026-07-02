import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

// Slugify the title into a stable anchor id, e.g. "Financial Requirements" -> "financial-requirements".
function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AccordionSection({ title, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const slug = slugify(title);
  const rootRef = useRef<HTMLDivElement>(null);

  // Deep-link support: if the URL hash matches this accordion, open it and
  // scroll it into view. The short delay gives TabBar's own mount effect a
  // chance to un-hide this accordion's parent panel first (both are
  // independent client:load islands with no shared parent state, but
  // `hidden` only affects rendering — the element still exists to query).
  useEffect(() => {
    if (window.location.hash.slice(1) !== slug) return;
    setOpen(true);
    const timer = setTimeout(() => {
      rootRef.current?.scrollIntoView({ block: 'start' });
    }, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="vv-acc" id={slug} ref={rootRef}>
      <button
        className="vv-acc-btn"
        onClick={() => {
          setOpen((o) => !o);
          history.replaceState(null, '', `#${slug}`);
        }}
        aria-expanded={open}
      >
        <span className="vv-acc-title">{title}</span>
        <svg
          className={`vv-chev${open ? ' vv-open' : ''}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="vv-acc-body">
          {children}
        </div>
      )}

      <style>{`
        .vv-acc {
          border-top: 1px solid var(--line);
        }
        .vv-acc:last-child {
          border-bottom: 1px solid var(--line);
        }
        .vv-acc-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          appearance: none;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 20px 0;
        }
        .vv-acc-title {
          font-family: var(--font-body);
          font-size: 18px;
          font-weight: 600;
          color: var(--ink);
        }
        .vv-chev {
          flex-shrink: 0;
          color: var(--ink-45);
          transition: transform 200ms cubic-bezier(0.2,0,0,1), color 120ms ease;
        }
        .vv-acc-btn:hover .vv-chev { color: var(--signal); }
        .vv-open {
          transform: rotate(180deg);
          color: var(--signal);
        }
        .vv-acc-body {
          padding-bottom: 20px;
          max-width: 64ch;
        }
        .vv-acc-body p {
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.6;
          color: var(--ink-70);
          margin: 0 0 12px;
        }
        .vv-acc-body p:last-child { margin-bottom: 0; }
        .vv-acc-body ul,
        .vv-acc-body ol {
          margin: 0;
          padding-left: 20px;
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.7;
          color: var(--ink-70);
        }
        .vv-acc-body li + li { margin-top: 4px; }
      `}</style>
    </div>
  );
}
