"use client";

import React from "react";

interface Signal {
  label: string;
  trend?: "up" | "down" | "stable";
}

interface MarketingSignalExampleMiniProps {
  title: string;
  signals: Signal[];
  suggestedAction: string;
  onClick?: () => void;
}

export default function MarketingSignalExampleMini({
  title,
  signals,
  suggestedAction,
  onClick,
}: MarketingSignalExampleMiniProps) {
  return (
    <div
      className="mt-4 pt-4 border-t"
      style={{
        borderColor: "rgba(231,240,238,0.06)",
      }}
    >
      <p
        className="text-[10px] font-medium uppercase mb-2"
        style={{
          color: "var(--text-muted)",
          letterSpacing: "0.8px",
        }}
      >
        Example from your timeline:
      </p>
      <div
        className={`rounded-[12px] p-3 ${onClick ? "cursor-pointer transition-all hover:border-opacity-100" : ""}`}
        style={{
          backgroundColor: "rgba(231,240,238,0.03)",
          border: "1px solid rgba(231,240,238,0.06)",
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
          if (onClick && typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.borderColor = "rgba(110,211,194,0.15)";
          }
        }}
        onMouseLeave={(e) => {
          if (onClick && typeof window !== "undefined" && e.currentTarget) {
            e.currentTarget.style.borderColor = "rgba(231,240,238,0.06)";
          }
        }}
      >
        <div className="space-y-2">
          {signals.map((signal, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="text-xs font-medium"
                style={{
                  color: "rgba(231,240,238,0.95)",
                }}
              >
                {signal.label}
              </span>
              {signal.trend === "up" && (
                <span
                  className="text-[10px]"
                  style={{
                    color: "var(--accent)",
                  }}
                >
                  ↑
                </span>
              )}
              {signal.trend === "down" && (
                <span
                  className="text-[10px]"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  ↓
                </span>
              )}
            </div>
          ))}
          <div
            className="pt-2 border-t"
            style={{
              borderColor: "rgba(231,240,238,0.06)",
            }}
          >
            <p
              className="text-xs"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              → {suggestedAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

