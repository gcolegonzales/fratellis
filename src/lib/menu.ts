// Pure, unit-testable menu logic. No Astro imports so it can be tested in
// isolation and reused by both the food menu and the bar page.

export interface PriceVariant {
  label?: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  category: string;
  variants: PriceVariant[];
  tags?: string[];
  featured?: boolean;
  marketPrice?: boolean;
  region?: string;
}

export interface Category {
  id: string;
  name: string;
  note?: string;
}

export interface FilterOptions {
  category?: string;
  tags?: string[];
  query?: string;
}

/** Render a USD number as "$13.99". */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/** A dish's variants as display strings, e.g. `['12" $12.99', '14" $13.99']`. */
export function formatVariants(item: Pick<MenuItem, 'variants'>): string[] {
  return item.variants.map((v) =>
    v.label ? `${v.label} ${formatPrice(v.price)}` : formatPrice(v.price),
  );
}

/** The lowest price across an item's variants (useful for sorting/"from"). */
export function startingPrice(item: Pick<MenuItem, 'variants'>): number {
  return item.variants.reduce((min, v) => (v.price < min ? v.price : min), Infinity);
}

/** Distinct category ids present in the given items, in first-seen order. */
export function getCategories(items: MenuItem[]): string[] {
  const seen: string[] = [];
  for (const item of items) {
    if (!seen.includes(item.category)) seen.push(item.category);
  }
  return seen;
}

/** Group items by category, preserving the order of `categories` when given. */
export function groupByCategory(
  items: MenuItem[],
  categories?: Category[],
): Array<{ category: string; items: MenuItem[] }> {
  const order = categories ? categories.map((c) => c.id) : getCategories(items);
  const buckets = new Map<string, MenuItem[]>();
  for (const id of order) buckets.set(id, []);
  for (const item of items) {
    if (!buckets.has(item.category)) buckets.set(item.category, []);
    buckets.get(item.category)!.push(item);
  }
  return [...buckets.entries()]
    .filter(([, list]) => list.length > 0)
    .map(([category, list]) => ({ category, items: list }));
}

/** Filter by category, ANY of the given tags, and a case-insensitive query. */
export function filterItems(items: MenuItem[], opts: FilterOptions = {}): MenuItem[] {
  const query = opts.query?.trim().toLowerCase() ?? '';
  const tags = opts.tags ?? [];
  return items.filter((item) => {
    if (opts.category && item.category !== opts.category) return false;
    if (tags.length > 0) {
      const itemTags = item.tags ?? [];
      if (!tags.some((t) => itemTags.includes(t))) return false;
    }
    if (query) {
      const haystack = `${item.name} ${item.description ?? ''}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

/** Distinct tags across items, sorted alphabetically. */
export function getAllTags(items: MenuItem[]): string[] {
  const set = new Set<string>();
  for (const item of items) for (const t of item.tags ?? []) set.add(t);
  return [...set].sort();
}
