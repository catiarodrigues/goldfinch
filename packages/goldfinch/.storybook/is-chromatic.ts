/**
 * True while Chromatic captures snapshots. Its browser window isn't focused,
 * so play functions that depend on real keyboard focus skip those steps there;
 * they still run in the Vitest suite. (Same check as `isChromatic()` from the
 * chromatic package, without adding it as a dependency.)
 */
export const isChromatic = () =>
  /Chromatic/.test(navigator.userAgent) ||
  new URL(location.href).searchParams.has("chromatic");
