"use client";

import React from "react";
import AppFrame from "./_ui/AppFrame";
import SnapshotCard from "./_ui/SnapshotCard";

export default function SceneUpload() {
  return (
    <AppFrame title="Documents" subtitle="All your medical files in one place." rightActionText="+ Add data">
      <div className="space-y-3 h-full flex flex-col">
        {/* Search input (disabled look) */}
        <div
          className="h-9 rounded-lg border px-3 flex items-center"
          style={{
            backgroundColor: "var(--surface-2)",
            borderColor: "var(--border)",
          }}
        >
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Search by name, type, provider...
          </span>
        </div>

        {/* Dropzone card */}
        <SnapshotCard>
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center"
            style={{
              borderColor: "var(--accent-soft)",
              backgroundColor: "var(--accent-soft)",
            }}
          >
            <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
              Drag & drop a PDF or click to upload
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              We'll categorize it automatically.
            </p>
          </div>
        </SnapshotCard>

        {/* File row */}
        <div
          className="rounded-lg border p-3 flex items-center justify-between"
          style={{
            backgroundColor: "var(--surface-2)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-[10px] font-semibold"
              style={{
                backgroundColor: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              PDF
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: "var(--text)" }}>
                lipid_panel_dec_2024.pdf
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                2.4 MB • Lab
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded"
              style={{
                backgroundColor: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              Parsed
            </span>
            <span className="text-xs" style={{ color: "var(--accent)" }}>
              Added to Timeline ✓
            </span>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
