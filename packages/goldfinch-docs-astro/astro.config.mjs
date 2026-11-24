// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [mdx(), react(), sitemap()],
  site: "https://goldfinch.catiarodrigues.dev/",
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "vesper" },
      defaultColor: false,
    },
  },
  vite: {
    // @tailwindcss/vite resolves Vite 8 types, Astro 5 bundles Vite 6. Runtime is fine;
    // drop this once Astro ships on Vite 8.
    // @ts-expect-error -- Vite version mismatch in plugin types
    plugins: [tailwindcss()],
  },
});
