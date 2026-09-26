/**
 * Versioned, reviewable prototype rubrics for hairstyle candidate rows.
 * Add one entry per hairstyle before generating its assessment matrix.
 */
export const rubrics = {
  "hairstyle-natural-afro": {
    id: "natural-afro-profile-rubric",
    version: "1.0.0",
    thresholds: { plausible: 0.7, needsReview: 0.4 },
    descriptionCue: "Keep a softly rounded silhouette, visible texture, and a natural rather than geometric perimeter.",
    dimensions: {
      pattern: ["straight", "wavy", "curly", "coily"],
      length: ["short", "medium", "long"],
      coverage: ["full", "sparse"],
    },
    labels: {
      pattern: {
        straight: "straight",
        wavy: "wavy",
        curly: "curly",
        coily: "coily",
      },
      length: { short: "short length", medium: "medium length", long: "long length" },
      coverage: { full: "full scalp coverage", sparse: "sparse scalp coverage" },
    },
    weights: {
      realism: { pattern: 0.55, length: 0.2, coverage: 0.25 },
      feasibility: { pattern: 0.45, length: 0.25, coverage: 0.3 },
    },
    criteria: {
      pattern: {
        straight: {
          score: 0.1,
          rationale: "Straight texture does not naturally create the defining curl or coil volume.",
        },
        wavy: { score: 0.25, rationale: "A loose wave provides limited natural expansion for this silhouette." },
        curly: {
          score: 0.75,
          rationale: "Curly texture can build volume, though the result differs from a coily Afro.",
        },
        coily: {
          score: 1,
          rationale: "Coily texture closely supports the style's natural volume and visible texture.",
        },
      },
      length: {
        short: { score: 0.45, rationale: "Short length can form a compact Afro but limits its volume." },
        medium: { score: 0.8, rationale: "Medium length supports a visible rounded shape and useful volume." },
        long: {
          score: 1,
          rationale: "Longer retained length supports the broad, full silhouette described for this style.",
        },
      },
      coverage: {
        full: { score: 1, rationale: "Full coverage supports a continuous rounded outline." },
        sparse: { score: 0.25, rationale: "Sparse coverage can interrupt the continuous volume of a rounded Afro." },
      },
    },
  },
};
