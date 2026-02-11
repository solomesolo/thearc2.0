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
      <div 
        className="mt-6 demo-frame relative" 
        style={{ 
          cursor: "pointer",
          opacity: 0.9,
          transition: "all 180ms ease-out",
        }}
      >
        {/* Device Identity Label */}
        <div
          className="device-chip absolute"
          style={{
            top: "16px",
            left: "16px",
            padding: "6px 10px",
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(231,240,238,0.85)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          WEB DASHBOARD
        </div>
        
        {/* Demo Frame Container */}
        <div
          className="rounded-[18px] p-4 space-y-3 relative overflow-hidden demo-mini"
          style={{
            backgroundColor: "#071012",
            border: "1px solid rgba(14,26,24,0.10)",
            borderRadius: "18px",
            boxShadow: "0 18px 60px rgba(14,26,24,0.10)",
            minHeight: "180px",
          }}
        >
          {/* Vignette Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(
                1200px 400px at 50% 0%,
                rgba(255,255,255,0.06),
                rgba(0,0,0,0.0) 55%,
                rgba(0,0,0,0.18)
              )`,
            }}
          />
          
          {/* Signals grid preview - Increased Contrast */}
          <div className="grid grid-cols-2 gap-2 relative z-10">
            {["Signals", "Timeline"].map((label, idx) => (
              <div
                key={idx}
                data-tab={label.toLowerCase()}
                className="h-12 rounded-[8px] flex items-center justify-center"
                style={{
                  backgroundColor: idx === 1 ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                  border: idx === 1 
                    ? "1px solid rgba(110,211,194,0.25)" 
                    : "1px solid rgba(255,255,255,0.08)",
                  transition: "all 180ms ease-out",
                }}
              >
                <span
                  className="text-[10px] font-medium"
                  style={{
                    color: idx === 1 ? "rgba(231,240,238,0.92)" : "rgba(143,166,163,0.80)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          {/* Health map preview - Increased Contrast */}
          <div
            className="h-8 rounded-[8px] flex items-center justify-center relative z-10"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="text-[10px] font-medium"
              style={{
                color: "rgba(143,166,163,0.80)",
              }}
            >
              Health Map
            </span>
          </div>
        </div>
        <p
          className="text-[12px] mt-2 text-center"
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
    <div 
      className="mt-6 demo-frame relative" 
      style={{ 
        cursor: "pointer",
        opacity: 0.9,
        transition: "all 180ms ease-out",
      }}
    >
      {/* Device Identity Label */}
      <div
        className="device-chip absolute"
        style={{
          top: "16px",
          left: "16px",
          padding: "6px 10px",
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(231,240,238,0.85)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          zIndex: 10,
        }}
      >
        MOBILE VIEW
      </div>
      
      {/* Demo Frame Container */}
      <div
        className="rounded-[18px] p-3 space-y-2 relative overflow-hidden demo-mini"
        style={{
          backgroundColor: "#071012",
          border: "1px solid rgba(14,26,24,0.10)",
          borderRadius: "18px",
          boxShadow: "0 18px 60px rgba(14,26,24,0.10)",
          minHeight: "140px",
        }}
      >
        {/* Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              1200px 400px at 50% 0%,
              rgba(255,255,255,0.06),
              rgba(0,0,0,0.0) 55%,
              rgba(0,0,0,0.18)
            )`,
          }}
        />
        
        {/* Notification card - Primary Signal (Increased Contrast) */}
        <div
          data-signal-card
          className="rounded-[8px] p-2.5 relative z-10"
          style={{
            backgroundColor: "rgba(110,211,194,0.12)",
            border: "1px solid rgba(110,211,194,0.20)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: "rgba(110,211,194,0.95)",
              }}
            />
            <span
              className="text-[10px] font-medium"
              style={{
                color: "rgba(231,240,238,0.92)",
              }}
            >
              1 signal
            </span>
          </div>
          <p
            className="text-[10px] font-medium"
            style={{
              color: "rgba(231,240,238,0.92)",
            }}
          >
            Sleep trend worsening
          </p>
        </div>
        {/* Action card - Increased Contrast */}
        <div
          className="rounded-[8px] p-2 relative z-10"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="text-[10px]"
            style={{
              color: "rgba(143,166,163,0.80)",
            }}
          >
            Review in web dashboard when ready
          </span>
        </div>
      </div>
      <p
        className="text-[12px] mt-2 text-center"
        style={{
          color: "var(--text-muted)",
        }}
      >
        {caption}
      </p>
    </div>
  );
}


