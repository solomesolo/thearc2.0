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
    <div className="h-full w-full flex flex-col" style={{ backgroundColor: "#0C1416" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", minHeight: "44px" }}>
        <div>
          <h1 className="text-sm font-semibold" style={{ color: "rgba(231,240,238,0.95)" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs mt-0.5" style={{ color: "rgba(143,166,163,0.78)" }}>
              {subtitle}
            </p>
          )}
        </div>
        {rightActionText && (
          <button
            className="px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-default"
            style={{
              backgroundColor: "rgba(110,211,194,0.10)",
              borderColor: "rgba(110,211,194,0.18)",
              color: "rgba(110,211,194,0.95)",
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

