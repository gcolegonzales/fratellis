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

/** A reliable, keyless OpenStreetMap embed URL for an <iframe> (frames cleanly,
 * unlike the Google keyless embed which Google now refuses to frame). */
export function mapEmbedUrl(): string {
  const geo = site.geo;
  if (!geo) {
    return `https://www.openstreetmap.org/export/embed.html?bbox=-91,30.2,-90.9,30.4&layer=mapnik`;
  }
  const dLon = 0.012;
  const dLat = 0.008;
  const bbox = [geo.lon - dLon, geo.lat - dLat, geo.lon + dLon, geo.lat + dLat].join('%2C');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${geo.lat}%2C${geo.lon}`;
}
