# clement.digital

Personal site for Clement Ibeneche, built for two audiences: businesses looking for services, and recruiters reading it as a CV.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, framer-motion. A FastAPI backend in `api/` (Firestore and Resend) serves projects, experience and the contact form. Hosted on Vercel.

## Run locally

```bash
npm install
npm run dev                                         # expects the API on http://127.0.0.1:8000
API_TARGET=https://clement.digital npm run dev      # or use the live API's data instead
```

`API_TARGET` only changes where the dev server sends `/api` requests. With it set, the contact form and admin panel act on production data.

Other scripts: `npm run build`, `npm run lint`, `npm run preview`.

## How the page works

- **Audience views.** After the hero, visitors choose "I'm looking for services" or "I'm hiring", and the sections are reordered for them. The orders are set in `viewOrder` in `src/App.tsx`. The choice is remembered in `localStorage`. The links `?view=business` and `?view=cv` open a view directly and can be shared.
- **Content.** Projects and experience come from the API and are managed in the admin panel at `/admin`. The panel can only add and delete entries, not edit them, so to change one, delete it and add it again. Experience is shown newest first. Stray spaces before punctuation are tidied when the text is displayed (`src/lib/text.ts`).
- **Motion.** Scroll-in reveals live in `src/lib/motion.ts`. Section depth, parallax and cursor tilt are in `src/index.css`, with `DepthSection` and `TiltCard` in `src/components/`. All motion switches off with the visitor's reduced-motion setting.

## Assets in `public/`

| File | Used for |
|---|---|
| `image2.png` to `image8.png`, `invoice-app.png` | Project covers. The file names must match each project's image URL in the database. |
| `verplex-*.jpg`, `gradxp-*.jpg` | Venture images (front and back) |
| `about-front.jpeg`, `about-back.jpg` | The Approach |
| `cv.pdf` | "Download CV" button (saved as `Clement-Ibeneche-CV.pdf`) |
| `og-image.png`, `favicon.png`, `apple-touch-icon.png` | Share preview and icons |

## Deploy

Every push to `main` builds and deploys on Vercel. The `clement.digital` domain must be assigned to this Vercel project for those deploys to go live.
