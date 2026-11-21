import { describe, expect, it } from "vitest";
import {
  fitFullMap,
  fullMapLabelLines,
  layoutMapGroups,
  mapBounds,
} from "../../src/components/hairstyle-map/full-map-layout";
import { getRelationLinks } from "../../src/components/hairstyle-map/relation-graph";
import { publishedHairstyles } from "../../src/data";

describe("full hairstyle map layout", () => {
  const labels = publishedHairstyles.map(({ name }) => fullMapLabelLines(name));
  const links = getRelationLinks(publishedHairstyles);
  const radius = 36;

  it.each([
    { width: 350, height: 606 },
    { width: 920, height: 624 },
  ])("fits every portrait and label inside a $width × $height overview with space between them", (viewport) => {
    const groups = layoutMapGroups(labels, links, radius);
    const { positions, width, height } = fitFullMap(groups, viewport);
    expect(positions).toHaveLength(labels.length);

    const bounds = positions.map((_, i) => mapBounds(positions, labels, radius, [i]));
    for (const [i, a] of bounds.entries()) {
      expect(a.left).toBeGreaterThanOrEqual(0);
      expect(a.top).toBeGreaterThanOrEqual(0);
      expect(a.right).toBeLessThanOrEqual(width);
      expect(a.bottom).toBeLessThanOrEqual(height);
      for (const b of bounds.slice(i + 1)) {
        expect(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top).toBe(true);
      }
    }
  });
});
