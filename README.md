# Pandora War — Official Player Guide

Website V1.0. Static HTML, CSS and JavaScript; no npm dependencies or build step.

- `public/index.html`: page content, rosters, rules, connection and installation details.
- `public/assets/site.css`: visual styles, responsive layouts and reduced-motion rules.
- `public/assets/site.js`: routing, search, slideshow, sidebar and dialogs.
- `public/assets/`: optimized battlefield and objective photos, Modrinth screenshots, favicon and social preview.
- `public/legacy/`: old-link compatibility pages.
- `vercel.json`: static hosting configuration, with explicit output directory and old route rewrites.

## Preview locally

From the repository root, run `python -m http.server 8000 --directory public` and open http://localhost:8000/ (Python is optional; any static server works). Legacy route rewrites are Vercel-specific.

## Deployment

Push to a non-production branch and inspect the Vercel preview. Open a pull request targeting `main`. Do not merge until approved. Production uses the existing Vercel project; configuration is scoped to this version via `vercel.json`. Existing main history preserves the original React website.

## Pending launch content

The modpack download remains disabled until a verified link is supplied. Two roster slots remain pending. Verify objective instructions and death policy against the release candidate. The Control Point screenshot is not yet supplied. The server address is the user-provided address; joining cannot start the server before launch.

Do not commit the campaign seed, private configuration, personal map data, original 8K images or the modpack itself. The repository is public. Review the two installation screenshots for unrelated personal instance information before public promotion.
