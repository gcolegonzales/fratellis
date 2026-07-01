import { describe, it, expect } from 'vitest';
import { withBase, isActive } from '../src/lib/base';

describe('withBase', () => {
  it('leaves internal links unchanged at root base', () => {
    expect(withBase('/menu', '/')).toBe('/menu');
    expect(withBase('/', '/')).toBe('/');
  });

  it('prefixes internal links under a project subpath', () => {
    expect(withBase('/menu', '/fratellis/')).toBe('/fratellis/menu');
    expect(withBase('/', '/fratellis/')).toBe('/fratellis/');
    expect(withBase('from-the-bar', '/fratellis/')).toBe('/fratellis/from-the-bar');
  });

  it('does not double-prefix or mangle nested paths', () => {
    expect(withBase('/menu/', '/fratellis/')).toBe('/fratellis/menu/');
  });

  it('passes through absolute URLs and non-navigational schemes', () => {
    expect(withBase('https://formspree.io/f/x', '/fratellis/')).toBe('https://formspree.io/f/x');
    expect(withBase('mailto:a@b.com', '/fratellis/')).toBe('mailto:a@b.com');
    expect(withBase('tel:+12253134704', '/fratellis/')).toBe('tel:+12253134704');
    expect(withBase('#section', '/fratellis/')).toBe('#section');
    expect(withBase('//cdn.example.com/x', '/fratellis/')).toBe('//cdn.example.com/x');
  });
});

describe('isActive', () => {
  it('matches the current path under a base, trailing-slash tolerant', () => {
    expect(isActive('/menu', '/fratellis/menu', '/fratellis/')).toBe(true);
    expect(isActive('/menu', '/fratellis/menu/', '/fratellis/')).toBe(true);
    expect(isActive('/', '/fratellis/', '/fratellis/')).toBe(true);
  });
  it('does not match a different path', () => {
    expect(isActive('/menu', '/fratellis/about', '/fratellis/')).toBe(false);
    expect(isActive('/', '/fratellis/menu', '/fratellis/')).toBe(false);
  });
});
