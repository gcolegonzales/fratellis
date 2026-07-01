// Single import point for site info (hours, address, phone). The data is
// schema-validated at build via the `site` content collection; here we import
// the JSON directly for ergonomic, synchronous use in components.
import info from '../content/site/info.json';

export const site = info;
export type SiteInfo = typeof info;

export const DAY_LABELS: Record<string, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

/** Full one-line street address. */
export function formatAddress(a: SiteInfo['address'] = site.address): string {
  return `${a.street}, ${a.city}, ${a.state} ${a.zip}`;
}

/** A maps.google.com "get directions" URL for the restaurant. */
export function directionsUrl(query: string = site.mapQuery): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/** A keyless Google Maps embed URL for an <iframe>. */
export function mapEmbedUrl(query: string = site.mapQuery): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}
