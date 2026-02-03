"use client";

import React, { useEffect, useRef, ReactNode, useState } from "react";

interface Visit1TabOverlayProps {
  title: string;
  statusIndicator?: ReactNode;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  isEditing?: boolean;
  hasUnsavedChanges?: boolean;
}

export default function Visit1TabOverlay({
  title,
  statusIndicator,
  onClose,
  children,
  footer,
  isEditing = false,
  hasUnsavedChanges = false,
}: Visit1TabOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isEditingRef = useRef(isEditing);
  const hasUnsavedRef = useRef(hasUnsavedChanges);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  // Update refs when props change
  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  useEffect(() => {
    hasUnsavedRef.current = hasUnsavedChanges;
  }, [hasUnsavedChanges]);

  // Animate backdrop fade-in (120ms)
  useEffect(() => {
    setBackdropVisible(true);
    return () => setBackdropVisible(false);
  }, []);

  // Animate panel slide-in (180ms)
  useEffect(() => {
    // Small delay to ensure backdrop is visible first
    const timer = setTimeout(() => {
      setPanelVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showDiscardConfirm) {
          setShowDiscardConfirm(false);
        } else if (hasUnsavedRef.current && isEditingRef.current) {
          setShowDiscardConfirm(true);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, showDiscardConfirm]);

  // Focus trap inside panel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusableElements = panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    panel.addEventListener("keydown", handleTab);
    return () => panel.removeEventListener("keydown", handleTab);
  }, []);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleBackdropClick = () => {
    if (showDiscardConfirm) {
      setShowDiscardConfirm(false);
      return;
    }

    if (hasUnsavedRef.current && isEditingRef.current) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleCloseClick = () => {
    if (hasUnsavedRef.current && isEditingRef.current) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleDiscard = () => {
    setShowDiscardConfirm(false);
    onClose();
  };

  const handleStay = () => {
    setShowDiscardConfirm(false);
  };

  return (
    <div 
      className="fixed inset-0 z-40"
      style={{ 
        background: "transparent", // Ensure no inherited background
      }}
    >
      {/* Backdrop - neutral dim + blur (no blue) */}
      <div
        className="fixed inset-0 z-40"
        onClick={handleBackdropClick}
        style={{
          backgroundColor: backdropVisible 
            ? "rgba(15, 23, 42, 0.18)" 
            : "rgba(15, 23, 42, 0)", // Neutral dim (slate-900 with 18% opacity)
          backdropFilter: "blur(6px)", // Frosted glass effect
          WebkitBackdropFilter: "blur(6px)", // Safari support
          transition: "background-color 120ms ease-out", // Backdrop fade: 120ms
          // Fallback: if backdrop-filter not supported, only dim overlay is visible
        }}
      />

      {/* Panel - Option A: right side of center column, leaving some Overview visible */}
      <div
        ref={panelRef}
        className="fixed left-[260px] bg-white z-50 flex flex-col"
        style={{
          top: "64px", // Below header
          bottom: "64px", // Above footer
          width: "520px", // Desktop width
          height: "calc(100vh - 128px)", // headerHeight (64px) + footerHeight (64px) = 128px
          borderRadius: "12px", // 12-16px range
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", // Subtle shadow
          transform: panelVisible ? "translateX(0)" : "translateX(100%)", // Slide in from right
          transition: "transform 180ms ease-out", // Panel slide: 180ms
          background: "#FFFFFF", // Explicit white background (surface)
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
      >
        {/* PanelHeader */}
        <div className="flex-shrink-0 border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <h2 id="overlay-title" className="text-[18px] leading-[26px] font-semibold text-gray-900 truncate">
              {title}
            </h2>
            {statusIndicator}
          </div>
          
          {/* Unsaved changes confirmation (inline, not modal) */}
          {showDiscardConfirm ? (
            <div className="flex items-center gap-2 ml-4">
              <span className="text-[12px] leading-[16px] text-gray-600 whitespace-nowrap">
                You have unsaved changes — discard?
              </span>
              <button
                onClick={handleDiscard}
                className="px-3 py-1 text-[12px] leading-[16px] text-gray-700 hover:text-gray-900 font-medium border border-gray-300 rounded-[6px] hover:bg-gray-50 transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleStay}
                className="px-3 py-1 text-[12px] leading-[16px] text-gray-700 hover:text-gray-900 font-medium border border-gray-300 rounded-[6px] hover:bg-gray-50 transition-colors"
              >
                Stay
              </button>
            </div>
          ) : (
            <button
              onClick={handleCloseClick}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100 flex-shrink-0 ml-4"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* PanelBody - overflow-y: auto */}
        <div className="flex-1 overflow-y-auto bg-white" style={{ minHeight: 0 }}>
          {children}
        </div>

        {/* PanelFooter */}
        {footer && (
          <div className="flex-shrink-0 bg-white border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
