# Japle Ligaya — portfolio

React + TypeScript + Vite. Local, client-side portfolio prepared for Vercel. No production project services or databases are connected.

## Run and verify

```sh
npm install
npm run dev
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
npm run preview
```

Browser tests use installed Google Chrome. Change `channel` in `playwright.config.ts` for a different installed browser. `node scripts/visual-check.mjs` captures local visual QA with the dev server running. Screenshots are saved to ignored `artifacts/`.

## Content and architecture

- `src/models`: typed domain contracts.
- `src/data`: project content, all 35 technologies, contact destinations, resume paths, and media.
- `src/controllers`: theme, project/technology filters, shared gallery, and resume state.
- `src/services`: ordered media resolution and PDF validation.
- `src/views`: shared case-study page, sections, original SVG illustrations, galleries, demos, and UI.
- `src/styles`: theme tokens, responsive layouts, and scene-aware animation rules.

## Project media

The current manifest includes 40 curated screenshots across all six projects. Responsive WebP variants preserve the source aspect ratios. Both supplied portraits are integrated in About. Original captures with contract/payment records, precise geofence details, or infrastructure-console information remain outside public assets in ignored staging.

Put images in `public/images/projects/` and optional videos in `public/videos/`. Update only `src/data/mediaManifest.ts`; the homepage, project gallery, and fullscreen viewer read the same manifest. Items support captions, ordering, alt text, responsive image source sets, dimensions, video posters, and optional WebVTT captions. Public paths begin with `/images/` or `/videos/`, without `/public`.

An empty list displays three explicitly labeled original animated covers. A single item disables navigation and autoplay. Failed media falls back to labeled original artwork. Video sound is never autoplayed; playback pauses on slide change, offscreen, and when the document is hidden.

Project descriptions and attribution follow the supplied brief. Interactive previews use fictional local data. The Map Explorer sample region names link to the Philippine Statistics Authority.

## Resumes

Both original PDFs are included at `public/resumes/Japle_A_Ligaya_Resume_ATS.pdf` and `public/resumes/Japle_A_Ligaya_Resume_With_Photo.pdf`, with SHA-256 hashes matching the supplied files. The viewer validates the response content type and PDF signature, and enables preview/download only for available files. PDF zoom depends on native browser support; mobile users can open the actual PDF in a new tab.

## Presentation and motion

Dark is the default theme. The header Light/Dark switch persists the selected mode, and the Resume / CV button scrolls directly to the resume section. Desktop sizes use a 125% type/spacing scale with adaptive tablet and mobile sizes, while browser zoom remains independent. Ambient programming logos and the decorative cursor use transforms and passive pointer listeners. The normal cursor remains available. Decorative motion and autoplay stop for reduced-motion preferences, including preference changes while the site is open.

## Vercel

Import this workspace as a Vite project. Build command: `npm run build`. Output: `dist`. The included `vercel.json` handles nested routes while letting missing asset URLs return real file errors.

Set `VITE_SITE_URL` to the actual deployed origin, then rebuild to generate `sitemap.xml`, canonical links, and absolute social image URLs. No domain is assumed before configuration. `robots.txt` is included. Social preview structure and a local PNG are provided.

Inter and JetBrains Mono are self-hosted. Their OFL licenses are included in `public/fonts/`.

## Visitor statistics

The Vercel function at /api/visitors uses Upstash Redis (KV_REST_API_URL/KV_REST_API_TOKEN, or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN). Secrets stay server-side. Use the free plan with automatic upgrades disabled. The footer refreshes every 30 seconds while the page is visible. Online browsers expire after 75 seconds without a visible-page heartbeat, using Redis server time. A signed, Secure, HttpOnly browser cookie lasts one year; first-time browsers must return that cookie before any visit is counted, so blocked cookies cannot create a new visit every heartbeat; visits increment only after 30 minutes of inactivity. Browser Web Locks serialize initial requests across tabs, and short-lived local snapshots share heartbeat results across tabs and reloads. Storage-disabled browsers still deduplicate through the cookie, though browsers without Web Locks may race on simultaneous first visits. Hidden/offline tabs stop polling; requests time out and failures back off up to five minutes. Reconnecting resumes automatically. Common bots, monitoring tools, and speculative prefetches are excluded. Existing totals are retained; the identity upgrade may count one new session for browsers using the previous cookie. Optionally set VISITOR_COOKIE_SECRET to keep signatures stable independently of Redis token rotations. This is a session count, not a verified unique-person count. Common bots are excluded. If storage is unavailable, no count is fabricated.

CV downloads retain the original PDF contents with professional download names: Japle_A_Ligaya_Resume_ATS.pdf and Japle_A_Ligaya_Resume_With_Photo.pdf.
