/**
 * Returns `key` if it names a variant in `variants`, otherwise warns (in dev)
 * and returns `fallback`. Use when several tables are keyed by the same
 * variant name: validate the key once, then index any of them safely.
 */
export function resolveVariantKey<T extends Record<string, unknown>>(
  variants: T,
  key: string,
  fallback: keyof T & string,
): keyof T & string {
  if (Object.prototype.hasOwnProperty.call(variants, key)) return key;

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[goldfinch] Unknown variant "${key}". Expected one of: ${Object.keys(variants).join(", ")}. Falling back to "${fallback}".`,
    );
  }

  return fallback;
}

export function resolveVariant<T extends Record<string, unknown>>(
  variants: T,
  key: string,
  fallback: keyof T & string,
): T[keyof T] {
  return variants[resolveVariantKey(variants, key, fallback)];
}
