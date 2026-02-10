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
        backgroundColor: "rgba(255,255,255,0.03)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {header && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.8px]" style={{ color: "rgba(231,240,238,0.95)" }}>
            {header.title}
          </h3>
          {header.badge && (
            <span
              className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded"
              style={{
                backgroundColor: header.badgeColor || "rgba(110,211,194,0.10)",
                color: header.badgeColor ? "rgba(231,240,238,0.95)" : "rgba(110,211,194,0.95)",
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

