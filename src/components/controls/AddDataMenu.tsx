"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Link as LinkIcon, Plus, FileText } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

export default function AddDataMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { evtAddDataClick, evtConnectProvider, evtConnectWearables, context } = useCommandCenterStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleUpload = () => {
    evtAddDataClick();
    setIsOpen(false);
  };

  const handleConnectProvider = () => {
    evtConnectProvider();
    setIsOpen(false);
  };

  const handleConnectWearables = () => {
    evtConnectWearables();
    setIsOpen(false);
  };

  // Determine recommended option based on context
  const getRecommendedOption = () => {
    if (context.type === "tile") {
      if (context.id === "labs") return "upload";
      if (context.id === "wearables") return "connect-wearables";
    }
    return null;
  };

  const recommended = getRecommendedOption();

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          backgroundColor: "var(--primary)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
        }}
        aria-label="Add data"
        aria-expanded={isOpen}
      >
        <Plus size={16} />
        <span>Add data</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: "8px",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            minWidth: "200px",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <div
            onClick={handleUpload}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: recommended === "upload" ? "var(--surface-alt)" : "transparent",
              borderBottom: "1px solid var(--border)",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface-alt)";
            }}
            onMouseLeave={(e) => {
              if (recommended !== "upload") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <Upload size={18} color="var(--text-primary)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                Upload documents
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                PDF, images
              </div>
            </div>
            {recommended === "upload" && (
              <span style={{ fontSize: "10px", color: "var(--primary)", fontWeight: 600 }}>Recommended</span>
            )}
          </div>

          <div
            onClick={handleConnectProvider}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: recommended === "connect-provider" ? "var(--surface-alt)" : "transparent",
              borderBottom: "1px solid var(--border)",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface-alt)";
            }}
            onMouseLeave={(e) => {
              if (recommended !== "connect-provider") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <LinkIcon size={18} color="var(--text-primary)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                Connect provider
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                Import records
              </div>
            </div>
          </div>

          <div
            onClick={handleConnectWearables}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: recommended === "connect-wearables" ? "var(--surface-alt)" : "transparent",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface-alt)";
            }}
            onMouseLeave={(e) => {
              if (recommended !== "connect-wearables") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <FileText size={18} color="var(--text-primary)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                Connect wearables
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                Apple Health, Fitbit, etc.
              </div>
            </div>
            {recommended === "connect-wearables" && (
              <span style={{ fontSize: "10px", color: "var(--primary)", fontWeight: 600 }}>Recommended</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



