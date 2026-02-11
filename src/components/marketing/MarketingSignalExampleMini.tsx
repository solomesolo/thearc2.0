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
    <div className="example-band" style={{ marginTop: "14px" }}>
      <p
        className="font-medium uppercase mb-3"
        style={{
          fontSize: "10px",
          letterSpacing: "0.8px",
          color: "var(--text-muted)",
        }}
      >
        EXAMPLE FROM YOUR TIMELINE
      </p>
      <div
        className={`${onClick ? "cursor-pointer transition-all" : ""}`}
        style={{
          background: `rgba(14,26,24,0.03)`,
          borderRadius: "16px",
          padding: "12px 14px",
          border: "0",
        }}
        onClick={onClick}
      >
        <div className="space-y-2.5">
          {signals.map((signal, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="font-medium"
                style={{
                  fontSize: "14px",
                  color: `rgb(var(--text-1))`,
                }}
              >
                {signal.label}
              </span>
              {signal.trend === "up" && (
                <span
                  className="text-xs"
                  style={{
                    color: `var(--signal-attention)`,
                  }}
                >
                  ↑
                </span>
              )}
              {signal.trend === "down" && (
                <span
                  className="text-xs"
                  style={{
                    color: `var(--signal-neutral)`,
                  }}
                >
                  ↓
                </span>
              )}
              {signal.trend === "stable" && (
                <span
                  className="text-xs"
                  style={{
                    color: `var(--signal-neutral)`,
                  }}
                >
                  →
                </span>
              )}
            </div>
          ))}
          <div
            className="example-action"
            style={{
              marginTop: "10px",
              paddingTop: "10px",
              borderTop: "1px solid var(--border-subtle)",
              color: `var(--accent-strong)`,
              fontWeight: 500,
            }}
          >
            <p
              className="text-sm"
              style={{
                color: `var(--accent-strong)`,
                fontSize: "15px",
                fontWeight: 500,
                margin: 0,
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

