# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

This is a Next.js 16 portfolio website that fetches all content from Google Sheets and caches it using Next.js ISR.

### Data Flow

```
Google Sheets → lib/google-sheets.ts (fetch) → lib/data.ts (cache with unstable_cache) → Server Components
```

- **lib/google-sheets.ts**: Raw data fetching from Google Sheets API using service account auth
- **lib/data.ts**: Wraps fetchers with `unstable_cache` for 30-day ISR caching, uses cache tags for invalidation
- **app/api/cache/clear/route.ts**: On-demand cache invalidation endpoint (requires token)

### Google Sheets Structure (4 sheets)

1. **profile**: Key-value pairs (name, title, bio, about, avatar, email)
2. **socials**: platform, url, icon, order
3. **skills**: name, order
4. **portfolio**: title, description, images (comma-separated), webUrl, playStoreUrl, appStoreUrl, tags (comma-separated), isVisible (1/0), order

### Key Components

- **app/page.tsx**: Main server component, fetches all data and renders sections
- **components/portfolio.tsx**: Project cards with image carousel and tooltips
- **components/image-carousel.tsx**: Embla-based carousel for project images
- **components/hero.tsx**: Hero section with avatar and inline social links

### Environment Variables

Required in `.env.local` (see `.env.example`):
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY` (handles single-line or multi-line format)
- `GOOGLE_SHEET_ID`
- `CACHE_CLEAR_TOKEN`

### Cache Invalidation

```
GET /api/cache/clear?token=TOKEN           # Clear all caches
GET /api/cache/clear?token=TOKEN&tag=portfolio  # Clear specific tag
```

Valid tags: `profile`, `socials`, `portfolio`, `skills`

### Tech Stack

- Next.js 16 (App Router, Turbopack)
- shadcn/ui + Tailwind CSS
- Framer Motion (animations)
- next-themes (dark mode)
- embla-carousel-react (image carousel)
- googleapis (Google Sheets API)
