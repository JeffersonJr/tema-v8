# Robles Imobiliária

A full-featured luxury real estate website built with TanStack Start, React, and Tailwind CSS v4. Showcases high-end residential properties across Brazil with a refined minimalist aesthetic.

## Features

- **Home page** — Hero with integrated search (buy/rent/launches + search by code), featured property grid, city selector, testimonials, and CTA sections
- **Property Search** (`/buscar`) — Filter by purpose, type, city, neighborhood, bedrooms, price range; grid/list view toggle; active filter chips; mobile filter drawer
- **Property Detail** (`/imovel/:id`) — Image gallery, full specs, features list, costs breakdown, launch progress tracker, contact agent form, similar properties
- **Launches** (`/lancamentos`) — Alternating editorial layout for new developments with progress indicators
- **About** (`/sobre`) — Company story, team profiles, stats, values, awards
- **Contact** (`/contato`) — Multi-channel contact, office locations, FAQ accordion

## Tech Stack

- [TanStack Start](https://tanstack.com/start) — SSR React framework
- [TanStack Router](https://tanstack.com/router) — File-based routing with typed search params
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first styling with custom theme tokens
- [Lucide React](https://lucide.dev) — Icon library
- [Vercel](https://vercel.com) — Hosting and deployment

## Design System

**Palette:** Warm cream (`#F5F0E8`), deep charcoal (`#1C1916`), burnished gold (`#C4923A`)  
**Typography:** Playfair Display (headings) + DM Sans (body)  
**Aesthetic:** Refined luxury minimalism — editorial spacing, grain texture overlay, smooth hover states

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Requires Node.js 18+
