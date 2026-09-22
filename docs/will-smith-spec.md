# Will Smith: two release phases

## Phase 1 — publish the person first

Create `/people/` and `/people/will-smith/` with original editorial writing and locally stored, source-verified public-domain photographs only. Show exact capture dates where recorded; never substitute upload dates. Current usable coverage starts in 2009; do not imply a complete career timeline or invent missing decades. Do not copy biography prose or generate a likeness of Smith.

Model Person separately from dated Appearance. Each Appearance connects a person to a photo and one or more editorial hairstyle observations. Observations describe the visible cut, not a verified stylist's terminology or an immutable natural hair type. Do not infer ethnicity, natural color, density, porosity, or exact 1A–4C subtype. Keep dates with explicit precision and supporting source URLs. Photo provenance includes creator/agency, source record, original download URL, public-domain basis/jurisdiction, rights evidence URL, and accession identifier.

Keep this static Astro/TypeScript/Tailwind with no database. Use pure data modules for people/appearance relationships and separately imported Astro image assets. Extend the media provenance union with an explicit public-domain case rather than representing it as an attribution license or generated reference. Preserve existing generated-image labeling.

The person page has breadcrumbs, a concise factual introduction, a source-attributed hero, and a compact newest-first appearances preview with face-cropped images, capture dates, event titles, and a link to the full `/appearances/` overview. The separate appearances overview retains the detailed source and hairstyle-observation records; its cards link back to the person record until dedicated single-appearance pages exist. Use original wording and keep biography minimal: actor and recording artist is sufficient.

Integrate People navigation and a homepage introduction. Derive hairstyle-page backlinks to Will Smith's appearances from the same relationship records, including anchors to dated entries. Add sitemap URLs, canonical metadata and optimized raster social image. Preserve narrow-screen navigation and both themes. Prefer readable multiline new templates. Keep original photos unaltered on disk; responsive images must not cut off the hairstyle or upscale low-resolution archive images.

For a newly observed hairstyle absent from the library, create a real minimal stub record with an explicit `stub` status and canonical page: title, short scope, 'Full guide coming next', and the observed person/photo backlink. Do not generate style images or fill consultation/variation/source sections until AFTER phase 1 has been committed and pushed. Existing three hairstyles are `published`. Prefer a discriminated union so stub records do not pretend to have complete guide fields.

Likely new style: `flat-top` (low, squared top visible in the 2011 photograph); confirm against inspected photos before finalizing. Do not add famous hairstyles for which selected photos provide no visible evidence. Existing close cropped examples may link to buzz-cut with clear editorial wording.

Verify relationship IDs, dates/precision/source provenance, no restricted-license media on the person page, no generated images passed off as real appearances, real backlinks, local image targets, canonical/sitemap routes, and intentional stub status. Adapt the existing tests to data-derived page/guide counts rather than deleting coverage. Run check/build/test. Commit and push phase 1 explicitly before any phase-2 implementation or image generation.

## Phase 2 — complete only the new style guides

After phase-1 push succeeds, research the pending style(s), fill their guides to the existing standard, add clearly labeled generated images of fictional adults (not Will Smith), and convert their statuses to published. Retain the actual dated Will Smith photo backlinks as a distinct real-world examples section. Keep pending-guide list explicit and update it on completion. Verify again, then make a separate commit and push.
