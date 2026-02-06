"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Link as LinkIcon, Check } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import Toast from "../ui/Toast";

interface ConnectProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectProviderModal({ isOpen, onClose }: ConnectProviderModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
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

  const providers = [
    { id: "epic", name: "Epic MyChart", logo: "🏥" },
    { id: "cerner", name: "Cerner HealtheLife", logo: "💊" },
    { id: "allscripts", name: "Allscripts", logo: "📋" },
    { id: "athena", name: "Athenahealth", logo: "⚕️" },
    { id: "quest", name: "Quest Diagnostics", logo: "🔬" },
    { id: "labcorp", name: "LabCorp", logo: "🧪" },
  ];

  const handleConnect = () => {
    if (selectedProvider) {
      // Simulate connection
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        closeModal();
        onClose();
        // In real app, would refresh data and update coverage
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
        aria-labelledby="connect-provider-modal-title"
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
              id="connect-provider-modal-title"
              ref={titleRef}
              tabIndex={-1}
              style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)" }}
            >
              Connect provider
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
              Connect your health records from your provider or lab. We use secure, encrypted connections.
            </p>

            <div style={{ display: "grid", gap: "8px" }}>
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    backgroundColor: selectedProvider === provider.id ? "var(--primary-light)" : "var(--surface-alt)",
                    border: selectedProvider === provider.id ? "2px solid var(--primary)" : "1px solid var(--border)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "var(--text-primary)",
                    textAlign: "left",
                    width: "100%",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>{provider.logo}</span>
                  <span style={{ flex: 1 }}>{provider.name}</span>
                  {selectedProvider === provider.id && <Check size={18} style={{ color: "var(--primary)" }} />}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleConnect}
              disabled={!selectedProvider}
              style={{
                flex: 1,
                padding: "10px 16px",
                backgroundColor: selectedProvider ? "var(--primary)" : "var(--text-tertiary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: selectedProvider ? "pointer" : "not-allowed",
                fontSize: "14px",
                fontWeight: 500,
                opacity: selectedProvider ? 1 : 0.5,
              }}
            >
              Connect
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
            Your data is encrypted and secure. We never store your login credentials.
          </div>
        </div>
      </div>

      <Toast message="Connection successful. Syncing your records..." show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}

