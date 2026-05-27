# AGENTS.md — Robles Imobiliária

Luxury real estate website for the Brazilian market. Built with TanStack Start and deployed on Vercel.

## Project Overview

### Tech Stack

| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5 |
| Deployment | Vercel |

## Directory Structure

```
src/
  data/
    properties.ts      12 mock properties + Property interface + helper functions
  components/
    PropertyCard.tsx   3 variants: default / compact / horizontal
  routes/
    __root.tsx         Root layout: Navbar (transparent on home) + Outlet + Footer
    index.tsx          Home: hero search, featured grid, categories, cities, testimonials
    buscar.tsx         Search: URL-synced filters, grid/list view, mobile drawer
    imovel/$id.tsx     Detail: gallery, specs, launch progress, contact form, similar
    lancamentos.tsx    Launches: editorial alternating layout + process steps
    sobre.tsx          About: story, stats, team, values, awards
    contato.tsx        Contact: form, offices, social links, FAQ accordion
  styles.css           Tailwind @theme tokens + Google Fonts + utility classes
  router.tsx           Router setup (routeTree.gen auto-generated)
```

## Key Conventions

### Routing & Search Params
`/buscar` uses `validateSearch` returning `BuscarSearch` type. All filter state is in the URL. Update filters with `navigate({ search: (prev) => ({ ...prev, key: value }) })`.

### Styling Tokens (Tailwind v4 @theme)
Colors: `bg-cream` `bg-charcoal` `bg-gold` `bg-cream-dark` `text-warm-gray` `border-cream-border`  
Fonts: `font-display` (Playfair Display) · `font-sans` (DM Sans)  
Utilities: `.btn-gold` `.btn-outline` `.property-card` `.hero-gradient` `.section-title` `.nav-link`

### Non-Obvious Design Decisions
- Navbar is transparent on `/` (over hero) and opaque elsewhere — driven by `pathname === '/'` in `useRouterState`
- All filtering is client-side `useMemo` — no server calls, data is static mock
- `LaunchProgress` renders a 4-step tracker driven by `property.launchStatus`

## Development

```bash
npm run dev    # Dev server on :3000
npm run build  # Production build
```
