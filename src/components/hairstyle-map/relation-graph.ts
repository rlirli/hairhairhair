type RelationStyle = { id: string; relatedStyleIds: readonly string[] };
export type RelationLink = [source: number, target: number];

export function getRelationLinks(styles: readonly RelationStyle[]): RelationLink[] {
  const indices = new Map(styles.map((style, index) => [style.id, index]));
  const seen = new Set<string>();
  const links: RelationLink[] = [];

  styles.forEach((style, source) => {
    for (const id of style.relatedStyleIds) {
      const target = indices.get(id);
      if (target === undefined || target === source) continue;
      const key = `${Math.min(source, target)}:${Math.max(source, target)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      links.push([source, target]);
    }
  });

  return links;
}

export function getFocusedGraph<T extends RelationStyle>(styles: readonly T[], targetId: string, degrees: number) {
  const links = getRelationLinks(styles);
  const neighbors = styles.map(() => [] as number[]);
  for (const [source, target] of links) {
    neighbors[source].push(target);
    neighbors[target].push(source);
  }

  const target = styles.findIndex((style) => style.id === targetId);
  if (target === -1) return { nodes: [], links: [] };

  const depth = Number.isFinite(degrees) ? Math.max(0, Math.floor(degrees)) : 1;
  const nodes = [{ style: styles[target], degree: 0, parent: null as number | null }];
  const visible = new Map([[target, 0]]);
  const queue = [target];
  for (let index = 0; index < queue.length; index++) {
    const degree = nodes[index].degree + 1;
    if (degree > depth) break;
    for (const neighbor of neighbors[queue[index]]) {
      if (visible.has(neighbor)) continue;
      visible.set(neighbor, nodes.length);
      queue.push(neighbor);
      nodes.push({ style: styles[neighbor], degree, parent: index });
    }
  }

  const visibleLinks: RelationLink[] = [];
  for (const [source, target] of links) {
    const from = visible.get(source);
    const to = visible.get(target);
    if (from !== undefined && to !== undefined) visibleLinks.push([from, to]);
  }
  return { nodes, links: visibleLinks };
}

export function valueAtDegree<T>(values: readonly T[], degree: number, fallback: T): T {
  return values[Math.min(degree, values.length - 1)] ?? fallback;
}
