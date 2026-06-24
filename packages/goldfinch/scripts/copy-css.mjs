import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "../src/styles/index.css");
const destDir = resolve(__dirname, "../dist/styles");
const dest = resolve(destDir, "index.css");

if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log(`Copied ${src} → ${dest}`);
