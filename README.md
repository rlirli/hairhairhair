# hairhairhair.hair

An illustrated, static field guide to hair type vocabulary and hairstyle conversations. Built with Astro, TypeScript, and Tailwind CSS.

## Content

The site starts with a modern expanded Walker-inspired reference chart: 12 visible pattern types from 1A through 4C, grouped into four numbered types—straight, wavy, curly, and coily. Pattern is descriptive only; it does not determine strand thickness, density, porosity, identity, or style suitability.

The hairstyle collection adds three researched guides:

- **Taper fade** — a finishing technique for discussing blend placement, perimeter, and finish.
- **Buzz cut** — a short clipper-led cut with choices about evenness, top length, and edges.
- **Two-strand twists** — a styling technique distinguished from flat twists, braids, and loc services.

Each guide includes variations, consultation prompts, type-level pattern guidance, related styles, and two AI-generated reference images. The references are fictional visual aids: captions describe visible design details and do not infer a depicted person’s exact natural pattern, density, ethnicity, or suitability. See [`CONTEXT.md`](CONTEXT.md), [`docs/hairstyles-spec.md`](docs/hairstyles-spec.md), [`docs/hairstyles-research.md`](docs/hairstyles-research.md), [`docs/content-notes.md`](docs/content-notes.md), [`docs/hairstyle-imagery-research.md`](docs/hairstyle-imagery-research.md), and [`docs/image-prompts.md`](docs/image-prompts.md) for the language model, editorial research, image limits, and prompt records.

## Local setup

```sh
npm install
npm run dev
```

Open the local URL Astro prints. Run `npm run check` for type and template checks, then `npm run build` for the production bundle in `dist/`.

CI uses Node 24 and verifies the complete sequence:

```sh
npm run check && npm run build && npm test
```

The tests inspect the built HTML, so run the build before `npm test`.

## GitHub Pages deployment

Push the repository's `main` branch to GitHub. The workflow in `.github/workflows/deploy.yml` installs dependencies, builds Astro, uploads `dist`, and deploys through GitHub Pages. In repository Settings → Pages, choose **GitHub Actions** as the source. The repository must have Pages enabled; GitHub's private-repository Pages availability depends on the account plan.

`public/CNAME` and `astro.config.mjs` use `hairhairhair.hair`. In Pages settings, add that custom domain and enable HTTPS. At your DNS provider, point the apex domain at GitHub Pages' published IP addresses (or use the exact records GitHub shows), and add the `www` CNAME only if you intend to use it. DNS propagation can take up to 48 hours. This repository does not claim the domain is currently live.
