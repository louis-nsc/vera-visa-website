import type { APIRoute } from 'astro';

export const prerender = false;

const CONTACT_DESTINATION_EMAILS = ['ornipaornipa@gmail.com', 'louis@nostringscontent.com'];

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), { status: 400 });
  }

  const name = (payload.name ?? '').toString().trim();
  const email = (payload.email ?? '').toString().trim();
  const message = (payload.message ?? '').toString().trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Name, email, and message are all required.' }), { status: 400 });
  }
  if (!isValidEmail(email)) {
    return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), { status: 400 });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured.');
    return new Response(JSON.stringify({ error: 'Email is not configured yet. Please use WhatsApp instead.' }), { status: 500 });
  }

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Vera Visa Website <noreply@vera-visa.com>',
      to: CONTACT_DESTINATION_EMAILS,
      reply_to: email,
      subject: `New website enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    }),
  });

  if (!resendRes.ok) {
    const body = await resendRes.text();
    console.error('Resend API error:', body);
    return new Response(JSON.stringify({ error: 'Failed to send message. Please try WhatsApp instead.' }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
