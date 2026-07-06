import { useState } from 'react';
import { testimonials, overallRating, reviewCount } from '../../data/testimonials';

// 6 divides evenly into both the 3-col desktop grid and the 2-col tablet
// grid, so the default view never leaves an orphaned card in the last row.
const INITIAL_COUNT = 6;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="gr-stars" aria-label={`${rating} out of 5 stars`}>
      {'★★★★★'.slice(0, rating).split('').map((s, i) => (
        <span key={i} className="gr-star">{s}</span>
      ))}
    </span>
  );
}

export default function GoogleReviews() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? testimonials : testimonials.slice(0, INITIAL_COUNT);

  return (
    <div className="gr-wrap">
      <div className="gr-summary">
        <Stars rating={Math.round(overallRating)} />
        <span className="gr-summary-text">
          <strong>{overallRating.toFixed(1)}</strong> on Google · {reviewCount} reviews
        </span>
      </div>

      <div className={`gr-grid${expanded ? '' : ' gr-grid--default'}`}>
        {visible.map((t) => (
          <div className="gr-card" key={t.name}>
            <p className="gr-card-eyebrow">{t.visaType} · Chiang Mai</p>
            <Stars rating={t.rating} />
            <blockquote className="gr-quote">{t.quote}</blockquote>
            <p className="gr-author">{t.name}</p>
          </div>
        ))}
      </div>

      {testimonials.length > INITIAL_COUNT && (
        <button className="gr-toggle" onClick={() => setExpanded((e) => !e)}>
          {expanded ? 'Show fewer reviews' : `Show all ${testimonials.length} reviews`}
        </button>
      )}

      <style>{`
        .gr-wrap { display: flex; flex-direction: column; gap: var(--space-6); }
        .gr-summary { display: flex; align-items: center; gap: var(--space-3); }
        .gr-stars { display: inline-flex; }
        .gr-star { color: var(--signal-deeper); font-size: 1.125rem; line-height: 1; }
        .gr-summary-text {
          font-family: var(--font-body); font-size: var(--text-body-m); color: var(--text-body);
        }
        .gr-summary-text strong { color: var(--ink); }
        .gr-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5);
        }
        .gr-card {
          background: var(--paper); border: 1px solid var(--line); border-radius: 4px;
          padding: var(--space-5);
          display: flex; flex-direction: column; gap: var(--space-3);
        }
        .gr-card-eyebrow {
          font-family: var(--font-mono); font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--signal-deeper);
          margin: 0;
        }
        .gr-quote {
          font-family: var(--font-body); font-size: var(--text-body-m); line-height: 1.6;
          color: var(--ink); margin: 0; font-style: italic;
        }
        .gr-author {
          font-family: var(--font-mono); font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-45);
          margin: 0;
        }
        .gr-toggle {
          align-self: flex-start; background: none; border: none; cursor: pointer;
          font-family: var(--font-body); font-weight: 500; font-size: var(--text-body-s);
          color: var(--ink); text-decoration: underline;
          text-underline-offset: 2px;
          transition: color var(--dur-fast) ease;
          /* Padding + matching negative margin: expands the tap target to 44px
             without shifting the surrounding layout or the visible underline. */
          padding: 14px 4px;
          margin: -14px -4px;
        }
        .gr-toggle:hover,
        .gr-toggle:focus-visible { color: var(--signal-deeper); }
        @media (max-width: 900px) {
          .gr-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .gr-grid { grid-template-columns: 1fr; }
          /* Cap the default (unexpanded) view at 3 cards on narrow phones —
             6 stacked cards is a long scroll-tax before reaching Contact.
             CSS-only so the DOM node count stays identical between server
             and client render (no viewport-based JS state, no hydration risk). */
          .gr-grid--default .gr-card:nth-child(n + 4) { display: none; }
        }
      `}</style>
    </div>
  );
}
