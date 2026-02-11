/**
 * Arc Dashboard Design Tokens
 * 
 * Single source of truth for all dashboard color tokens.
 * These match the exact values used in /demo/command-center.
 * 
 * Usage:
 *   import { arcTokens } from '@/lib/ui/arcTokens';
 *   style={{ backgroundColor: arcTokens.surface.card }}
 */

export const arcTokens = {
  // Backgrounds
  bg: {
    page: "var(--bg)", // #060B0C
    panel: "var(--surface)", // #0C1416
  },

  // Surfaces (cards, panels)
  surface: {
    card: "var(--surface)", // #0C1416
    cardHover: "var(--surface-elevated)", // #101B1D
    default: "var(--surface)",
  },

  // Borders
  border: {
    default: "var(--border)", // rgba(231, 240, 238, 0.08)
    subtle: "var(--border)",
    strong: "var(--border-strong)", // rgba(231, 240, 238, 0.14)
  },

  // Text
  text: {
    primary: "var(--text-primary)", // #E7F0EE
    secondary: "var(--text-secondary)", // #8FA6A3
    tertiary: "var(--text-secondary)", // Use secondary for tertiary (no separate var)
    muted: "var(--text-secondary)",
  },

  // Accent (Arc Jade - use sparingly)
  accent: {
    primary: "#6ED3C2", // Arc Jade
    soft: "rgba(110, 211, 194, 0.20)",
    muted: "rgba(110, 211, 194, 0.10)",
  },

  // Semantic colors
  semantic: {
    success: "var(--success)", // #7BD8C9
    warning: "var(--warning)", // #D7B56D
    danger: "var(--danger)", // #D07A7A
    info: "var(--info)", // if exists
  },
} as const;

// Tailwind-friendly class names (for use with className)
export const arcTokenClasses = {
  bg: {
    page: "bg-[var(--bg)]",
    panel: "bg-[var(--surface)]",
  },
  surface: {
    card: "bg-[var(--surface)]",
  },
  border: {
    default: "border-[var(--border)]",
  },
  text: {
    primary: "text-[var(--text-primary)]",
    secondary: "text-[var(--text-secondary)]",
    tertiary: "text-[var(--text-tertiary)]",
  },
} as const;

