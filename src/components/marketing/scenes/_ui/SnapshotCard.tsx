"use client";

import React from "react";

interface SnapshotCardProps {
  children: React.ReactNode;
  className?: string;
  header?: {
    title: string;
    badge?: string;
    badgeColor?: string;
  };
}

export default function SnapshotCard({ children, className = "", header }: SnapshotCardProps) {
  return (
    <div
      className={`rounded-[16px] border p-4 ${className}`}
      style={{
        backgroundColor: "var(--surface-2)",
        borderColor: "var(--border)",
      }}
    >
      {header && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.8px]" style={{ color: "var(--text)" }}>
            {header.title}
          </h3>
          {header.badge && (
            <span
              className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded"
              style={{
                backgroundColor: header.badgeColor || "var(--accent-soft)",
                color: header.badgeColor ? "var(--text)" : "var(--accent)",
              }}
            >
              {header.badge}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

