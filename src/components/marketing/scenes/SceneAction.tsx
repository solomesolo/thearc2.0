"use client";

import React from "react";
import AppFrame from "./_ui/AppFrame";
import SnapshotCard from "./_ui/SnapshotCard";

export default function SceneAction() {
  return (
    <AppFrame title="Command Center" subtitle="Next steps, based on your timeline.">
      <div className="space-y-3 h-full flex flex-col">
        {/* Today strip */}
        <div
          className="rounded-lg border p-2.5 flex items-center justify-between"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5px] mb-0.5" style={{ color: "rgba(143,166,163,0.65)" }}>
                Status
              </p>
              <p className="text-xs font-semibold" style={{ color: "rgba(110,211,194,0.95)" }}>
                Improving
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5px] mb-0.5" style={{ color: "rgba(143,166,163,0.65)" }}>
                Focus
              </p>
              <p className="text-xs font-semibold" style={{ color: "rgba(231,240,238,0.95)" }}>
                Cardiometabolic
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5px] mb-0.5" style={{ color: "rgba(143,166,163,0.65)" }}>
                Confidence
              </p>
              <p className="text-xs font-semibold" style={{ color: "rgba(231,240,238,0.95)" }}>
                Good (70%)
              </p>
            </div>
          </div>
        </div>

        {/* Action Inbox card */}
        <SnapshotCard header={{ title: "Action Inbox" }}>
          <div className="space-y-2.5">
            {/* Action 1 */}
            <div
              className="rounded-lg border p-2.5"
              style={{
                backgroundColor: "rgba(110,211,194,0.05)",
                borderColor: "rgba(110,211,194,0.18)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs font-semibold" style={{ color: "rgba(231,240,238,0.95)" }}>
                      Repeat lipid panel
                    </h4>
                    <span
                      className="px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded"
                      style={{
                        backgroundColor: "rgba(255,165,0,0.20)",
                        color: "rgba(255,165,0,0.95)",
                      }}
                    >
                      MEDIUM
                    </span>
                  </div>
                  <p className="text-[10px]" style={{ color: "rgba(143,166,163,0.78)" }}>
                    LDL trend drifting upward across 12 months.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default"
                  style={{
                    backgroundColor: "rgba(110,211,194,0.15)",
                    borderColor: "rgba(110,211,194,0.30)",
                    color: "rgba(110,211,194,0.95)",
                  }}
                >
                  Do now
                </button>
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.06)",
                    color: "rgba(231,240,238,0.65)",
                  }}
                >
                  Set reminder
                </button>
              </div>
            </div>

            {/* Action 2 */}
            <div
              className="rounded-lg border p-2.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs font-semibold" style={{ color: "rgba(231,240,238,0.95)" }}>
                      Schedule annual physical
                    </h4>
                    <span
                      className="px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded"
                      style={{
                        backgroundColor: "rgba(143,166,163,0.20)",
                        color: "rgba(143,166,163,0.95)",
                      }}
                    >
                      LOW
                    </span>
                  </div>
                  <p className="text-[10px]" style={{ color: "rgba(143,166,163,0.78)" }}>
                    Last visit recorded 14 months ago.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default"
                  style={{
                    backgroundColor: "rgba(110,211,194,0.15)",
                    borderColor: "rgba(110,211,194,0.30)",
                    color: "rgba(110,211,194,0.95)",
                  }}
                >
                  Do now
                </button>
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.06)",
                    color: "rgba(231,240,238,0.65)",
                  }}
                >
                  Set reminder
                </button>
              </div>
            </div>
          </div>
        </SnapshotCard>
      </div>
    </AppFrame>
  );
}
