"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Watch, Check } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import Toast from "../ui/Toast";

interface ConnectWearablesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectWearablesModal({ isOpen, onClose }: ConnectWearablesModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectedWearables, setSelectedWearables] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const { closeModal } = useCommandCenterStore();

  useEffect(() => {
    if (isOpen && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleTab = (e: KeyboardEvent) => {
      if (!modalRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);

    if (modalRef.current) {
      const firstFocusable = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen, onClose]);

  const wearables = [
    { id: "apple", name: "Apple Health", logo: "🍎", description: "Heart rate, steps, sleep" },
    { id: "fitbit", name: "Fitbit", logo: "⌚", description: "Activity, sleep, heart rate" },
    { id: "garmin", name: "Garmin", logo: "🏃", description: "Fitness, HRV, VO₂" },
    { id: "whoop", name: "Whoop", logo: "💪", description: "Recovery, strain, sleep" },
    { id: "oura", name: "Oura Ring", logo: "💍", description: "Sleep, readiness, activity" },
  ];

  const toggleWearable = (id: string) => {
    setSelectedWearables((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
  };

  const handleConnect = () => {
    if (selectedWearables.length > 0) {
      // Simulate connection
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        closeModal();
        onClose();
        // In real app, would generate derived signals (RHR/HRV/sleep/VO₂)
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px",
        }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-wearables-modal-title"
      >
        <div
          ref={modalRef}
          style={{
            backgroundColor: "var(--surface)",
            borderRadius: "8px",
            padding: "24px",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <h2
              id="connect-wearables-modal-title"
              ref={titleRef}
              tabIndex={-1}
              style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)" }}
            >
              Connect wearables
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Connect your wearable devices to track heart rate, sleep, activity, and more. We'll generate insights from your data.
            </p>

            <div style={{ display: "grid", gap: "8px" }}>
              {wearables.map((wearable) => {
                const isSelected = selectedWearables.includes(wearable.id);
                return (
                  <button
                    key={wearable.id}
                    onClick={() => toggleWearable(wearable.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      backgroundColor: isSelected ? "var(--primary-light)" : "var(--surface-alt)",
                      border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border)",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "var(--text-primary)",
                      textAlign: "left",
                      width: "100%",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>{wearable.logo}</span>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontWeight: 500 }}>{wearable.name}</span>
                      <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{wearable.description}</span>
                    </div>
                    {isSelected && <Check size={18} style={{ color: "var(--primary)" }} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleConnect}
              disabled={selectedWearables.length === 0}
              style={{
                flex: 1,
                padding: "10px 16px",
                backgroundColor: selectedWearables.length > 0 ? "var(--primary)" : "var(--text-tertiary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: selectedWearables.length > 0 ? "pointer" : "not-allowed",
                fontSize: "14px",
                fontWeight: 500,
                opacity: selectedWearables.length > 0 ? 1 : 0.5,
              }}
            >
              Connect {selectedWearables.length > 0 ? `(${selectedWearables.length})` : ""}
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px 16px",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Cancel
            </button>
          </div>

          <div
            style={{
              fontSize: "11px",
              color: "var(--text-tertiary)",
              textAlign: "center",
              paddingTop: "16px",
              marginTop: "16px",
              borderTop: "1px solid var(--border)",
            }}
          >
            We'll generate insights like resting heart rate, HRV, sleep consistency, and VO₂ max from your wearable data.
          </div>
        </div>
      </div>

      <Toast message="Connection successful. Generating insights..." show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}


