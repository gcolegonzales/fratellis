import { describe, it, expect } from 'vitest';
import {
  getFormspreeId,
  formspreeEndpoint,
  chooseMode,
  buildMailto,
  buildFormspreeBody,
} from '../src/lib/submit';

describe('getFormspreeId / chooseMode', () => {
  it('returns the id when set and trims blanks', () => {
    expect(getFormspreeId({ PUBLIC_FORMSPREE_ID: 'abc123' })).toBe('abc123');
    expect(getFormspreeId({ PUBLIC_FORMSPREE_ID: '  ' })).toBeUndefined();
    expect(getFormspreeId({})).toBeUndefined();
  });

  it('selects transport from the environment', () => {
    expect(chooseMode({ PUBLIC_FORMSPREE_ID: 'abc123' })).toBe('formspree');
    expect(chooseMode({})).toBe('mailto');
  });
});

describe('formspreeEndpoint', () => {
  it('builds the endpoint URL from the id', () => {
    expect(formspreeEndpoint('abc123')).toBe('https://formspree.io/f/abc123');
  });
});

describe('buildFormspreeBody', () => {
  it('includes a subject, the form name, and the payload', () => {
    const parsed = JSON.parse(buildFormspreeBody('reservation', { name: 'Gio', party: 4 }));
    expect(parsed.form).toBe('reservation');
    expect(parsed.name).toBe('Gio');
    expect(parsed.party).toBe(4);
    expect(parsed._subject).toContain('Reservation request');
  });
});

describe('buildMailto', () => {
  it('composes a mailto with encoded subject and body', () => {
    const url = buildMailto('reservation', { name: 'Gio', party: 4 }, 'host@fratellis.com');
    expect(url.startsWith('mailto:host@fratellis.com?')).toBe(true);
    const query = new URLSearchParams(url.split('?')[1]);
    expect(query.get('subject')).toContain('Reservation request');
    expect(query.get('body')).toContain('name: Gio');
    expect(query.get('body')).toContain('party: 4');
  });

  it('works with an empty recipient (opens the mail app with no preset to:)', () => {
    const url = buildMailto('catering', { headcount: 40 });
    expect(url.startsWith('mailto:?')).toBe(true);
    expect(new URLSearchParams(url.split('?')[1]).get('subject')).toContain('Catering inquiry');
  });
});
