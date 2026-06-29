import { useState } from 'react';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function AccordionSection({ title, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="vv-acc">
      <button
        className="vv-acc-btn"
        onClick={() => setOpen((o) => !o)}
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
