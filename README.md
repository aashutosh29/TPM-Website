# Tiverton Park Manor — Marketing Website

Production marketing site for [Tiverton Park Manor](https://tivertonparkmanor.com), rebuilt with audit fixes.

## Stack

- [Astro](https://astro.build) 7 + Tailwind CSS 4
- Vercel serverless adapter for contact and tour form APIs

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:4321

Forms submit to `/api/contact` and `/api/tour`. Without `RESEND_API_KEY`, submissions are accepted and logged server-side; set Resend env vars for email delivery (see `.env.example`).

## Build

```bash
npm run build
npm run preview
```

## Project docs

See the Park Manor Project store: `docs/rebuild-plan.md` for deployment and content notes.