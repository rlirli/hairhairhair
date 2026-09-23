# Hairstyle relations playground

The relation explorer is now integrated in Astro at `/hairstyle-map/`. To try the original standalone Vite playground, run `npm run explore:relations` from the repository root, then open the local URL Vite prints (normally `http://localhost:5173`).

The map reads published hairstyles and `relatedStyleIds` from `src/data/hairstyles.ts`. Node portraits use the first style example for each hairstyle, matching the images shown in the site's hairstyle cards.

Drag a node to rearrange the map; connected styles settle toward one another when released. Drag the background to pan, scroll to zoom, search by name, or filter to styles with connections.
