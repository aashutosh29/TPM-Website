import type { APIRoute } from 'astro';
import { parseJsonBody, sendLeadEmail } from '../../lib/forms';

export const prerender = false;

type TourPayload = {
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  message: string;
};

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Invalid JSON.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const parsed = parseJsonBody<TourPayload>(body, [
    'name',
    'email',
    'phone',
    'preferred_date',
  ]);
  if ('error' in parsed) {
    return new Response(JSON.stringify(parsed.error), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, phone, preferred_date, message } = parsed.data;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: 'Please enter a valid email address.',
        errors: { email: 'Invalid email.' },
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const html = `
    <h2>Tour request — Tiverton Park Manor</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Preferred date:</strong> ${escapeHtml(preferred_date)}</p>
    <p><strong>Notes:</strong></p>
    <p>${escapeHtml(message || '—').replace(/\n/g, '<br>')}</p>
    <p><em>This is a request only; staff will confirm by phone or email.</em></p>
  `;

  const delivery = await sendLeadEmail({
    subject: `Tour request from ${name}`,
    html,
    replyTo: email.trim(),
  });

  const messageText = delivery.sent
    ? 'Thank you. We received your tour request and will contact you to confirm.'
    : `Thank you. Your tour request was recorded.${delivery.detail ? ` (${delivery.detail})` : ''}`;

  return new Response(JSON.stringify({ ok: true, message: messageText }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}