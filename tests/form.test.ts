import { describe, it, expect } from 'vitest';
import {
  isNonEmpty,
  isValidEmail,
  isNotPastDate,
  isPositiveInt,
  validateReservation,
  validateCatering,
  hasErrors,
} from '../src/lib/form';

const TODAY = new Date(2026, 5, 30); // 2026-06-30 (local)

describe('field helpers', () => {
  it('isNonEmpty', () => {
    expect(isNonEmpty('Gio')).toBe(true);
    expect(isNonEmpty('  ')).toBe(false);
    expect(isNonEmpty('')).toBe(false);
  });
  it('isValidEmail', () => {
    expect(isValidEmail('a@b.com')).toBe(true);
    expect(isValidEmail('a.b@sub.domain.co')).toBe(true);
    expect(isValidEmail('nope')).toBe(false);
    expect(isValidEmail('a@b')).toBe(false);
  });
  it('isNotPastDate', () => {
    expect(isNotPastDate('2026-06-30', TODAY)).toBe(true); // today
    expect(isNotPastDate('2026-07-01', TODAY)).toBe(true); // future
    expect(isNotPastDate('2026-06-29', TODAY)).toBe(false); // past
    expect(isNotPastDate('not-a-date', TODAY)).toBe(false);
  });
  it('isPositiveInt', () => {
    expect(isPositiveInt('4')).toBe(true);
    expect(isPositiveInt('0')).toBe(false);
    expect(isPositiveInt('-2')).toBe(false);
    expect(isPositiveInt('3.5')).toBe(false);
    expect(isPositiveInt('9999', 100)).toBe(false);
  });
});

describe('validateReservation', () => {
  const valid = {
    name: 'Gio',
    phone: '225-555-0100',
    email: 'gio@example.com',
    date: '2026-07-04',
    time: '19:00',
    partySize: '4',
  };

  it('passes a fully valid reservation', () => {
    expect(hasErrors(validateReservation(valid, TODAY))).toBe(false);
  });
  it('flags empty required fields', () => {
    const e = validateReservation({ ...valid, name: '', phone: '' }, TODAY);
    expect(e.name).toBeTruthy();
    expect(e.phone).toBeTruthy();
  });
  it('flags an invalid email', () => {
    expect(validateReservation({ ...valid, email: 'bad' }, TODAY).email).toBeTruthy();
  });
  it('flags a past date', () => {
    expect(validateReservation({ ...valid, date: '2026-01-01' }, TODAY).date).toBeTruthy();
  });
  it('flags a bad party size', () => {
    expect(validateReservation({ ...valid, partySize: '0' }, TODAY).partySize).toBeTruthy();
  });
});

describe('validateCatering', () => {
  const valid = {
    name: 'Lola',
    phone: '225-555-0100',
    email: 'lola@example.com',
    eventDate: '2026-08-01',
    headcount: '40',
  };
  it('passes a valid inquiry', () => {
    expect(hasErrors(validateCatering(valid, TODAY))).toBe(false);
  });
  it('flags a past event date and empty headcount', () => {
    const e = validateCatering({ ...valid, eventDate: '2025-01-01', headcount: '' }, TODAY);
    expect(e.eventDate).toBeTruthy();
    expect(e.headcount).toBeTruthy();
  });
});
