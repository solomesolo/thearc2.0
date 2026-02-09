"use client";

import React from "react";

interface DevicePreviewMiniProps {
  mode: "web" | "mobile";
  caption: string;
}

export default function DevicePreviewMini({
  mode,
  caption,
}: DevicePreviewMiniProps) {
  if (mode === "web") {
    return (
      <div className="mt-6">
        <div
          className="rounded-[12px] p-4 space-y-3"
          style={{
            backgroundColor: "rgba(231,240,238,0.02)",
            border: "1px solid rgba(231,240,238,0.06)",
          }}
        >
          {/* Signals grid preview */}
          <div className="grid grid-cols-2 gap-2">
            {["Signals", "Timeline"].map((label, idx) => (
              <div
                key={idx}
                className="h-12 rounded-[8px] flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(231,240,238,0.04)",
                  border: "1px solid rgba(231,240,238,0.08)",
                }}
              >
                <span
                  className="text-[10px] font-medium"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          {/* Health map preview */}
          <div
            className="h-8 rounded-[8px] flex items-center justify-center"
            style={{
              backgroundColor: "rgba(231,240,238,0.04)",
              border: "1px solid rgba(231,240,238,0.08)",
            }}
          >
            <span
              className="text-[10px] font-medium"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Health Map
            </span>
          </div>
        </div>
        <p
          className="text-[10px] mt-2 text-center italic"
          style={{
            color: "var(--text-muted)",
          }}
        >
          {caption}
        </p>
      </div>
    );
  }

  // Mobile preview
  return (
    <div className="mt-6">
      <div
        className="rounded-[12px] p-3 space-y-2"
        style={{
          backgroundColor: "rgba(231,240,238,0.02)",
          border: "1px solid rgba(231,240,238,0.06)",
        }}
      >
        {/* Notification card */}
        <div
          className="rounded-[8px] p-2.5"
          style={{
            backgroundColor: "rgba(110,211,194,0.08)",
            border: "1px solid rgba(110,211,194,0.15)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: "var(--accent)",
              }}
            />
            <span
              className="text-[10px] font-medium"
              style={{
                color: "rgba(231,240,238,0.95)",
              }}
            >
              1 signal
            </span>
          </div>
          <p
            className="text-[10px]"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Sleep trend worsening
          </p>
        </div>
        {/* Action card */}
        <div
          className="rounded-[8px] p-2"
          style={{
            backgroundColor: "rgba(231,240,238,0.04)",
            border: "1px solid rgba(231,240,238,0.08)",
          }}
        >
          <span
            className="text-[10px]"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Review in web dashboard when ready
          </span>
        </div>
      </div>
      <p
        className="text-[10px] mt-2 text-center italic"
        style={{
          color: "var(--text-muted)",
        }}
      >
        {caption}
      </p>
    </div>
  );
}

