import { useState } from 'react';
import type { FormEvent } from 'react';

const WA_HREF = 'https://wa.me/66908917582';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill every field, humans never see this one.
    // Field name is deliberately obscure: common names like "company" get
    // silently autofilled by Chrome's saved-profile autofill even when the
    // field is visually hidden, producing false-positive bot detections.
    if (data.get('vv_hp_field')) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong. Please try WhatsApp instead.');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <div className="cf-wrap">
      <a href={WA_HREF} className="cf-wa vv-cta" target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
        </svg>
        Chat on WhatsApp — fastest reply
      </a>

      <div className="cf-divider"><span>or send a message</span></div>

      {status === 'success' ? (
        <p className="cf-success">Thanks — we've received your message and will reply by email shortly.</p>
      ) : (
        <form className="cf-form" onSubmit={handleSubmit}>
          {/* Honeypot field — hidden from real users via CSS */}
          <input type="text" name="vv_hp_field" tabIndex={-1} autoComplete="off" className="cf-honeypot" aria-hidden="true" />

          <label className="cf-field">
            <span className="cf-label">Name</span>
            <input type="text" name="name" required className="cf-input" />
          </label>

          <label className="cf-field">
            <span className="cf-label">Email</span>
            <input type="email" name="email" required className="cf-input" />
          </label>

          <label className="cf-field">
            <span className="cf-label">Message</span>
            <textarea name="message" required rows={4} className="cf-input cf-textarea" />
          </label>

          {status === 'error' && <p className="cf-error">{errorMsg}</p>}

          <button type="submit" className="cf-submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}

      <style>{`
        .cf-wrap { display: flex; flex-direction: column; gap: var(--space-5); }
        .cf-wa {
          display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2);
          padding: 14px var(--space-6); background: var(--signal-deep); color: var(--paper);
          font-family: var(--font-body); font-weight: 600; font-size: var(--text-body-m);
          text-decoration: none; border-radius: var(--radius-pill); border: 1px solid transparent;
          transition: background 120ms cubic-bezier(0.2,0,0,1);
        }
        .cf-wa:hover { background: var(--signal-deeper); }
        .cf-divider {
          display: flex; align-items: center; gap: var(--space-3);
          font-family: var(--font-mono); font-size: 11px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-45);
        }
        .cf-divider::before, .cf-divider::after { content: ''; flex: 1; height: 1px; background: var(--line); }
        .cf-form { display: flex; flex-direction: column; gap: var(--space-4); }
        .cf-honeypot { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
        .cf-field { display: flex; flex-direction: column; gap: 6px; }
        .cf-label {
          font-family: var(--font-mono); font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-45);
        }
        .cf-input {
          font-family: var(--font-body); font-size: var(--text-body-m); color: var(--ink);
          background: var(--paper); border: 1px solid var(--line); border-radius: 4px;
          padding: 10px 12px; transition: border-color 120ms ease;
        }
        .cf-input:focus { outline: none; border-color: var(--signal); }
        .cf-textarea { resize: vertical; font-family: var(--font-body); }
        .cf-submit {
          align-self: flex-start; padding: 12px var(--space-6); background: var(--ink); color: var(--paper);
          font-family: var(--font-body); font-weight: 600; font-size: var(--text-body-m);
          border: none; border-radius: var(--radius-pill); cursor: pointer;
          transition: background 120ms ease;
        }
        .cf-submit:hover:not(:disabled) { background: var(--signal-deep); }
        .cf-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .cf-success {
          font-family: var(--font-body); font-size: var(--text-body-m); color: var(--approved);
          background: var(--sand); border-radius: 4px; padding: var(--space-4);
        }
        .cf-error {
          font-family: var(--font-body); font-size: var(--text-body-s); color: var(--signal-deeper);
          margin: 0;
        }
      `}</style>
    </div>
  );
}
