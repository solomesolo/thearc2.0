"use client";

import React, { useState } from "react";

interface WebDashboardPreviewProps {
  caption?: string;
}

export default function WebDashboardPreview({
  caption,
}: WebDashboardPreviewProps) {
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
        className="rounded-[24px] p-5 relative overflow-hidden demo-mini"
        style={{
          backgroundColor: "var(--dark-bg, #071012)",
          border: "1px solid var(--dark-border, rgba(255,255,255,0.08))",
          borderRadius: "24px",
          boxShadow: "0 18px 60px rgba(14,26,24,0.10)",
          minHeight: "200px",
          transition: "all 180ms ease-out",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        {/* Top Bar */}
        <div
          className="flex items-center justify-between mb-4"
          style={{
            paddingBottom: "12px",
            borderBottom: "1px solid var(--dark-border, rgba(255,255,255,0.08))",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--dark-text, rgba(231,240,238,0.95))",
              }}
            >
              Arc
            </span>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--dark-muted, rgba(143,166,163,0.60))",
              }}
            />
          </div>
          <div
            style={{
              padding: "6px 12px",
              borderRadius: "9999px",
              backgroundColor: "var(--dark-surface, rgba(255,255,255,0.04))",
              border: "1px solid var(--dark-border, rgba(255,255,255,0.08))",
              fontSize: "12px",
              color: "var(--dark-muted, rgba(143,166,163,0.60))",
            }}
          >
            Search...
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-3">
          {/* Sidebar Rail */}
          <div className="col-span-3 flex flex-col gap-2">
            {["Records", "Trends", "Signals"].map((item, idx) => {
              const isActive = idx === 1; // Trends is active
              return (
                <div
                  key={idx}
                  className="ui-chip"
                  data-active={isActive ? "true" : "false"}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: isActive ? 500 : 400,
                    transition: "all 180ms ease-out",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* Main Panel */}
          <div className="col-span-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--dark-text, rgba(231,240,238,0.95))",
                }}
              >
                Timeline (18 months)
              </h4>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--dark-muted, rgba(143,166,163,0.80))",
                  fontWeight: 400,
                }}
              >
                Last updated 2h ago
              </span>
            </div>

            {/* Timeline Chart Placeholder */}
            <div
              style={{
                height: "80px",
                borderRadius: "14px",
                backgroundColor: "var(--dark-surface, rgba(255,255,255,0.04))",
                border: "1px solid var(--dark-border, rgba(255,255,255,0.08))",
                padding: "12px",
                marginBottom: "12px",
                position: "relative",
              }}
            >
              {/* Timeline line */}
              <div
                style={{
                  position: "absolute",
                  left: "12px",
                  right: "12px",
                  top: "50%",
                  height: "2px",
                  backgroundColor: "var(--dark-border, rgba(255,255,255,0.08))",
                  transform: "translateY(-50%)",
                }}
              />
              {/* Nodes */}
              {[0.2, 0.4, 0.6, 0.8].map((pos, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    left: `${12 + pos * 76}%`,
                    top: "50%",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--dark-muted, rgba(143,166,163,0.60))",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
              {/* Highlighted segment - Accent-Soft */}
              <div
                style={{
                  position: "absolute",
                  left: "40%",
                  width: "20%",
                  top: "30%",
                  bottom: "30%",
                  backgroundColor: "var(--accent-soft, rgba(110,211,194,0.12))",
                  borderRadius: "4px",
                  border: "1px solid rgba(110,211,194,0.22)",
                  transition: "opacity 180ms ease-out",
                  opacity: isHovered ? 0.18 : 0.12,
                }}
              />
            </div>

            {/* Recent Highlights */}
            <div className="space-y-2">
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "var(--dark-muted, rgba(143,166,163,0.80))",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Recent highlights
              </p>
              {[
                "Sleep efficiency trending up",
                "Resting HR stable",
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "12px",
                    backgroundColor: "var(--dark-surface, rgba(255,255,255,0.04))",
                  }}
                >
                  <div
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      backgroundColor: "var(--dark-muted, rgba(143,166,163,0.60))",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--dark-muted, rgba(143,166,163,0.80))",
                      fontWeight: 400,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Panel */}
          <div className="col-span-3">
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--dark-text, rgba(231,240,238,0.95))",
                marginBottom: "12px",
              }}
            >
              Signals
            </h4>
            <div className="space-y-2">
              {[
                { label: "Inflammation drift", state: "Monitor" },
                { label: "Sleep variability", state: "Monitor" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "14px",
                    backgroundColor: "var(--dark-surface, rgba(255,255,255,0.04))",
                    border: "1px solid var(--dark-border, rgba(255,255,255,0.08))",
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--dark-text, rgba(231,240,238,0.95))",
                      marginBottom: "6px",
                    }}
                  >
                    {item.label}
                  </p>
                  <span
                    className="badge-monitor"
                    style={{
                      fontSize: "11px",
                      padding: "4px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {item.state}
                  </span>
                </div>
              ))}
            </div>
          </div>
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

