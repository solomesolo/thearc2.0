"use client";

import React from "react";

/**
 * SectionShell - Consistent section wrapper
 * 
 * Prevents half-white / half-dark because every section uses the same frame rules.
 * Uses theme tokens, not hardcoded colors.
 */
export function SectionShell({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "alt";
  className?: string;
}) {
  return (
    <section className={`${variant === "alt" ? "bg-surface2" : "bg-bg"} ${className}`}>
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20">
        {children}
      </div>
    </section>
  );
}


