/**
 * Reads Goldfinch's colour tokens straight from the library stylesheet, so the
 * Colors page shows the values components actually use. Runs at build time.
 *
 * Groups and their order come from the comments in the `@theme` block; the
 * light and dark values come from the `:root` and `[data-mode="dark"]` blocks,
 * which are what the browser applies.
 */
import fs from "node:fs";
import path from "node:path";

export interface ColorToken {
  /** CSS custom property, e.g. `--color-goldfinch-base`. */
  cssVar: string;
  /** Tailwind utility, e.g. `bg-goldfinch-base` or `text-goldfinch-subtle`. */
  utility: string;
  kind: "color" | "text";
  light: string;
  dark: string;
  description?: string;
  /** For text tokens: the token behind the text, used to measure contrast. */
  on: string;
}

export interface ColorGroup {
  title: string;
  note?: string;
  tokens: ColorToken[];
}

const CSS = path.resolve(process.cwd(), "../goldfinch/src/styles/index.css");

/** Text tokens that sit on a fill rather than on the base surface. */
const TEXT_ON: Record<string, string> = {
  "text-color-goldfinch-inverse": "color-goldfinch-contrast",
  "text-color-goldfinch-badge-inverted": "color-goldfinch-badge-inverted",
  "text-color-goldfinch-badge-teal-subtle": "color-goldfinch-badge-teal-subtle",
};

/** What each token is for. Tokens without an entry show no description. */
const PURPOSE: Record<string, string> = {
  "color-goldfinch-canvas": "Page background.",
  "color-goldfinch-base": "Default surface: cards, inputs, tables.",
  "color-goldfinch-elevated": "Raised surface: popovers, menus, the sidebar.",
  "color-goldfinch-recessed": "Sunken surface: tab tracks, modal footers.",
  "color-goldfinch-tint": "Hover and selected backgrounds.",
  "color-goldfinch-contrast":
    "Ink: checked checkboxes, radios and toggles. White in dark mode.",
  "color-goldfinch-overlay": "Highlighted menu item.",
  "color-goldfinch-control": "Fill of form controls.",
  "color-goldfinch-interact": "Control border on hover.",
  "color-goldfinch-fill": "Neutral fills: progress tracks, skeletons.",
  "color-goldfinch-fill-hover": "Neutral fill on hover.",
  "color-goldfinch-brand": "Primary button, progress bar, tab underline.",
  "color-goldfinch-brand-hover": "Primary button on hover.",
  "color-goldfinch-line": "Border of raised surfaces that also cast a shadow.",
  "color-goldfinch-hairline": "Border of flat surfaces and dividers.",
  "color-goldfinch-focus": "Focus ring.",
  "text-color-goldfinch-default": "Body text.",
  "text-color-goldfinch-strong": "Headings and emphasis.",
  "text-color-goldfinch-subtle": "Secondary text: descriptions, captions.",
  "text-color-goldfinch-inactive":
    "Disabled text and decorative marks, such as breadcrumb separators. Below 4.5:1 on purpose: WCAG exempts disabled controls, so never use it for text people need to read.",
  "text-color-goldfinch-placeholder": "Placeholder text in Select.",
  "text-color-goldfinch-inverse": "Text on the brand and contrast fills.",
  "text-color-goldfinch-brand": "Text in the brand colour.",
  "text-color-goldfinch-link": "Links.",
  "text-color-goldfinch-info": "Info messages.",
  "text-color-goldfinch-success": "Success messages.",
  "text-color-goldfinch-warning": "Warning messages.",
  "text-color-goldfinch-danger": "Error messages and validation.",
  "color-goldfinch-info": "Info marks: dots, icons, rings.",
  "color-goldfinch-success": "Success marks: dots, icons, rings.",
  "color-goldfinch-warning": "Warning marks: dots, icons, rings.",
  "color-goldfinch-danger": "Error marks: invalid borders, rings, icons.",
  "color-goldfinch-danger-solid": "Destructive button fill, behind white text.",
  "color-goldfinch-info-tint": "Info badge and toast background.",
  "color-goldfinch-success-tint": "Success badge background.",
  "color-goldfinch-warning-tint": "Warning badge background.",
  "color-goldfinch-danger-tint": "Error badge background.",
  "color-goldfinch-disabled": "Disabled input text.",
  "color-goldfinch-input-placeholder": "Placeholder text in Input.",
};

function block(css: string, selector: string) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`color-tokens: no "${selector}" block`);
  const end = css.indexOf("}", start);
  const values = new Map<string, string>();
  for (const m of css.slice(start, end).matchAll(/--([\w-]+):\s*([^;]+);/g))
    values.set(m[1], m[2].replace(/\s+/g, " ").trim());
  return values;
}

export function colorGroups(): ColorGroup[] {
  const css = fs.readFileSync(CSS, "utf8");
  const light = block(css, ":root");
  const dark = block(css, '[data-mode="dark"]');
  const theme = css.slice(
    css.indexOf("@theme {"),
    css.indexOf("\n}", css.indexOf("@theme {")),
  );

  const groups: ColorGroup[] = [];
  let previousBlank = true;
  for (const raw of theme.split("\n").slice(1)) {
    const line = raw.trim();
    const comment = line.match(/^\/\*\s*(.*?)\s*\*\/$/);
    if (comment) {
      // A comment after a blank line opens a group; any other comment is a note.
      if (previousBlank) groups.push({ title: comment[1], tokens: [] });
      else {
        const g = groups.at(-1)!;
        if (g.tokens.length === 0) g.note = comment[1];
      }
    }
    const token = line.match(/^--([\w-]+):/);
    if (token && groups.length) {
      const name = token[1];
      const kind = name.startsWith("text-color-") ? "text" : "color";
      const short = name.replace(/^(text-)?color-/, "");
      const lightValue = light.get(name);
      const darkValue = dark.get(name);
      if (!lightValue || !darkValue)
        throw new Error(`color-tokens: --${name} has no light or dark value`);
      groups.at(-1)!.tokens.push({
        cssVar: `--${name}`,
        utility: `${kind === "text" ? "text" : "bg"}-${short}`,
        kind,
        light: lightValue,
        dark: darkValue,
        description: PURPOSE[name],
        on: `--${TEXT_ON[name] ?? "color-goldfinch-base"}`,
      });
    }
    previousBlank = line === "";
  }
  return groups.filter((g) => g.tokens.length > 0);
}

/** Relative luminance of a #rrggbb colour, or undefined for anything else. */
function luminance(hex: string) {
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) return undefined;
  const [r, g, bl] = [0, 2, 4].map((i) => {
    const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
}

/** WCAG contrast ratio of two #rrggbb colours, or undefined for anything else. */
export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)];
  if (x === undefined || y === undefined) return undefined;
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
