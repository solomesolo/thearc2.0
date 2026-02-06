"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Upload, Building2, Watch, FileText } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

export default function AddDataButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isDragActive = useCommandCenterStore((state) => state.isDragActive);
  const { evtAddDataClick, evtTileAddData, evtDragEnter, evtDragLeave, evtDropFiles } = useCommandCenterStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      evtDragEnter();
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      evtDragLeave();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.files.length) {
        evtDropFiles(e.dataTransfer.files);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("dragleave", handleDragLeave);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("dragleave", handleDragLeave);
      document.removeEventListener("drop", handleDrop);
    };
  }, [evtDragEnter, evtDragLeave, evtDropFiles]);

  const menuItems = [
    {
      label: "Upload documents",
      icon: <Upload size={16} />,
      action: () => {
        evtAddDataClick();
        setIsOpen(false);
      },
    },
    {
      label: "Connect provider",
      icon: <Building2 size={16} />,
      action: () => {
        window.location.href = "/connect/provider";
        setIsOpen(false);
      },
    },
    {
      label: "Connect wearables",
      icon: <Watch size={16} />,
      action: () => {
        window.location.href = "/connect/wearables";
        setIsOpen(false);
      },
    },
    {
      label: "Add manually",
      icon: <FileText size={16} />,
      action: () => {
        window.location.href = "/add/manual";
        setIsOpen(false);
      },
    },
  ];

  return (
    <>
      {/* Drag and drop banner */}
      {isDragActive && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "var(--primary)",
            color: "white",
            padding: "12px",
            textAlign: "center",
            zIndex: 1000,
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Drop to upload documents
          <div style={{ fontSize: "12px", opacity: 0.9, marginTop: "4px" }}>PDF, JPG, PNG</div>
        </div>
      )}

      {/* Button */}
      <div style={{ position: "relative" }} ref={menuRef}>
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
        >
          <Plus size={16} />
          Add data
        </button>

        {/* Menu */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "8px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              minWidth: "200px",
              zIndex: 100,
            }}
          >
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "var(--text-primary)",
                  textAlign: "left",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--surface-alt)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

