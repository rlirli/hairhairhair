# Generate a hairstyle candidate matrix

The prototype creates a complete candidate matrix for one hairstyle from the hairstyle catalog. It generates a profile-specific description and keeps separate realism and feasibility assessments, rationale, rubric provenance, and review status for every row. It does not generate images or use person profiles.

## Generate a matrix

Run the local pipeline with a hairstyle slug or ID:

```sh
pnpm generate:content -- --hairstyle natural-afro
```

The command writes a versioned snapshot under `generated/content-matrices/<slug>/<snapshot-id>/`:

- `matrix.json` is the machine-readable snapshot.
- `index.html` is a standalone, filterable visualizer. Open it in a browser; it has no server or network dependency.

For the initial prototype, `natural-afro` expands to 24 combinations of four patterns, three lengths, and two coverage values. All rows stay in the snapshot, including challenging candidates. Pass `--output-dir <path>` to write elsewhere.

## Assessment and extension

The first rubric is a deterministic editorial estimate, not an AI-generated evaluation, compatibility recommendation, or reviewed result. Scores and thresholds are visible in `scripts/content-generation/rubrics.mjs`. Each output row records the rubric ID and version, source hairstyle summary, method, and unreviewed status. This makes the generated snapshot repeatable and auditable without incurring model or image-generation costs.

Before running the command for another hairstyle, add a versioned rubric keyed by its catalog ID in `scripts/content-generation/rubrics.mjs`. Define the profile dimensions, labels, weighted criteria, scores, and rationale for every value. The generator fails closed when a style has no rubric or an input value has no criterion.

Keep generated snapshots separate from the source hairstyle catalog. Review rubric choices and generated text before treating candidate rows as editorially approved content.
