# hairhairhair.hair

An illustrated field guide for exploring hair-type vocabulary, hairstyles, and source-attributed celebrity appearances. The site is a work in progress, built as a static Astro application with TypeScript and Tailwind CSS.

## Local development

```sh
npm install
npm run dev
```

Astro prints the local URL after startup.

Explore hairstyle connections at `/hairstyle-map/` while the development server is running. The map uses the same published hairstyle records and example images as the hairstyle directory.

Before committing, run:

```sh
npm run verify
```

`npm run verify` checks formatting and types, removes stale build output, rebuilds the site, and runs the content-integrity tests. `npm test` also performs a clean build before testing generated pages.

## Contributing content

- [Add a hairstyle](docs/contributing/adding-a-hairstyle.md)
- [Add a person](docs/contributing/adding-a-person.md)
- [Browse all project documentation](docs/README.md)

The canonical Git-tracked records and image assets live in `src/content/`. Add new hairstyles and people through package folders in `inbox-hairstyles/` and `inbox-people/`: `npm run import:hairstyles` and `npm run import:people` validate and preview by default; add `-- --apply` to write linked records/assets and archive the package. Package contracts are in `public/schemas/`. Validate records, relationships, and image paths with `npm run validate:content`; `npm run check` runs this before Astro's type checks. See [the content model](docs/content-model.md) for the directory structure and contributor workflow.

The domain vocabulary is defined in [`CONTEXT.md`](CONTEXT.md). Keep content records, media metadata, research, and tests consistent in the same commit.

## Deployment

Pushes to `main` are deployed to [hairhairhair.hair](https://hairhairhair.hair/) through GitHub Pages. The workflow in `.github/workflows/deploy.yml` installs dependencies, builds Astro, uploads `dist/`, and deploys it with the repository's `public/CNAME` configuration.

Repository administrators must enable GitHub Actions as the Pages source and keep the custom-domain DNS and HTTPS settings configured in GitHub.
