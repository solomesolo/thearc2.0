"use client";

import React from "react";

/**
 * PageShell - Consistent page wrapper
 * 
 * Applies background, font, and base text color consistently across all pages.
 * Ensures all pages share the same max width and prevent "random section backgrounds".
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: `rgb(var(--bg))`,
        color: `rgb(var(--text-1))`,
        fontFamily: `var(--font-sans)`,
      }}
    >
      {children}
    </div>
  );
}


