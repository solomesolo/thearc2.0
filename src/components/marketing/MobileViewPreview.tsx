"use client";

import React, { useState } from "react";

interface MobileViewPreviewProps {
  caption?: string;
}

export default function MobileViewPreview({
  caption,
}: MobileViewPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mt-6 demo-frame relative"
      style={{
        cursor: "pointer",
        opacity: 0.9,
        transition: "all 180ms ease-out",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Demo Frame Container */}
      <div
        className="rounded-[24px] p-4 relative overflow-hidden demo-mini"
        style={{
          backgroundColor: "var(--dark-bg, #071012)",
          border: "1px solid var(--dark-border, rgba(255,255,255,0.08))",
          borderRadius: "24px",
          boxShadow: "0 18px 60px rgba(14,26,24,0.10)",
          minHeight: "180px",
          transition: "all 180ms ease-out",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        {/* Status Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            style={{
              padding: "6px 10px",
              borderRadius: "9999px",
              background: "var(--dark-surface-2, rgba(255,255,255,0.06))",
              border: "1px solid var(--dark-border, rgba(255,255,255,0.08))",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--dark-text, rgba(231,240,238,0.95))",
            }}
          >
            Mobile View
          </div>
          <span
            style={{
              fontSize: "12px",
              color: "var(--dark-muted, rgba(143,166,163,0.80))",
              fontWeight: 400,
            }}
          >
            Today • 9:14
          </span>
        </div>

        {/* Primary Signal Card */}
        <div
          data-signal-card
          style={{
            borderRadius: "16px",
            padding: "16px",
            backgroundColor: "var(--dark-surface, rgba(255,255,255,0.04))",
            border: "1px solid var(--dark-border, rgba(255,255,255,0.08))",
            marginBottom: "12px",
            position: "relative",
            transition: "all 180ms ease-out",
          }}
        >
          {/* Vertical State Bar */}
          <div
            className="state-bar-monitor"
            style={{
              position: "absolute",
              left: 0,
              top: "16px",
              bottom: "16px",
              width: "3px",
              borderRadius: "2px",
              transition: "opacity 180ms ease-out",
              opacity: isHovered ? 0.85 : 0.70,
            }}
          />

          <div style={{ paddingLeft: "16px" }}>
            {/* Title */}
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--dark-text, rgba(231,240,238,0.95))",
                marginBottom: "6px",
              }}
            >
              Sleep trend worsening
            </h4>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "13px",
                color: "var(--dark-muted, rgba(143,166,163,0.80))",
                marginBottom: "10px",
                lineHeight: 1.5,
                fontWeight: 400,
              }}
            >
              Pattern forming over 10 weeks
            </p>

            {/* State Chip */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="badge-monitor"
                style={{
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Monitor
              </span>
            </div>

            {/* One-liner */}
            <p
              style={{
                fontSize: "13px",
                color: "var(--dark-muted, rgba(143,166,163,0.80))",
                marginBottom: "12px",
                lineHeight: 1.5,
                fontWeight: 400,
              }}
            >
              Recovery variability rising vs baseline
            </p>

            {/* CTA Row */}
            <div className="flex items-center gap-2">
              <button
                className="btn-quiet"
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: 500,
                  transition: "all 180ms ease-out",
                  cursor: "pointer",
                }}
              >
                Review in web dashboard
              </button>
              <button
                style={{
                  padding: "10px 12px",
                  fontSize: "13px",
                  color: "var(--dark-muted, rgba(143,166,163,0.70))",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: isHovered ? "underline" : "none",
                  transition: "all 180ms ease-out",
                  fontWeight: 400,
                }}
              >
                Snooze
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Quiet Info */}
        <div
          style={{
            padding: "10px 12px",
            borderRadius: "12px",
            backgroundColor: "var(--dark-surface, rgba(255,255,255,0.04))",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "var(--dark-muted, rgba(143,166,163,0.70))",
              textAlign: "center",
              margin: 0,
              fontWeight: 400,
            }}
          >
            No constant alerts
          </p>
        </div>
      </div>
      {caption && (
        <p
          className="text-[12px] mt-2 text-center"
          style={{
            color: "var(--text-muted)",
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

