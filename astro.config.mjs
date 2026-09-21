import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://hairhairhair.hair",
  trailingSlash: "always",
  vite: { plugins: [tailwindcss()] },
});
