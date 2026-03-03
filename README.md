# Earth Science Regents Site

Marketing/support website for the **Earth Science Regents Study** iOS app, built with React, Vite, and Tailwind CSS.

## Tech Stack

- React 18
- Vite
- Tailwind CSS + PostCSS
- ESLint
- Lucide React icons

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start local dev server with hot reload
- `npm run build` - Create a production build in `dist/`
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint checks
- `npm run deploy` - Deploy `dist/` to GitHub Pages via `gh-pages`

## Deployment Notes

This repo is configured for GitHub Pages publishing with:

- `homepage` set in `package.json`
- `deploy` script using `gh-pages -d dist`

If the deployed site serves from a repository subpath, make sure `base` in `/Users/mekambo/Development/mekambo-site/vite.config.js` matches that subpath before deploying.

## Project Structure

```text
.
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## App Notes

- Main landing experience and support form logic are in `/Users/mekambo/Development/mekambo-site/src/App.jsx`.
- The support form is configured for Netlify form handling (`data-netlify="true"`) and also posts with AJAX from the client.

## Feedback Form (FormSubmit)

To receive feedback emails from the live GitHub Pages site:

1. Create a local `.env` from `.env.example`.
2. Set `VITE_FEEDBACK_ENDPOINT` to your FormSubmit AJAX endpoint:
   - `https://formsubmit.co/ajax/you@example.com`
3. Run the site and submit a test form once.
4. Confirm your email via FormSubmit's verification message.

After verification, form submissions will be delivered to your email.

## License

No license file is currently defined in this repository.
