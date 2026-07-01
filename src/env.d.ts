/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Formspree form id (public). When unset, forms use the mailto: fallback. */
  readonly PUBLIC_FORMSPREE_ID?: string;
  /** Recipient for the mailto: fallback (optional). */
  readonly PUBLIC_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
