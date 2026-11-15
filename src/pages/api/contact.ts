import type { APIRoute } from 'astro';
import { parseJsonBody, sendLeadEmail } from '../../lib/forms';

export const prerender = false;

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
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

  const parsed = parseJsonBody<ContactPayload>(body, ['name', 'email', 'message']);
  if ('error' in parsed) {
    return new Response(JSON.stringify(parsed.error), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, phone, message } = parsed.data;
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
    <h2>Contact form — Tiverton Park Manor</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

  const delivery = await sendLeadEmail({
    subject: `Website contact from ${name}`,
    html,
    replyTo: email.trim(),
  });

  const messageText = delivery.sent
    ? 'Thank you. We received your message and will respond soon.'
    : `Thank you. Your message was received.${delivery.detail ? ` (${delivery.detail})` : ''}`;

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