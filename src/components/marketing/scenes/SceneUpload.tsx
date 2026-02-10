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
            backgroundColor: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <span className="text-xs" style={{ color: "rgba(143,166,163,0.5)" }}>
            Search by name, type, provider...
          </span>
        </div>

        {/* Dropzone card */}
        <SnapshotCard>
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center"
            style={{
              borderColor: "rgba(110,211,194,0.18)",
              backgroundColor: "rgba(110,211,194,0.03)",
            }}
          >
            <p className="text-xs mb-2" style={{ color: "rgba(143,166,163,0.78)" }}>
              Drag & drop a PDF or click to upload
            </p>
            <p className="text-[10px]" style={{ color: "rgba(143,166,163,0.5)" }}>
              We'll categorize it automatically.
            </p>
          </div>
        </SnapshotCard>

        {/* File row */}
        <div
          className="rounded-lg border p-3 flex items-center justify-between"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-[10px] font-semibold"
              style={{
                backgroundColor: "rgba(110,211,194,0.10)",
                color: "rgba(110,211,194,0.95)",
              }}
            >
              PDF
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: "rgba(231,240,238,0.95)" }}>
                lipid_panel_dec_2024.pdf
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(143,166,163,0.65)" }}>
                2.4 MB • Lab
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded"
              style={{
                backgroundColor: "rgba(110,211,194,0.10)",
                color: "rgba(110,211,194,0.95)",
              }}
            >
              Parsed
            </span>
            <span className="text-xs" style={{ color: "rgba(110,211,194,0.95)" }}>
              Added to Timeline ✓
            </span>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
