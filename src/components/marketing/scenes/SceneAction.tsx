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
            backgroundColor: "var(--surface-2)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5px] mb-0.5" style={{ color: "var(--text-muted)" }}>
                Status
              </p>
              <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                Improving
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5px] mb-0.5" style={{ color: "var(--text-muted)" }}>
                Focus
              </p>
              <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                Cardiometabolic
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.5px] mb-0.5" style={{ color: "var(--text-muted)" }}>
                Confidence
              </p>
              <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>
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
                backgroundColor: "var(--accent-soft)",
                borderColor: "var(--accent)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                      Repeat lipid panel
                    </h4>
                    <span
                      className="px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded"
                      style={{
                        backgroundColor: "var(--warning)",
                        color: "var(--text)",
                      }}
                    >
                      MEDIUM
                    </span>
                  </div>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    LDL trend drifting upward across 12 months.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  Do now
                </button>
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
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
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                      Schedule annual physical
                    </h4>
                    <span
                      className="px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded"
                      style={{
                        backgroundColor: "var(--surface-2)",
                        color: "var(--text-muted)",
                      }}
                    >
                      LOW
                    </span>
                  </div>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    Last visit recorded 14 months ago.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  Do now
                </button>
                <button
                  className="px-2.5 py-1 text-[10px] font-medium rounded border transition-colors cursor-default"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
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
