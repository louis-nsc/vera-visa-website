import { useState } from 'react';

const GOOGLE_REVIEW_HREF = 'https://g.page/r/Cd4hOP-Cer1JEBM/review';

type Step = 'rate' | 'positive' | 'negative' | 'thanks';

const POSITIVE_TAGS = ['Efficient', 'Helpful', 'Informative', 'Professional', 'Prompt'];

export default function ReviewFunnel() {
  const [step, setStep] = useState<Step>('rate');
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  function rate(stars: number) {
    setRating(stars);
    setStep(stars >= 4 ? 'positive' : 'negative');
  }

  function toggleTag(tag: string) {
    setTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]));
  }

  return (
    <div className="rf-wrap">
      {step === 'rate' && (
        <div className="rf-step">
          <p className="rf-question">How was your experience?</p>
          <div className="rf-stars" role="radiogroup" aria-label="Rate your experience">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className="rf-star-btn"
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
                onClick={() => rate(n)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'positive' && (
        <div className="rf-step">
          <p className="rf-question">What did you like the most?</p>
          <div className="rf-tags">
            {POSITIVE_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`rf-tag${tags.includes(tag) ? ' rf-tag-on' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="rf-question" style={{ marginTop: '24px' }}>Would you be willing to leave a review on Google?</p>
          <div className="rf-actions">
            <a
              href={GOOGLE_REVIEW_HREF}
              className="rf-cta vv-cta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setStep('thanks')}
            >
              Leave a Google review →
            </a>
            <button type="button" className="rf-secondary" onClick={() => setStep('thanks')}>
              Maybe later
            </button>
          </div>
        </div>
      )}

      {step === 'negative' && (
        <div className="rf-step">
          <p className="rf-question">We're sorry to hear that.</p>
          <p className="rf-sub">Tell us what went wrong. This goes directly to the team, not a public review.</p>
          <textarea
            className="rf-textarea"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What happened?"
          />
          <button type="button" className="rf-cta vv-cta" style={{ marginTop: '16px' }} onClick={() => setStep('thanks')}>
            Send feedback
          </button>
        </div>
      )}

      {step === 'thanks' && (
        <div className="rf-step">
          <p className="rf-question">Thank you!</p>
          <p className="rf-sub">Your feedback helps us serve expats and visa applicants better in Chiang Mai.</p>
        </div>
      )}

      <style>{`
        .rf-wrap {
          background: var(--sand); border: 1px solid var(--line); border-radius: 4px;
          padding: var(--space-7); max-width: 480px; margin: 0 auto;
        }
        .rf-step { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .rf-question {
          font-family: var(--font-display); font-weight: 600; font-size: var(--text-display-s);
          color: var(--ink); margin: 0 0 var(--space-5);
        }
        .rf-sub {
          font-family: var(--font-body); font-size: var(--text-body-m); color: var(--text-body);
          margin: 0 0 var(--space-5); max-width: 40ch;
        }
        .rf-stars { display: flex; gap: 8px; }
        .rf-star-btn {
          background: none; border: none; cursor: pointer; font-size: 40px; line-height: 1;
          color: var(--line); transition: color 120ms ease, transform 120ms ease;
        }
        .rf-star-btn:hover, .rf-star-btn:hover ~ .rf-star-btn { color: var(--signal); transform: scale(1.1); }
        .rf-tags { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .rf-tag {
          font-family: var(--font-body); font-size: var(--text-body-s); padding: 8px 16px;
          border-radius: 999px; border: 1px solid var(--line); background: var(--paper);
          color: var(--ink); cursor: pointer; transition: all 120ms ease;
        }
        .rf-tag-on { background: var(--ink); color: var(--paper); border-color: var(--ink); }
        .rf-actions { display: flex; flex-direction: column; gap: 12px; align-items: center; }
        .rf-cta {
          display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px;
          background: var(--signal-deep); color: var(--paper); font-family: var(--font-body);
          font-weight: 600; font-size: var(--text-body-m); text-decoration: none;
          border-radius: 999px; border: none; cursor: pointer;
          transition: background 120ms cubic-bezier(0.2,0,0,1);
        }
        .rf-cta:hover { background: var(--signal-deeper); }
        .rf-secondary {
          background: none; border: none; cursor: pointer; font-family: var(--font-body);
          font-size: var(--text-body-s); color: var(--ink-45); text-decoration: underline;
        }
        .rf-textarea {
          width: 100%; font-family: var(--font-body); font-size: var(--text-body-m); color: var(--ink);
          background: var(--paper); border: 1px solid var(--line); border-radius: 4px; padding: 12px;
          resize: vertical;
        }
      `}</style>
    </div>
  );
}
