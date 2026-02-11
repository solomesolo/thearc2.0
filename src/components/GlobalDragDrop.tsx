"use client";

import React, { useEffect } from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

export default function GlobalDragDrop() {
  const { isDragActive, evtDragEnter, evtDragLeave, evtDropFiles } = useCommandCenterStore();

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      evtDragEnter();
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      // Only hide if leaving the window
      if (e.clientX === 0 && e.clientY === 0) {
        evtDragLeave();
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      evtDragLeave();
      if (e.dataTransfer?.files.length) {
        evtDropFiles(e.dataTransfer.files);
      }
    };

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("drop", handleDrop);
    };
  }, [evtDragEnter, evtDragLeave, evtDropFiles]);

  if (!isDragActive) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--surface)",
          borderRadius: "12px",
          padding: "48px",
          border: "3px dashed var(--primary)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>📄</div>
        <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
          Drop to upload documents
        </div>
        <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Release to open upload dialog
        </div>
      </div>
    </div>
  );
}



