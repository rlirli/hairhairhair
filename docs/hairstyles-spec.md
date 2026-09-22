# First hairstyle collection

## Outcome

Publish three researched guides at `/hairstyles/taper-fade/`, `/hairstyles/buzz-cut/`, and `/hairstyles/twists/`, with a browsable `/hairstyles/` index. A visitor can go from a hair type or sub-type to a relevant guide and return to that numbered hair type. Preserve the existing static Astro, TypeScript, Tailwind, light/dark theme, and GitHub Pages deployment.

## Model decisions

- A hairstyle has a stable ID separate from its slug. Its kind distinguishes a cut, a finishing technique, and a styling technique. Taper fade belongs to finishing techniques; buzz cut is a cut; the twists guide explicitly covers temporary two-strand twists.
- A variation is scoped to a hairstyle. Do not add empty future person, salon, review, or product models.
- A style example is separate from the hairstyle and references an array of hairstyle IDs. This allows future combined looks. Its image references a media record; it is not a person record.
- Each published guide has two style examples, one guidance row for each numbered hair type, and reciprocal links for every related published guide. Celebrity-inspired guides remain general hairstyle guides; person records link back to real appearances when evidence exists.
- Image provenance remains explicit in the data: generated reference versus attributed photograph. Generated images record their provider and prompt key, never a fictional photographer, exact natural hair type, or real-person identity.
- Pattern guidance is a single relationship table keyed by hairstyle ID and existing hair-type ID. Both directions of navigation derive from this table. Subtypes inherit type-level guidance, clearly described as general guidance rather than evidence about a specific subtype.
- Use qualitative notes, not suitability scores or guaranteed outcomes. The hairstyle page links to the relevant hair type and all three of its sub-type pages. All four hair types can explore all three guides, with honest differences in approach and hold described for twists.

## Page structure

1. Breadcrumbs, style name, category, short introduction, and a primary reference image.
2. Two-example reference gallery with captions about visible design details; generated-image provenance remains in the media data rather than appearing as a visual label, and depicted people receive no diagnostic classification.
3. Variations and a practical, copyable-in-the-browser consultation brief: what to ask the barber/stylist, with decisions about placement, length, finish, or part size. No new interactive copy control is required.
4. What changes the result and pattern-type guidance with links back to the hair-type guides.
5. Meaningful related-guide links and visible primary-source references with a reviewed date. No fabricated author expertise, testimonials, medical promises, maintenance schedules, or guard-length equivalences.

The homepage previews the new collection; primary navigation adds Hairstyles without breaking the mobile header. Hair-type and sub-type detail pages gain a compact hairstyle section. No account, CMS, database, search service, or external image hotlink is needed.

## Visual direction

Continue the existing editorial serif type, warm paper, dark charcoal, copper accents, and rounded cards. Give the photography-like references enough space to show the whole crown and hair silhouette. Never overlay important text on the image. Generated-image provenance stays in the data and is not shown as a visual label; the user's removal of the word Illustration from pattern drawings remains respected.

## Image plan

Six original generated reference portraits: a low taper with coily top, a low taper with wavy top, a very short even buzz, a longer textured buzz, short two-strand twists, and longer two-strand twists. Inspect each before use and make captions fit actual output. Do not infer a person's ethnicity, natural pattern code, or suitability from appearance. Keep prompt records in `docs/image-prompts.md` and originals under `src/assets/hairstyles/`; serve optimized responsive images through Astro. If generation cannot complete, report that limitation instead of disguising placeholders as completed photos.

## Verification and delivery

Check stable IDs, unique slugs, all relationship/image/source references, the three new guide routes and index, sitemap entries, and link targets in the generated site. Test that hair-type backlinks and hairstyle guidance come from the same records. Run type checks and a production build. Verify mobile and both themes in a browser when available; disclose a missing visual check. Keep commits scoped to content/model, UI/integration, and assets/verification as practical. Use the repository-local rlirli identity. Preserve the pre-existing uncommitted lockfile edit. User has approved commits and pushing this feature.
