"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface RegionUnavailableModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: "pricing_health_intelligence" | "pricing_longevity_studio" | string;
}

type ModalStatus = "idle" | "submitting" | "success" | "error_invalid" | "error_network";

export default function RegionUnavailableModal({
  isOpen,
  onClose,
  source = "pricing_health_intelligence",
}: RegionUnavailableModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<ModalStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus email input when modal opens
  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      // Track modal opened
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "waitlist_modal_opened", {
          source,
        });
      }
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, source]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && status !== "submitting") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, status, onClose]);

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
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

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (status === "error_invalid") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error_invalid");
      setErrorMessage("Please enter a valid email.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source,
          ts: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Network error");
      }

      // Track successful submission
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "waitlist_submitted", {
          source,
        });
      }

      setStatus("success");
    } catch (error) {
      // Track submission error
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "waitlist_submit_error", {
          source,
          error_type: "network",
        });
      }
      setStatus("error_network");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (status === "submitting") return; // Disable close while submitting
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 backdrop-blur-[6px]"
            style={{
              backgroundColor: "rgba(0,0,0,0.55)",
            }}
            onClick={handleOverlayClick}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-[520px] rounded-[24px] border p-6 pointer-events-auto"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-lg)",
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                disabled={status === "submitting"}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
                style={{
                  backgroundColor: "var(--surface-2)",
                }}
                aria-label="Close modal"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ color: "var(--text-muted)" }}
                >
                  <path
                    d="M12 4L4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {status === "success" ? (
                /* Success State */
                <div className="space-y-4">
                  <h2
                    id="modal-title"
                    className="text-xl font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    You're on the list.
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    We'll email you when Arc launches in your region. If you're among the first 100, you'll get free access.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full py-3 px-6 rounded-full font-semibold text-sm transition-colors"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                    }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* Default/Form State */
                <div className="space-y-6">
                  {/* Region Lock Badge */}
                  <div
                    className="inline-flex items-center px-2.5 py-1 rounded border text-[11px] font-semibold uppercase tracking-[0.5px]"
                    style={{
                      backgroundColor: "var(--surface-2)",
                      borderColor: "var(--border)",
                      color: "var(--text-muted)",
                    }}
                  >
                    REGION LOCK
                  </div>

                  {/* Header */}
                  <div>
                    <h2
                      id="modal-title"
                      className="text-xl font-semibold mb-2"
                      style={{ color: "var(--text)" }}
                    >
                      Not available in your region (yet)
                    </h2>
                    <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      <p>
                        Arc isn't available where you are right now.
                        <br />
                        Leave your email and we'll notify you as soon as we launch in your region.
                      </p>
                      <p>
                        Early access perk: the first 100 people who join the waitlist get free access when it goes live.
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="waitlist-email"
                        className="block text-[11px] font-semibold uppercase tracking-[0.8px] mb-2"
                        style={{ color: "rgba(143,166,163,0.78)" }}
                      >
                        Email
                      </label>
                      <input
                        ref={emailInputRef}
                        id="waitlist-email"
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder="you@domain.com"
                        disabled={status === "submitting"}
                        className="w-full px-4 rounded-[12px] border transition-all focus:outline-none"
                        style={{
                          height: "44px",
                          backgroundColor: "var(--surface-2)",
                          borderColor:
                            status === "error_invalid"
                              ? "var(--danger)"
                              : "var(--border)",
                          color: "var(--text)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--accent)";
                          e.target.style.boxShadow = "0 0 0 3px var(--accent-soft)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor =
                            status === "error_invalid"
                              ? "var(--danger)"
                              : "var(--border)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                      {status === "error_invalid" && (
                        <p className="mt-1.5 text-xs" style={{ color: "var(--danger)" }}>
                          {errorMessage}
                        </p>
                      )}
                      {status === "error_network" && (
                        <p className="mt-1.5 text-xs" style={{ color: "var(--danger)" }}>
                          {errorMessage}
                        </p>
                      )}
                    </div>

                    {/* Consent microcopy */}
                    <p
                      className="text-[10px] leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      By joining the waitlist, you agree to receive launch updates from Arc. Unsubscribe anytime.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="flex-1 py-3 px-6 rounded-full font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "var(--bg)",
                          height: "44px",
                        }}
                      >
                        {status === "submitting" ? "Submitting..." : "Join the waitlist"}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        disabled={status === "submitting"}
                        className="flex-1 py-3 px-6 rounded-full font-semibold text-sm transition-colors border disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "var(--border)",
                          color: "var(--text-muted)",
                          height: "44px",
                        }}
                      >
                        Not now
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

