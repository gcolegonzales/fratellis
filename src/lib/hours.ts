// Open-now logic. Computes in the restaurant's timezone (America/Chicago)
// regardless of the visitor's locale, so it's correct for a local diner in any
// browser. Pure and injectable (pass `now`) for deterministic unit tests.

export interface DayHours {
  day: string; // 'Mon' | 'Tue' | ... | 'Sun'
  open: string | null; // "11:00" (24h) or null when closed
  close: string | null; // "21:00" (24h) or null when closed
}

export interface OpenStatus {
  open: boolean;
  /** Human label, e.g. "Open now · until 9:00 PM" or "Closed · opens Tue at 11:00 AM". */
  label: string;
}

const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_FULL: Record<string, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/** Format 24h "HH:MM" as a 12h label, e.g. "9:00 PM". */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

/** Current weekday + minutes-since-midnight in the given timezone. */
export function zonedParts(
  now: Date,
  timeZone = 'America/Chicago',
): { weekday: string; minutes: number } {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Sun';
  let hour = parts.find((p) => p.type === 'hour')?.value ?? '00';
  const minute = parts.find((p) => p.type === 'minute')?.value ?? '00';
  if (hour === '24') hour = '00'; // some environments emit "24" at midnight
  return { weekday, minutes: Number(hour) * 60 + Number(minute) };
}

export function isOpenNow(hours: DayHours[], now: Date, timeZone = 'America/Chicago'): boolean {
  const { weekday, minutes } = zonedParts(now, timeZone);
  const today = hours.find((h) => h.day === weekday);
  if (!today || today.open == null || today.close == null) return false;
  return minutes >= toMinutes(today.open) && minutes < toMinutes(today.close);
}

/** The next day (today included) that opens strictly after `fromMinutes`. */
function nextOpening(
  hours: DayHours[],
  weekday: string,
  fromMinutes: number,
): { day: string; open: string } | null {
  const startIdx = WEEK.indexOf(weekday);
  for (let i = 0; i < 7; i++) {
    const idx = (startIdx + i) % 7;
    const label = WEEK[idx];
    const entry = hours.find((h) => h.day === label);
    if (!entry || entry.open == null) continue;
    // Today only counts if it hasn't opened yet.
    if (i === 0 && toMinutes(entry.open) <= fromMinutes) continue;
    return { day: label, open: entry.open };
  }
  return null;
}

export function openStatus(hours: DayHours[], now: Date, timeZone = 'America/Chicago'): OpenStatus {
  const { weekday, minutes } = zonedParts(now, timeZone);
  const today = hours.find((h) => h.day === weekday);

  if (today && today.open != null && today.close != null) {
    const openM = toMinutes(today.open);
    const closeM = toMinutes(today.close);
    if (minutes >= openM && minutes < closeM) {
      return { open: true, label: `Open now · until ${formatTime(today.close)}` };
    }
    if (minutes < openM) {
      return { open: false, label: `Closed · opens today at ${formatTime(today.open)}` };
    }
  }

  const next = nextOpening(hours, weekday, minutes);
  if (!next) return { open: false, label: 'Closed' };
  return {
    open: false,
    label: `Closed · opens ${DAY_FULL[next.day] ?? next.day} at ${formatTime(next.open)}`,
  };
}
