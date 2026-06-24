// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [mdx(), react(), sitemap()],
  site: "https://goldfinch-ui.com/",
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "vesper" },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
