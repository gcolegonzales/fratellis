// Pure form-validation helpers shared by the reservation and catering forms.
// No DOM access so they can be unit-tested and reused on the client.

export type Errors = Record<string, string>;

export function isNonEmpty(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidEmail(value: string): boolean {
  // Pragmatic RFC-lite check: something@something.tld
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** True when `dateStr` (YYYY-MM-DD) is today or later, in local time. */
export function isNotPastDate(dateStr: string, today: Date = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  const target = new Date(y, m - 1, d).getTime();
  const floor = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return target >= floor;
}

export function isPositiveInt(value: string, max = 100): boolean {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= max;
}

export interface ReservationValues {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: string;
  notes?: string;
}

export function validateReservation(v: ReservationValues, today: Date = new Date()): Errors {
  const errors: Errors = {};
  if (!isNonEmpty(v.name)) errors.name = 'Please enter your name.';
  if (!isNonEmpty(v.phone)) errors.phone = 'Please enter a phone number.';
  if (!isNonEmpty(v.email)) errors.email = 'Please enter your email.';
  else if (!isValidEmail(v.email)) errors.email = 'Please enter a valid email address.';
  if (!isNonEmpty(v.date)) errors.date = 'Please choose a date.';
  else if (!isNotPastDate(v.date, today)) errors.date = 'Please choose a date that isn’t in the past.';
  if (!isNonEmpty(v.time)) errors.time = 'Please choose a time.';
  if (!isNonEmpty(v.partySize)) errors.partySize = 'How many guests?';
  else if (!isPositiveInt(v.partySize, 100)) errors.partySize = 'Enter a valid party size.';
  return errors;
}

export interface CateringValues {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  headcount: string;
  eventType?: string;
  details?: string;
}

export function validateCatering(v: CateringValues, today: Date = new Date()): Errors {
  const errors: Errors = {};
  if (!isNonEmpty(v.name)) errors.name = 'Please enter your name.';
  if (!isNonEmpty(v.phone)) errors.phone = 'Please enter a phone number.';
  if (!isNonEmpty(v.email)) errors.email = 'Please enter your email.';
  else if (!isValidEmail(v.email)) errors.email = 'Please enter a valid email address.';
  if (!isNonEmpty(v.eventDate)) errors.eventDate = 'Please choose an event date.';
  else if (!isNotPastDate(v.eventDate, today)) errors.eventDate = 'Please choose a future date.';
  if (!isNonEmpty(v.headcount)) errors.headcount = 'About how many guests?';
  else if (!isPositiveInt(v.headcount, 1000)) errors.headcount = 'Enter a valid guest count.';
  return errors;
}

export function hasErrors(errors: Errors): boolean {
  return Object.keys(errors).length > 0;
}
