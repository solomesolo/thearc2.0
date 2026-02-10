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
            backgroundColor: "rgba(110,211,194,0.10)",
            borderColor: "rgba(110,211,194,0.18)",
          }}
        >
          <span className="text-[10px]" style={{ color: "rgba(143,166,163,0.78)" }}>
            Filtered by:
          </span>
          <span className="text-[10px] font-semibold" style={{ color: "rgba(110,211,194,0.95)" }}>
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
                  <h3 className="text-xs font-semibold mb-1" style={{ color: "rgba(231,240,238,0.95)" }}>
                    At-home lipid test
                  </h3>
                  <p className="text-[10px]" style={{ color: "rgba(143,166,163,0.78)" }}>
                    Finger-prick blood sample, results in 5-7 days
                  </p>
                </div>
                <span className="text-xs font-semibold" style={{ color: "rgba(110,211,194,0.95)" }}>
                  $89
                </span>
              </div>
              <div
                className="rounded p-2"
                style={{
                  backgroundColor: "rgba(110,211,194,0.05)",
                }}
              >
                <p className="text-[10px]">
                  <strong style={{ color: "rgba(231,240,238,0.95)" }}>Why now:</strong>{" "}
                  <span style={{ color: "rgba(143,166,163,0.78)" }}>Matches your monitoring cadence recommendation.</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default flex-1"
                  style={{
                    backgroundColor: "rgba(110,211,194,0.15)",
                    borderColor: "rgba(110,211,194,0.30)",
                    color: "rgba(110,211,194,0.95)",
                  }}
                >
                  Select
                </button>
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default flex-1"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.06)",
                    color: "rgba(231,240,238,0.65)",
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
                  <h3 className="text-xs font-semibold mb-1" style={{ color: "rgba(231,240,238,0.95)" }}>
                    Lab draw appointment
                  </h3>
                  <p className="text-[10px]" style={{ color: "rgba(143,166,163,0.78)" }}>
                    In-person visit, comprehensive panel
                  </p>
                </div>
                <span className="text-xs font-semibold" style={{ color: "rgba(110,211,194,0.95)" }}>
                  $150
                </span>
              </div>
              <div
                className="rounded p-2"
                style={{
                  backgroundColor: "rgba(110,211,194,0.05)",
                }}
              >
                <p className="text-[10px]">
                  <strong style={{ color: "rgba(231,240,238,0.95)" }}>Why now:</strong>{" "}
                  <span style={{ color: "rgba(143,166,163,0.78)" }}>More comprehensive panel for confirmation.</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default flex-1"
                  style={{
                    backgroundColor: "rgba(110,211,194,0.15)",
                    borderColor: "rgba(110,211,194,0.30)",
                    color: "rgba(110,211,194,0.95)",
                  }}
                >
                  Select
                </button>
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default flex-1"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.06)",
                    color: "rgba(231,240,238,0.65)",
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
