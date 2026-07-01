import { defineCollection, z } from 'astro:content';

// ---- shared shapes -------------------------------------------------------
// Prices are stored as plain USD numbers (e.g. 13.99). formatPrice() in
// src/lib/menu.ts renders them as "$13.99". Records are intentionally shaped
// as stable, id'd rows (name, variants[], price, tags) so they could later
// back a cart or a database without reshaping (forward-compatibility).
const priceVariant = z.object({
  label: z.string().optional(),
  price: z.number().nonnegative(),
});

const category = z.object({
  id: z.string(),
  name: z.string(),
  note: z.string().optional(),
});

const menuItem = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  category: z.string(),
  variants: z.array(priceVariant).min(1),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  marketPrice: z.boolean().default(false),
});

const barItem = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  category: z.string(),
  region: z.string().optional(),
  variants: z.array(priceVariant).min(1),
});

// ---- collections ---------------------------------------------------------
const menu = defineCollection({
  type: 'data',
  schema: z.object({
    categories: z.array(category),
    items: z.array(menuItem),
  }),
});

const bar = defineCollection({
  type: 'data',
  schema: z.object({
    categories: z.array(category),
    items: z.array(barItem),
  }),
});

const site = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    established: z.number(),
    cuisine: z.string(),
    priceRange: z.string(),
    phone: z.string(),
    phoneHref: z.string(),
    email: z.string().optional(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
    }),
    mapQuery: z.string(),
    geo: z.object({ lat: z.number(), lon: z.number() }).optional(),
    timezone: z.string(),
    hours: z.array(
      z.object({
        day: z.enum(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']),
        open: z.string().nullable(), // "11:00" 24h, or null when closed
        close: z.string().nullable(), // "21:00" 24h, or null when closed
      }),
    ),
    social: z
      .object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
      })
      .default({}),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    reviews: z.array(
      z.object({
        quote: z.string(),
        author: z.string().default('Verified guest'),
        source: z.string().optional(),
      }),
    ),
  }),
});

export const collections = { menu, bar, site, testimonials };
