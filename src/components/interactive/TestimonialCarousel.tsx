import { useEffect, useRef, useState } from 'react';
import { testimonials } from '../../data/testimonials';

function Stars({ rating }: { rating: number }) {
  return (
    <span className="tc-stars" aria-label={`${rating} out of 5 stars`}>
      {'★★★★★'.slice(0, rating).split('').map((s, i) => (
        <span key={i} className="tc-star" aria-hidden="true">{s}</span>
      ))}
    </span>
  );
}

export default function TestimonialCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function update() {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  function scrollByPage(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <section className="tc-wrap" aria-roledescription="carousel" aria-label="Client testimonials">
      <div
        className="tc-track"
        ref={track}
        onScroll={update}
        tabIndex={0}
        role="group"
        aria-label="Testimonials, scroll horizontally"
      >
        {testimonials.map((t) => (
          <figure className="tc-card" key={t.name} aria-roledescription="slide">
            <p className="tc-eyebrow">{t.visaType} · Chiang Mai</p>
            <Stars rating={t.rating} />
            <blockquote className="tc-quote">{t.quote}</blockquote>
            <figcaption className="tc-author">{t.name} · Google review</figcaption>
          </figure>
        ))}
      </div>

      <div className="tc-controls">
        <button type="button" className="tc-btn" onClick={() => scrollByPage(-1)} disabled={atStart} aria-label="Previous testimonials">←</button>
        <button type="button" className="tc-btn" onClick={() => scrollByPage(1)} disabled={atEnd} aria-label="Next testimonials">→</button>
      </div>

      <style>{`
        .tc-wrap { display: flex; flex-direction: column; gap: var(--space-5); }
        .tc-track {
          display: grid; grid-auto-flow: column;
          grid-auto-columns: calc((100% - 2 * var(--space-5)) / 3);
          gap: var(--space-5);
          overflow-x: auto; scroll-snap-type: x mandatory;
          scrollbar-width: none; -ms-overflow-style: none;
          padding-bottom: 2px;
        }
        .tc-track::-webkit-scrollbar { display: none; }
        .tc-track:focus-visible { outline: 2px solid var(--ink); outline-offset: 4px; }
        .tc-card {
          scroll-snap-align: start; margin: 0;
          background: var(--paper); border: 1px solid var(--line); border-radius: 4px;
          padding: var(--space-5);
          display: flex; flex-direction: column; gap: var(--space-3);
        }
        .tc-stars { display: inline-flex; }
        .tc-star { color: var(--signal-deeper); font-size: 1.125rem; line-height: 1; }
        .tc-eyebrow {
          font-family: var(--font-mono); font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--signal-deeper); margin: 0;
        }
        .tc-quote {
          font-family: var(--font-body); font-size: var(--text-body-m); line-height: 1.6;
          color: var(--ink); margin: 0; font-style: italic;
        }
        .tc-author {
          margin-top: auto;
          font-family: var(--font-mono); font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-45);
        }
        .tc-controls { display: flex; gap: var(--space-3); }
        .tc-btn {
          width: 44px; height: 44px; border-radius: 4px; cursor: pointer;
          background: var(--paper); color: var(--ink); border: 1px solid var(--line);
          font-size: 1.125rem; line-height: 1;
          transition: border-color var(--dur-fast) ease, color var(--dur-fast) ease;
        }
        .tc-btn:hover:not(:disabled), .tc-btn:focus-visible { border-color: var(--ink); }
        .tc-btn:disabled { opacity: 0.35; cursor: default; }
        @media (max-width: 900px) {
          .tc-track { grid-auto-columns: calc((100% - var(--space-5)) / 2); }
        }
        @media (max-width: 560px) {
          .tc-track { grid-auto-columns: 88%; }
        }
      `}</style>
    </section>
  );
}
