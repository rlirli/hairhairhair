# hairhairhair.hair

An illustrated, static field guide to hair type vocabulary. Built with Astro, TypeScript, and Tailwind CSS.

## Local setup

```sh
npm install
npm run dev
```

Open the local URL Astro prints. Run `npm run check` for type and template checks, then `npm run build` for the production bundle in `dist/`.

## GitHub Pages deployment

Push the repository's `main` branch to GitHub. The workflow in `.github/workflows/deploy.yml` installs dependencies, builds Astro, uploads `dist`, and deploys through GitHub Pages. In repository Settings → Pages, choose **GitHub Actions** as the source. The repository must have Pages enabled; GitHub's private-repository Pages availability depends on the account plan.

`public/CNAME` and `astro.config.mjs` use `hairhairhair.hair`. In Pages settings, add that custom domain and enable HTTPS. At your DNS provider, point the apex domain at GitHub Pages' published IP addresses (or use the exact records GitHub shows), and add the `www` CNAME only if you intend to use it. DNS propagation can take up to 48 hours. This repository does not claim the domain is currently live.
