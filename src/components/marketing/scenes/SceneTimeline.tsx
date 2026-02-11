"use client";

import React from "react";
import AppFrame from "./_ui/AppFrame";
import SnapshotCard from "./_ui/SnapshotCard";

export default function SceneTimeline() {
  const timelineItems = [
    { id: 1, icon: "L", title: "Lipid panel", date: "Dec 15, 2024", tag: "Lab", isNew: true },
    { id: 2, icon: "V", title: "Annual physical", date: "Nov 3, 2024", tag: "Visit", isNew: false },
    { id: 3, icon: "I", title: "Chest X-ray", date: "Oct 12, 2024", tag: "Imaging", isNew: false },
    { id: 4, icon: "M", title: "Prescription update", date: "Sep 8, 2024", tag: "Medication", isNew: false },
    { id: 5, icon: "W", title: "Resting HR trend captured", date: "Aug 22, 2024", tag: "Wearable", isNew: false },
  ];

  return (
    <AppFrame title="Timeline" subtitle="Your health history in one view.">
      <div className="space-y-3 h-full flex flex-col">
        {/* Filter chips */}
        <div className="flex gap-2 flex-wrap">
          {["All", "Lab", "Visit", "Imaging"].map((filter, idx) => (
            <button
              key={filter}
              className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.5px] rounded border transition-colors cursor-default"
              style={{
                backgroundColor: idx === 0 ? "var(--accent-soft)" : "var(--surface-2)",
                borderColor: idx === 0 ? "var(--accent)" : "var(--border)",
                color: idx === 0 ? "var(--accent)" : "var(--text-muted)",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Timeline list */}
        <div className="flex-1 overflow-hidden">
          <div className="space-y-2 h-full overflow-y-auto">
            {timelineItems.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border p-2.5 flex items-center gap-3"
                style={{
                  backgroundColor: item.isNew ? "var(--accent-soft)" : "var(--surface-2)",
                  borderColor: item.isNew ? "var(--accent)" : "var(--border)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                  style={{
                    backgroundColor: item.isNew ? "var(--accent-soft)" : "var(--surface-2)",
                    color: item.isNew ? "var(--accent)" : "var(--text-muted)",
                  }}
                >
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-medium truncate" style={{ color: "var(--text)" }}>
                      {item.title}
                    </p>
                    {item.isNew && (
                      <span
                        className="px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded flex-shrink-0"
                        style={{
                          backgroundColor: "var(--accent-soft)",
                          color: "var(--accent)",
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    {item.date}
                  </p>
                </div>

                {/* Tag */}
                <span
                  className="px-2 py-0.5 text-[10px] font-medium rounded flex-shrink-0"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    color: "var(--text-muted)",
                  }}
                >
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
