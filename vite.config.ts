import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    // Tailwind v4 runs through its Vite plugin, so no PostCSS config is needed. Giving Vite an inline
    // (empty) config stops it searching parent folders and picking up an unrelated postcss.config.js,
    // such as one left in Downloads by another project.
    postcss: { plugins: [] },
  },
  build: {
    // The editor and Tailwind preview are lazy-loaded chunks, so their size is fine.
    chunkSizeWarningLimit: 700,
  },
  resolve: {
    alias: {
      // lets us write `@/engine/types` instead of ../../engine/types
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
