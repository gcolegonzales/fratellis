import { describe, it, expect } from 'vitest';
import { isOpenNow, openStatus, formatTime, type DayHours } from '../src/lib/hours';

// Mirrors src/content/site/info.json.
const hours: DayHours[] = [
  { day: 'Mon', open: null, close: null },
  { day: 'Tue', open: '11:00', close: '21:00' },
  { day: 'Wed', open: '11:00', close: '21:00' },
  { day: 'Thu', open: '11:00', close: '21:00' },
  { day: 'Fri', open: '11:00', close: '22:00' },
  { day: 'Sat', open: '11:00', close: '22:00' },
  { day: 'Sun', open: '11:00', close: '21:00' },
];

// All instants below are UTC; comments give the resulting America/Chicago
// wall-clock time so the expectations are auditable.

describe('formatTime', () => {
  it('formats 24h as 12h', () => {
    expect(formatTime('11:00')).toBe('11:00 AM');
    expect(formatTime('21:00')).toBe('9:00 PM');
    expect(formatTime('22:00')).toBe('10:00 PM');
    expect(formatTime('00:00')).toBe('12:00 AM');
  });
});

describe('isOpenNow (America/Chicago)', () => {
  it('is open midday on a weekday (CDT)', () => {
    // 2026-07-01 17:30Z → Wed 12:30 PM CDT
    expect(isOpenNow(hours, new Date('2026-07-01T17:30:00Z'))).toBe(true);
  });

  it('handles Daylight vs Standard time correctly (CST)', () => {
    // 2026-01-06 18:00Z → Tue 12:00 PM CST
    expect(isOpenNow(hours, new Date('2026-01-06T18:00:00Z'))).toBe(true);
  });

  it('is closed before opening', () => {
    // 2026-06-30 15:30Z → Tue 10:30 AM CDT (opens 11)
    expect(isOpenNow(hours, new Date('2026-06-30T15:30:00Z'))).toBe(false);
  });

  it('is closed exactly at closing time (exclusive)', () => {
    // 2026-07-01 02:00Z → Tue 9:00 PM CDT (close is 21:00)
    expect(isOpenNow(hours, new Date('2026-07-01T02:00:00Z'))).toBe(false);
  });

  it('is closed all day Monday', () => {
    // 2026-06-29 18:00Z → Mon 1:00 PM CDT
    expect(isOpenNow(hours, new Date('2026-06-29T18:00:00Z'))).toBe(false);
  });

  it('is open late on Friday (until 10 PM)', () => {
    // 2026-07-04 02:30Z → Fri 9:30 PM CDT
    expect(isOpenNow(hours, new Date('2026-07-04T02:30:00Z'))).toBe(true);
  });
});

describe('openStatus label', () => {
  it('reports until-close when open', () => {
    const s = openStatus(hours, new Date('2026-07-01T17:30:00Z')); // Wed 12:30 PM
    expect(s.open).toBe(true);
    expect(s.label).toBe('Open now · until 9:00 PM');
  });

  it('reports opens-today when before opening', () => {
    const s = openStatus(hours, new Date('2026-06-30T15:30:00Z')); // Tue 10:30 AM
    expect(s.open).toBe(false);
    expect(s.label).toBe('Closed · opens today at 11:00 AM');
  });

  it('reports the next open day when closed for the day', () => {
    const s = openStatus(hours, new Date('2026-06-29T18:00:00Z')); // Mon 1 PM
    expect(s.open).toBe(false);
    expect(s.label).toBe('Closed · opens Tuesday at 11:00 AM');
  });

  it('rolls to the next day after closing', () => {
    const s = openStatus(hours, new Date('2026-07-01T02:00:00Z')); // Tue 9 PM (just closed)
    expect(s.open).toBe(false);
    expect(s.label).toBe('Closed · opens Wednesday at 11:00 AM');
  });
});
