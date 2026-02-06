"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Upload as UploadIcon } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import Toast from "../ui/Toast";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  gapId?: string;
}

export default function UploadModal({ isOpen, onClose, gapId }: UploadModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalPayload = useCommandCenterStore((state) => state.modal.payload);
  const [documentType, setDocumentType] = useState(modalPayload?.prefillType || "Lab result");
  const [showToast, setShowToast] = useState(false);
  const { evtUploadSuccess } = useCommandCenterStore();

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

  const handleUpload = () => {
    if (fileInputRef.current?.files?.length) {
      // Simulate upload
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        evtUploadSuccess(documentType);
        onClose();
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
        aria-labelledby="upload-modal-title"
      >
        <div
          ref={modalRef}
          style={{
            backgroundColor: "var(--surface)",
            borderRadius: "8px",
            padding: "24px",
            maxWidth: "500px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <h2
              id="upload-modal-title"
              ref={titleRef}
              tabIndex={-1}
              style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)" }}
            >
              Upload documents
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
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px" }}>
              Drag and drop files here, or choose a file.
            </p>
            <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "16px" }}>
              Supported: PDF, JPG, PNG
            </p>

            <div
              style={{
                border: "2px dashed var(--border)",
                borderRadius: "8px",
                padding: "32px",
                textAlign: "center",
                marginBottom: "16px",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon size={32} style={{ color: "var(--text-tertiary)", marginBottom: "8px" }} />
              <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Drop files here</div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              style={{ display: "none" }}
              onChange={handleUpload}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "100%",
                padding: "10px 16px",
                backgroundColor: "var(--surface-alt)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
                marginBottom: "16px",
              }}
            >
              Choose file
            </button>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                }}
              >
                Document type
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  backgroundColor: "var(--surface-alt)",
                  color: "var(--text-primary)",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <option value="Lab result">Lab result</option>
                <option value="Imaging report">Imaging report</option>
                <option value="Prescription">Prescription</option>
                <option value="Clinical note">Clinical note</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleUpload}
              style={{
                flex: 1,
                padding: "10px 16px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Upload
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
        </div>
      </div>

      <Toast message="Upload complete." show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}

