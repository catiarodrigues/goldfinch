/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        utils: resolve(__dirname, "src/utils/cn.ts"),
        "components/autocomplete": resolve(__dirname, "src/components/autocomplete/index.ts"),
        "components/badge": resolve(__dirname, "src/components/badge/index.ts"),
        "components/banner": resolve(__dirname, "src/components/banner/index.ts"),
        "components/breadcrumbs": resolve(__dirname, "src/components/breadcrumbs/index.ts"),
        "components/button": resolve(__dirname, "src/components/button/index.ts"),
        "components/checkbox": resolve(__dirname, "src/components/checkbox/index.ts"),
        "components/clipboard-text": resolve(__dirname, "src/components/clipboard-text/index.ts"),
        "components/collapsible": resolve(__dirname, "src/components/collapsible/index.ts"),
        "components/combobox": resolve(__dirname, "src/components/combobox/index.ts"),
        "components/dialog": resolve(__dirname, "src/components/dialog/index.ts"),
        "components/dropdown": resolve(__dirname, "src/components/dropdown/index.ts"),
        "components/empty": resolve(__dirname, "src/components/empty/index.ts"),
        "components/field": resolve(__dirname, "src/components/field/index.ts"),
        "components/flow": resolve(__dirname, "src/components/flow/index.ts"),
        "components/grid": resolve(__dirname, "src/components/grid/index.ts"),
        "components/input": resolve(__dirname, "src/components/input/index.ts"),
        "components/input-group": resolve(__dirname, "src/components/input-group/index.ts"),
        "components/label": resolve(__dirname, "src/components/label/index.ts"),
        "components/layer-card": resolve(__dirname, "src/components/layer-card/index.ts"),
        "components/link": resolve(__dirname, "src/components/link/index.ts"),
        "components/loader": resolve(__dirname, "src/components/loader/index.ts"),
        "components/menubar": resolve(__dirname, "src/components/menubar/index.ts"),
        "components/meter": resolve(__dirname, "src/components/meter/index.ts"),
        "components/pagination": resolve(__dirname, "src/components/pagination/index.ts"),
        "components/popover": resolve(__dirname, "src/components/popover/index.ts"),
        "components/radio": resolve(__dirname, "src/components/radio/index.ts"),
        "components/select": resolve(__dirname, "src/components/select/index.ts"),
        "components/sensitive-input": resolve(__dirname, "src/components/sensitive-input/index.ts"),
        "components/sidebar": resolve(__dirname, "src/components/sidebar/index.ts"),
        "components/surface": resolve(__dirname, "src/components/surface/index.ts"),
        "components/switch": resolve(__dirname, "src/components/switch/index.ts"),
        "components/table": resolve(__dirname, "src/components/table/index.ts"),
        "components/table-of-contents": resolve(__dirname, "src/components/table-of-contents/index.ts"),
        "components/tabs": resolve(__dirname, "src/components/tabs/index.ts"),
        "components/text": resolve(__dirname, "src/components/text/index.ts"),
        "components/toast": resolve(__dirname, "src/components/toast/index.ts"),
        "components/toolbar": resolve(__dirname, "src/components/toolbar/index.ts"),
        "components/tooltip": resolve(__dirname, "src/components/tooltip/index.ts"),
      },
      formats: ["es"],
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "clsx", "tailwind-merge", "@phosphor-icons/react", "motion"]
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});
