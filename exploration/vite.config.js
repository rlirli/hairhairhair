import { defineConfig } from "vite";

export default defineConfig({
  root: "exploration",
  server: { fs: { allow: [".."] } },
});
