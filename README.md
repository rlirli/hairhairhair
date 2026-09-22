# hairhairhair.hair

An illustrated field guide for exploring hair-type vocabulary, hairstyles, and source-attributed celebrity appearances. The site is a work in progress, built as a static Astro application with TypeScript and Tailwind CSS.

## Local development

```sh
npm install
npm run dev
```

Astro prints the local URL after startup.

Before committing, run:

```sh
npm run format:check
npm run check
npm run build
npm test
```

The tests inspect the generated site in `dist/`, so `npm run build` must run before `npm test`.

## Contributing content

- [Add a hairstyle](docs/contributing/adding-a-hairstyle.md)
- [Add a person](docs/contributing/adding-a-person.md)
- [Browse all project documentation](docs/README.md)

The domain vocabulary is defined in [`CONTEXT.md`](CONTEXT.md). Keep content records, media metadata, research, and tests consistent in the same commit.

## Deployment

Pushes to `main` are deployed to [hairhairhair.hair](https://hairhairhair.hair/) through GitHub Pages. The workflow in `.github/workflows/deploy.yml` installs dependencies, builds Astro, uploads `dist/`, and deploys it with the repository's `public/CNAME` configuration.

Repository administrators must enable GitHub Actions as the Pages source and keep the custom-domain DNS and HTTPS settings configured in GitHub.
