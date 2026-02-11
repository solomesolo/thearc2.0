"use client";

import React from "react";

/**
 * DemoFrame - Container for dark demo blocks in light pages
 * 
 * In Light theme, dark "demo blocks" must live inside a contained frame
 * (like a device mock or card) — not change the entire page background.
 */
export function DemoFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[24px] border border-border bg-surface shadow-lgsoft overflow-hidden ${className}`}>
      {children}
    </div>
  );
}


