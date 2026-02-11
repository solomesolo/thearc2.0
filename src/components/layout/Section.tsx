"use client";

import React from "react";

type Variant = "default" | "surface" | "surface2";

interface SectionProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Section - Consistent section wrapper
 * 
 * Uses tokens, not hard-coded colors.
 * Handles padding + spacing + consistent section rhythm.
 */
export function Section({
  variant = "default",
  children,
  className = "",
  id,
}: SectionProps) {
  const bg =
    variant === "surface"
      ? `rgb(var(--surface))`
      : variant === "surface2"
      ? `rgb(var(--surface-2))`
      : `transparent`;

  return (
    <section 
      id={id}
      className={`w-full py-20 ${className}`} 
      style={{ background: bg }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">{children}</div>
    </section>
  );
}


