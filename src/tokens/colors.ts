/**
 * Arc Design System - Color Tokens
 * 
 * Single source of truth for all color values across the application.
 * Replaces old teal accent system with Arc Jade + Sage palette.
 */

export const colors = {
  // Surfaces
  bg: "#060B0C",
  surface: "#0C1416",
  surfaceElevated: "#101B1D",

  // Text
  textPrimary: "#E7F0EE",
  textSecondary: "#8FA6A3",
  textMuted: "#6C8582",

  // Accents - Arc Jade (Primary)
  accent: "#6ED3C2",        // Arc Jade
  accentHover: "#8FE3D5",
  accentMuted: "#3C8F86",   // borders / subtle
  accentAlpha60: "rgba(110, 211, 194, 0.60)",
  accentAlpha20: "rgba(110, 211, 194, 0.20)",
  accentPressed: "#5AC7B5", // ~10% darker than accent

  // Secondary accent (support) - Clinical Sage
  sage: "#8FAF9C",
  sageHover: "#A7C4B4",
  sageMuted: "#4F6B5C",

  // Status (keep consistent with medical semantics)
  success: "#7BD8C9",       // aligned w/ jade
  warning: "#D7B56D",       // warm gold (muted)
  danger: "#D07A7A",        // muted red
  info: "#7FA7C7",          // muted blue

  // Borders
  border: "rgba(231, 240, 238, 0.08)",
  borderStrong: "rgba(231, 240, 238, 0.14)",

  // Legacy compatibility (will be deprecated)
  pageBg: "#0B0E10", // Keep existing page bg for now
};

// Export for use in TypeScript/React components
export default colors;


