"use client";

import React from "react";
import AppFrame from "./_ui/AppFrame";
import SnapshotCard from "./_ui/SnapshotCard";

export default function SceneMarketplace() {
  return (
    <AppFrame title="Marketplace" subtitle="Trusted services matched to your needs.">
      <div className="space-y-3 h-full flex flex-col">
        {/* Filter pill */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border"
          style={{
            backgroundColor: "var(--accent-soft)",
            borderColor: "var(--accent)",
          }}
        >
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            Filtered by:
          </span>
          <span className="text-[10px] font-semibold" style={{ color: "var(--accent)" }}>
            Lipid monitoring need
          </span>
        </div>

        {/* Service cards */}
        <div className="flex-1 overflow-y-auto space-y-2.5">
          {/* Service 1 */}
          <SnapshotCard>
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
                    At-home lipid test
                  </h3>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    Finger-prick blood sample, results in 5-7 days
                  </p>
                </div>
                <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  $89
                </span>
              </div>
              <div
                className="rounded p-2"
                style={{
                  backgroundColor: "var(--accent-soft)",
                }}
              >
                <p className="text-[10px]">
                  <strong style={{ color: "var(--text)" }}>Why now:</strong>{" "}
                  <span style={{ color: "var(--text-muted)" }}>Matches your monitoring cadence recommendation.</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default flex-1"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  Select
                </button>
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default flex-1"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  Learn more
                </button>
              </div>
            </div>
          </SnapshotCard>

          {/* Service 2 */}
          <SnapshotCard>
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
                    Lab draw appointment
                  </h3>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    In-person visit, comprehensive panel
                  </p>
                </div>
                <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  $150
                </span>
              </div>
              <div
                className="rounded p-2"
                style={{
                  backgroundColor: "var(--accent-soft)",
                }}
              >
                <p className="text-[10px]">
                  <strong style={{ color: "var(--text)" }}>Why now:</strong>{" "}
                  <span style={{ color: "var(--text-muted)" }}>More comprehensive panel for confirmation.</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default flex-1"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  Select
                </button>
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default flex-1"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  Learn more
                </button>
              </div>
            </div>
          </SnapshotCard>
        </div>
      </div>
    </AppFrame>
  );
}
