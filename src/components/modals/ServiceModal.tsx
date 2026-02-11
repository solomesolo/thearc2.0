"use client";

import React, { useEffect, useRef } from "react";
import { X, Check, Star } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface Service {
  id: string;
  name: string;
  provider: string;
  description: string;
  price?: string;
  rating?: number;
  category?: string;
}

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onSelect?: () => void;
}

export default function ServiceModal({ service, onClose, onSelect }: ServiceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { selectedServices, evtServiceSelect } = useCommandCenterStore();

  useEffect(() => {
    if (service && titleRef.current) {
      titleRef.current.focus();
    }
  }, [service]);

  useEffect(() => {
    if (!service) return;

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
  }, [service, onClose]);

  if (!service) return null;

  const isSelected = selectedServices.includes(service.id);

  const handleSelect = () => {
    evtServiceSelect(service.id);
    if (onSelect) {
      onSelect();
    }
  };

  return (
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
      aria-labelledby="service-modal-title"
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
            id="service-modal-title"
            ref={titleRef}
            tabIndex={-1}
            style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)" }}
          >
            {service.name}
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{service.provider}</span>
            {service.category && (
              <>
                <span style={{ color: "var(--text-tertiary)" }}>•</span>
                <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{service.category}</span>
              </>
            )}
            {service.rating && (
              <>
                <span style={{ color: "var(--text-tertiary)" }}>•</span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Star size={14} style={{ fill: "var(--warning)", color: "var(--warning)" }} />
                  <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{service.rating}</span>
                </div>
              </>
            )}
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "16px" }}>
            {service.description}
          </p>

          {service.price && (
            <div style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px" }}>
              {service.price}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleSelect}
            style={{
              flex: 1,
              padding: "10px 16px",
              backgroundColor: isSelected ? "var(--success)" : "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            {isSelected && <Check size={16} />}
            {isSelected ? "Selected" : "Select"}
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
            Close
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
          Selecting a service adds it to your basket. You can proceed to checkout from the Marketplace page.
        </div>
      </div>
    </div>
  );
}



