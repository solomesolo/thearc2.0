"use client";

import React from "react";

interface HeroFloatingUIProps {
  prefersReducedMotion?: boolean;
}

export function HeroFloatingUI({
  prefersReducedMotion = false,
}: HeroFloatingUIProps) {
  return (
    <div
      className="hero-floating-ui-wrapper heroCluster"
      style={{
        position: "relative",
        width: "600px",
        height: "480px",
        minHeight: "480px",
        backgroundColor: "transparent",
        display: "block",
        visibility: "visible",
        opacity: 1,
        zIndex: 1,
        pointerEvents: "auto",
        overflow: "visible",
      }}
      data-testid="hero-floating-ui"
    >
      {/* Background overlay (behind cards only) */}
      <div
        className="heroClusterBg"
        style={{
          position: "absolute",
          inset: "-40px",
          background: "radial-gradient(60% 60% at 30% 20%, rgba(0,0,0,0.28), transparent 65%), radial-gradient(55% 55% at 75% 70%, rgba(0,0,0,0.22), transparent 60%)",
          filter: "blur(18px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* OBJECT 1 — SIGNAL CARD (PRIMARY) - Metric Card */}
      <div
        className="hero-floating-card hero-floating-card-primary heroCard heroClusterCard"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "360px",
          height: "210px",
          zIndex: 3,
          borderRadius: "24px",
          padding: 0,
          background: "rgba(255,255,255,0.045)",
          border: "1px solid rgba(255,255,255,0.085)",
          boxShadow: "0 30px 120px rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          color: "rgba(231,240,238,0.95)",
          opacity: 1,
          transform: "translateY(0)",
          transition: "transform 180ms ease-out, border-color 180ms ease-out",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.borderColor = "rgba(110,211,194,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.085)";
        }}
      >
        <div className="cardInner" style={{ padding: "22px 22px 20px", display: "grid", gridTemplateRows: "auto auto 1fr auto", rowGap: "12px", height: "100%" }}>
          {/* Kicker */}
          <div style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(143,166,163,0.72)", fontWeight: 500 }}>
            Resting Heart Rate
          </div>
          
          {/* Value row */}
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ fontSize: "44px", lineHeight: 1.05, fontWeight: 600, color: "rgba(231,240,238,0.95)" }}>
              72
            </div>
            <div style={{ fontSize: "20px", fontWeight: 500, color: "rgba(143,166,163,0.78)", marginLeft: "6px" }}>
              bpm
            </div>
          </div>
          
          {/* Delta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 500, color: "rgba(255,120,120,0.92)" }}>
            ↑ 8% vs baseline
          </div>
          
          {/* Spark histogram */}
          <div style={{ marginTop: "8px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)", height: "46px", display: "flex", gap: "6px", alignItems: "flex-end", overflow: "hidden" }}>
            {[45, 52, 48, 55, 58, 62, 65, 68, 72].map((height, idx) => {
              const isHot = idx >= 7; // Last 2-3 bars tinted
              const barHeight = `${(height / 72) * 100}%`;
              return (
                <div
                  key={idx}
                  style={{
                    width: "14px",
                    height: barHeight,
                    maxHeight: "46px",
                    minHeight: "8px",
                    borderRadius: "6px",
                    background: isHot 
                      ? "rgba(255,120,120,0.35)" 
                      : "rgba(255,255,255,0.10)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* OBJECT 2 — SIGNAL INSIGHT PANEL (SECONDARY) - Pattern Detected */}
      <div
        className="hero-floating-card hero-floating-card-secondary heroCard heroClusterCard"
        style={{
          position: "absolute",
          top: "40px",
          right: 0,
          width: "380px",
          height: "250px",
          zIndex: 2,
          borderRadius: "24px",
          padding: 0,
          background: "rgba(255,255,255,0.045)",
          border: "1px solid rgba(255,255,255,0.085)",
          boxShadow: "0 30px 120px rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          color: "rgba(231,240,238,0.95)",
          opacity: 1,
          transform: "translateY(6px)",
          transition: "transform 180ms ease-out, border-color 180ms ease-out",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(4px)";
          e.currentTarget.style.borderColor = "rgba(110,211,194,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(6px)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.085)";
        }}
      >
        <div className="cardInner" style={{ padding: "22px 22px 20px", display: "grid", gridTemplateRows: "auto auto 1fr auto", rowGap: "12px", height: "100%" }}>
          {/* Kicker */}
          <div style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(143,166,163,0.72)", fontWeight: 500 }}>
            Pattern Detected
          </div>
          
          {/* Title */}
          <div style={{ fontSize: "22px", lineHeight: 1.15, fontWeight: 600, color: "rgba(231,240,238,0.95)" }}>
            Sustained elevation
          </div>
          
          {/* Confidence row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(143,166,163,0.72)", fontWeight: 500, flex: "0 0 auto", whiteSpace: "nowrap" }}>
              Confidence
            </div>
            <div style={{ height: "28px", padding: "0 10px", borderRadius: "9999px", display: "inline-flex", alignItems: "center", fontSize: "12px", fontWeight: 600, border: "1px solid rgba(240,195,120,0.30)", background: "rgba(240,195,120,0.12)", color: "rgba(240,195,120,0.95)", flex: "0 0 auto", whiteSpace: "nowrap" }}>
              High
            </div>
            <div style={{ flex: "1 1 auto", height: "6px", borderRadius: "9999px", background: "rgba(255,255,255,0.08)", overflow: "hidden", minWidth: 0 }}>
              <div style={{ height: "100%", width: "72%", background: "rgba(240,195,120,0.40)" }} />
            </div>
          </div>
          
          {/* Recommendation Note Card */}
          <div style={{ position: "relative", borderRadius: "18px", overflow: "hidden", padding: "16px 16px 16px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ position: "absolute", left: "12px", top: "14px", bottom: "14px", width: "2px", borderRadius: "2px", background: "rgba(110,211,194,0.45)" }} />
            <div style={{ paddingLeft: "10px", fontSize: "14px", lineHeight: 1.5, color: "rgba(231,240,238,0.85)" }}>
              Consider reviewing recent activity levels and sleep quality for context.
            </div>
          </div>
          
          {/* Footer - Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              style={{
                height: "44px",
                borderRadius: "9999px",
                background: "rgba(110,211,194,0.88)",
                color: "#071012",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                boxShadow: "0 18px 60px rgba(0,0,0,0.40)",
                cursor: "pointer",
                transition: "all 180ms ease-out",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 20px 70px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 18px 60px rgba(0,0,0,0.40)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = "2px solid rgba(110,211,194,0.22)";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              Review details
            </button>
            <button
              style={{
                height: "40px",
                borderRadius: "9999px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(231,240,238,0.85)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 180ms ease-out",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = "2px solid rgba(110,211,194,0.22)";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>

      {/* OBJECT 3 — ACTION INBOX CARD (TERTIARY) - Action Needed */}
      <div
        className="hero-floating-card hero-floating-card-tertiary heroCard heroClusterCard"
        style={{
          position: "absolute",
          bottom: 0,
          left: "60px",
          width: "420px",
          height: "220px",
          zIndex: 1,
          borderRadius: "24px",
          padding: 0,
          background: "rgba(255,255,255,0.045)",
          border: "1px solid rgba(255,255,255,0.085)",
          boxShadow: "0 30px 120px rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          color: "rgba(231,240,238,0.95)",
          opacity: 1,
          transform: "translateY(12px)",
          transition: "transform 180ms ease-out, border-color 180ms ease-out",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(10px)";
          e.currentTarget.style.borderColor = "rgba(110,211,194,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(12px)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.085)";
        }}
      >
        <div className="cardInner" style={{ padding: "22px 22px 20px", display: "grid", gridTemplateRows: "auto auto 1fr auto", rowGap: "12px", height: "100%" }}>
          {/* Header with Priority */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "22px", lineHeight: 1.15, fontWeight: 600, color: "rgba(231,240,238,0.95)" }}>
              Action needed
            </div>
            <div style={{ height: "26px", padding: "0 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700, border: "1px solid rgba(255,120,120,0.35)", background: "rgba(255,120,120,0.12)", color: "rgba(255,120,120,0.95)", display: "inline-flex", alignItems: "center", flex: "0 0 auto", whiteSpace: "nowrap" }}>
              High
            </div>
          </div>
          
          {/* Body */}
          <div style={{ fontSize: "14px", lineHeight: 1.5, color: "rgba(143,166,163,0.82)" }}>
            Review elevated heart rate pattern with your care team
          </div>
          
          {/* Footer - Buttons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              style={{
                height: "44px",
                borderRadius: "9999px",
                padding: "0 16px",
                background: "rgba(110,211,194,0.88)",
                color: "#071012",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                boxShadow: "0 18px 60px rgba(0,0,0,0.40)",
                cursor: "pointer",
                transition: "all 180ms ease-out",
                flex: "1 1 220px",
                minWidth: "140px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 20px 70px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 18px 60px rgba(0,0,0,0.40)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = "2px solid rgba(110,211,194,0.22)";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              Schedule review
            </button>
            <button
              style={{
                height: "44px",
                borderRadius: "9999px",
                padding: "0 16px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(231,240,238,0.85)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 180ms ease-out",
                flex: "0 1 140px",
                minWidth: "100px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = "2px solid rgba(110,211,194,0.22)";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
