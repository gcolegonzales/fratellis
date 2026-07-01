// Swappable form-submission seam. Every data-changing action (reservation,
// catering, future "add to cart") goes through submit() — components must NOT
// hard-code a transport. v1 delivers via Formspree when PUBLIC_FORMSPREE_ID is
// set, otherwise composes a mailto: fallback. A future SSR build can replace
// the body of submit() with a POST to /api/... + a database, and no caller
// changes. (spec/decisions/0001, product.md "Forward-compatibility".)

export type SubmitPayload = Record<string, string | number>;

export interface SubmitResult {
  ok: boolean;
  mode: 'formspree' | 'mailto';
  /** For the mailto fallback: the composed mailto: URL for the caller to open. */
  mailto?: string;
  error?: string;
}

interface SubmitEnv {
  PUBLIC_FORMSPREE_ID?: string;
  PUBLIC_CONTACT_EMAIL?: string;
}

function readEnv(): SubmitEnv {
  return {
    PUBLIC_FORMSPREE_ID: import.meta.env.PUBLIC_FORMSPREE_ID,
    PUBLIC_CONTACT_EMAIL: import.meta.env.PUBLIC_CONTACT_EMAIL,
  };
}

/** The Formspree form id, if configured. */
export function getFormspreeId(env: SubmitEnv = readEnv()): string | undefined {
  const id = env.PUBLIC_FORMSPREE_ID?.trim();
  return id ? id : undefined;
}

export function formspreeEndpoint(id: string): string {
  return `https://formspree.io/f/${id}`;
}

/** Which transport submit() will use given the environment. */
export function chooseMode(env: SubmitEnv = readEnv()): 'formspree' | 'mailto' {
  return getFormspreeId(env) ? 'formspree' : 'mailto';
}

const LABELS: Record<string, string> = {
  reservation: 'Reservation request',
  catering: 'Catering inquiry',
  contact: 'Website message',
};

function subjectFor(formName: string): string {
  const label = LABELS[formName] ?? 'Website form';
  return `${label} — Fratelli's Italian Grille`;
}

/** Compose a mailto: URL with a readable, pre-filled subject + body. Pure. */
export function buildMailto(
  formName: string,
  payload: SubmitPayload,
  to: string = readEnv().PUBLIC_CONTACT_EMAIL ?? '',
): string {
  const subject = subjectFor(formName);
  const body = Object.entries(payload)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  const params = new URLSearchParams({ subject, body });
  return `mailto:${to}?${params.toString()}`;
}

/** Build the Formspree request body (pure — testable without network). */
export function buildFormspreeBody(formName: string, payload: SubmitPayload): string {
  return JSON.stringify({ _subject: subjectFor(formName), form: formName, ...payload });
}

export async function submit(formName: string, payload: SubmitPayload): Promise<SubmitResult> {
  const env = readEnv();
  const id = getFormspreeId(env);

  if (id) {
    try {
      const res = await fetch(formspreeEndpoint(id), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: buildFormspreeBody(formName, payload),
      });
      return { ok: res.ok, mode: 'formspree', error: res.ok ? undefined : `HTTP ${res.status}` };
    } catch (err) {
      return { ok: false, mode: 'formspree', error: String(err) };
    }
  }

  // No Formspree configured → hand back a mailto: for the caller to open.
  return { ok: true, mode: 'mailto', mailto: buildMailto(formName, payload, env.PUBLIC_CONTACT_EMAIL) };
}
