import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  formatVariants,
  startingPrice,
  getCategories,
  groupByCategory,
  filterItems,
  getAllTags,
  type MenuItem,
} from '../src/lib/menu';

const items: MenuItem[] = [
  {
    id: 'a',
    name: 'Focaccia Bread',
    description: 'Tomatoes, garlic, basil, mozzarella',
    category: 'starters',
    variants: [{ price: 7.99 }],
    tags: ['vegetarian', 'house-favorite'],
    featured: true,
  },
  {
    id: 'b',
    name: 'Fried Calamari',
    category: 'starters',
    variants: [{ price: 13.99 }],
    tags: ['seafood'],
  },
  {
    id: 'c',
    name: 'Cheese Pizza',
    category: 'pizza',
    variants: [
      { label: '12"', price: 12.99 },
      { label: '14"', price: 13.99 },
      { label: '16"', price: 15.99 },
    ],
    tags: ['vegetarian', 'pizza'],
  },
];

describe('formatPrice', () => {
  it('renders USD with two decimals', () => {
    expect(formatPrice(7.99)).toBe('$7.99');
    expect(formatPrice(12)).toBe('$12.00');
    expect(formatPrice(2.5)).toBe('$2.50');
  });
});

describe('formatVariants', () => {
  it('includes labels when present', () => {
    expect(formatVariants(items[2])).toEqual(['12" $12.99', '14" $13.99', '16" $15.99']);
  });
  it('omits label for single unlabeled variant', () => {
    expect(formatVariants(items[0])).toEqual(['$7.99']);
  });
});

describe('startingPrice', () => {
  it('returns the lowest variant price', () => {
    expect(startingPrice(items[2])).toBe(12.99);
    expect(startingPrice(items[0])).toBe(7.99);
  });
});

describe('getCategories', () => {
  it('returns distinct categories in first-seen order', () => {
    expect(getCategories(items)).toEqual(['starters', 'pizza']);
  });
});

describe('groupByCategory', () => {
  it('groups items and honors provided category order', () => {
    const grouped = groupByCategory(items, [
      { id: 'pizza', name: 'Pizza' },
      { id: 'starters', name: 'Starters' },
    ]);
    expect(grouped.map((g) => g.category)).toEqual(['pizza', 'starters']);
    expect(grouped[1].items).toHaveLength(2);
  });
  it('drops empty categories', () => {
    const grouped = groupByCategory(items, [
      { id: 'pizza', name: 'Pizza' },
      { id: 'desserts', name: 'Desserts' },
      { id: 'starters', name: 'Starters' },
    ]);
    expect(grouped.map((g) => g.category)).toEqual(['pizza', 'starters']);
  });
});

describe('filterItems', () => {
  it('filters by category', () => {
    expect(filterItems(items, { category: 'pizza' }).map((i) => i.id)).toEqual(['c']);
  });
  it('filters by ANY of the given tags', () => {
    const r = filterItems(items, { tags: ['seafood', 'pizza'] }).map((i) => i.id);
    expect(r).toEqual(['b', 'c']);
  });
  it('filters by case-insensitive query over name and description', () => {
    expect(filterItems(items, { query: 'CALAMARI' }).map((i) => i.id)).toEqual(['b']);
    expect(filterItems(items, { query: 'basil' }).map((i) => i.id)).toEqual(['a']);
  });
  it('combines tag and query filters', () => {
    expect(filterItems(items, { tags: ['vegetarian'], query: 'pizza' }).map((i) => i.id)).toEqual([
      'c',
    ]);
  });
  it('returns all items with empty options', () => {
    expect(filterItems(items)).toHaveLength(3);
  });
  it('returns empty array when nothing matches', () => {
    expect(filterItems(items, { query: 'zzznope' })).toEqual([]);
  });
});

describe('getAllTags', () => {
  it('returns sorted distinct tags', () => {
    expect(getAllTags(items)).toEqual(['house-favorite', 'pizza', 'seafood', 'vegetarian']);
  });
});
