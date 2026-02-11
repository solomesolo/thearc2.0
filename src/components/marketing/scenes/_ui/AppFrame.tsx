"use client";

import React from "react";

interface AppFrameProps {
  title: string;
  subtitle?: string;
  rightActionText?: string;
  children: React.ReactNode;
}

export default function AppFrame({ title, subtitle, rightActionText, children }: AppFrameProps) {
  return (
    <div className="h-full w-full flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--border)", minHeight: "44px" }}>
        <div>
          <h1 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              {subtitle}
            </p>
          )}
        </div>
        {rightActionText && (
          <button
            className="px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-default"
            style={{
              backgroundColor: "var(--accent-soft)",
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
          >
            {rightActionText}
          </button>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 p-5 overflow-hidden">{children}</div>
    </div>
  );
}

