"use client";

import React from "react";

interface ThemeSectionProps {
  children: React.ReactNode;
  theme: "light" | "dark";
}

/**
 * ThemeSection - Per-section theme override
 * 
 * Allows a subtree to use a different theme than the global theme.
 * Useful for marketing pages that should be light by default.
 */
export function ThemeSection({ children, theme }: ThemeSectionProps) {
  return (
    <div data-theme={theme}>
      {children}
    </div>
  );
}


