"use client";

import React from "react";
import AppFrame from "./_ui/AppFrame";
import SnapshotCard from "./_ui/SnapshotCard";

export default function SceneSignals() {
  const domains = [
    { id: "overview", label: "Overview", status: "green", missing: null },
    { id: "cardio", label: "Cardiovascular", status: "green", missing: "Age of MI missing" },
    { id: "metabolic", label: "Metabolic", status: "green", missing: null },
    { id: "cancer", label: "Cancer / Screening", status: "yellow", missing: "CRC age missing" },
    { id: "neuro", label: "Neuro", status: "green", missing: null },
    { id: "sleep", label: "Sleep", status: "green", missing: "Snoring + fatigue" },
    { id: "fitness", label: "Fitness", status: "green", missing: null },
  ];

  const sparklineData = [45, 50, 48, 52, 55, 58, 60, 62, 65, 68, 70, 72];

  return (
    <AppFrame title="Signals" subtitle="Trends across time, not single results.">
      <div className="grid grid-cols-5 gap-3 h-full">
        {/* Left: Domain list */}
        <div className="col-span-2 space-y-1.5 overflow-y-auto">
          {domains.map((domain) => (
            <div key={domain.id} className="space-y-0.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      domain.status === "green"
                        ? "rgba(110,211,194,0.95)"
                        : domain.status === "yellow"
                          ? "rgba(255,165,0,0.95)"
                          : "rgba(143,166,163,0.5)",
                  }}
                />
                <p className="text-xs" style={{ color: "rgba(231,240,238,0.95)" }}>
                  {domain.label}
                </p>
              </div>
              {domain.missing && (
                <p className="text-[10px] pl-3.5" style={{ color: "rgba(143,166,163,0.5)" }}>
                  {domain.missing}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Right: Selected domain panel */}
        <div className="col-span-3 space-y-3">
          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap">
            {["Cardio", "Metabolic", "Sleep"].map((chip, idx) => (
              <button
                key={chip}
                className="px-2 py-1 text-[10px] font-medium rounded border transition-colors cursor-default"
                style={{
                  backgroundColor: idx === 1 ? "rgba(110,211,194,0.10)" : "rgba(255,255,255,0.02)",
                  borderColor: idx === 1 ? "rgba(110,211,194,0.18)" : "rgba(255,255,255,0.06)",
                  color: idx === 1 ? "rgba(110,211,194,0.95)" : "rgba(143,166,163,0.78)",
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Signal tiles */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "LDL", value: "118 mg/dL", trend: "↗" },
              { label: "HbA1c", value: "5.4%", trend: "→" },
              { label: "Triglycerides", value: "--", trend: null, missing: true },
            ].map((signal) => (
              <div
                key={signal.label}
                className="rounded-lg border p-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.06)",
                  opacity: signal.missing ? 0.4 : 1,
                }}
              >
                <p className="text-[10px] mb-0.5" style={{ color: "rgba(143,166,163,0.65)" }}>
                  {signal.label}
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold" style={{ color: "rgba(231,240,238,0.95)" }}>
                    {signal.value}
                  </p>
                  {signal.trend && (
                    <span className="text-xs" style={{ color: "rgba(110,211,194,0.95)" }}>
                      {signal.trend}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chart panel */}
          <SnapshotCard>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: "rgba(231,240,238,0.95)" }}>
                  LDL trend (12 months)
                </p>
                <div className="h-16">
                  <svg width="100%" height="64" style={{ display: "block" }} viewBox="0 0 100 64" preserveAspectRatio="none">
                    <polyline
                      points={sparklineData
                        .map((val, i) => {
                          if (sparklineData.length <= 1) return "0,32";
                          const x = (i / (sparklineData.length - 1)) * 100;
                          const minVal = Math.min(...sparklineData);
                          const maxVal = Math.max(...sparklineData);
                          const range = maxVal - minVal || 1;
                          const normalized = (val - minVal) / range;
                          const y = 64 - normalized * 48;
                          const xNum = Number.isFinite(x) ? x : 0;
                          const yNum = Number.isFinite(y) ? y : 32;
                          return `${xNum},${yNum}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="rgba(110,211,194,0.95)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-[10px]" style={{ color: "rgba(143,166,163,0.78)" }}>
                Slight upward drift across 3 panels.
              </p>
            </div>
          </SnapshotCard>

          {/* Footer */}
          <p className="text-[10px]" style={{ color: "rgba(143,166,163,0.65)" }}>
            <strong style={{ color: "rgba(231,240,238,0.95)" }}>Why this matters:</strong> Patterns become clear in context.
          </p>
        </div>
      </div>
    </AppFrame>
  );
}
