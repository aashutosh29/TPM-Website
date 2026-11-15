export type FormResult =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: Record<string, string> };

export function parseJsonBody<T extends Record<string, unknown>>(
  body: unknown,
  required: (keyof T)[],
): { data: T } | { error: FormResult } {
  if (!body || typeof body !== 'object') {
    return { error: { ok: false, message: 'Invalid request body.' } };
  }
  const record = body as Record<string, unknown>;
  const errors: Record<string, string> = {};
  for (const key of required) {
    const val = record[key as string];
    if (typeof val !== 'string' || !val.trim()) {
      errors[key as string] = 'This field is required.';
    }
  }
  if (Object.keys(errors).length) {
    return { error: { ok: false, message: 'Please check the form.', errors } };
  }
  return { data: record as T };
}

export async function sendLeadEmail(options: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ sent: boolean; detail?: string }> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.LEAD_EMAIL ?? 'manager@tivertonparkmanor.com';
  const from =
    import.meta.env.RESEND_FROM ?? 'Tiverton Park Manor <onboarding@resend.dev>';

  if (!apiKey) {
    console.info('[forms] RESEND_API_KEY not set — submission logged only.');
    console.info('[forms]', options.subject, options.html);
    return { sent: false, detail: 'Email delivery is not configured; submission was recorded.' };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: options.subject,
      html: options.html,
      reply_to: options.replyTo,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[forms] Resend error', res.status, text);
    return { sent: false, detail: 'Unable to send email at this time.' };
  }
  return { sent: true };
}