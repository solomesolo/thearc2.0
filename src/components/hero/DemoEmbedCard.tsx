"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type PresetType = "records" | "trends" | "signals" | null;

// Mobile fallback image (placeholder - replace with actual preview image)
const MOBILE_PREVIEW_IMAGE = "/demo-preview-mobile.jpg";

interface DemoEmbedCardProps {
  prefersReducedMotion?: boolean;
}

export function DemoEmbedCard({ prefersReducedMotion = false }: DemoEmbedCardProps) {
  const [preset, setPreset] = useState<PresetType>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Intersection observer for lazy loading
  useEffect(() => {
    // SSR guard - ensure we're on the client and ref is available
    if (typeof window === "undefined") {
      setIsVisible(true); // Set visible on server to avoid hydration mismatch
      return;
    }

    if (!containerRef.current) return;

    // Check if already in viewport
    try {
      const rect = containerRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight + 300 && rect.bottom > -300;
      
      if (isInViewport) {
        setIsVisible(true);
        return;
      }
    } catch (error) {
      // Fallback if getBoundingClientRect fails
      setIsVisible(true);
      return;
    }

    // Use IntersectionObserver for lazy loading
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: "300px", // Start loading 300px before entering viewport
        }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        observer.disconnect();
      };
    } catch (error) {
      // Fallback if IntersectionObserver fails
      setIsVisible(true);
    }
  }, []);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false);
    console.error("Failed to load demo preview");
  };

  // Handle preset change
  const handlePresetChange = (newPreset: PresetType) => {
    setPreset(newPreset);
    if (iframeRef.current?.contentWindow) {
      // Send message to iframe
      iframeRef.current.contentWindow.postMessage(
        { type: "preset", preset: newPreset },
        "*"
      );
    }
  };

  // Get iframe URL with preset
  const getIframeUrl = () => {
    const baseUrl = "/demo/command-center";
    if (preset) {
      return `${baseUrl}?preset=${preset}`;
    }
    return baseUrl;
  };

  const presets = [
    { id: "records" as PresetType, label: "Records" },
    { id: "trends" as PresetType, label: "Trends" },
    { id: "signals" as PresetType, label: "Signals" },
  ];

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // SSR guard
    if (typeof window === "undefined") {
      setIsMobile(false); // Default to desktop on server
      return;
    }
    
    const checkMobile = () => {
      try {
        setIsMobile(window.innerWidth < 768);
      } catch (error) {
        setIsMobile(false); // Fallback to desktop
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      try {
        window.removeEventListener("resize", checkMobile);
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, []);

  // Mobile fallback
  if (isMobile) {
    return (
      <div className="w-full">
        {/* Mobile Preview Image */}
        <div
          className="relative rounded-[20px] overflow-hidden mb-4"
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface)",
            height: "320px",
            backgroundImage: `linear-gradient(135deg, rgba(12, 20, 22, 0.9) 0%, rgba(6, 11, 12, 0.95) 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center space-y-4 px-6">
            <div
              className="text-4xl mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              📊
            </div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Interactive Command Center Preview
            </p>
            <p
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              View your health timeline, signals, and action plan
            </p>
          </div>
        </div>

        {/* Mobile CTA Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/demo/command-center"
            className="w-full rounded-full px-6 py-3 flex items-center justify-center font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              backgroundColor: "var(--accent)",
              color: "#071012",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Open interactive demo
          </Link>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                const element = document.getElementById("how-it-works");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }
            }}
            className="w-full rounded-full px-6 py-3 flex items-center justify-center font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--border-strong)",
              color: "var(--text-primary)",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            Start building your timeline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      {/* Preset Controls */}
      <div className="flex items-center gap-2 mb-3">
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => handlePresetChange(p.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
              preset === p.id
                ? "bg-[var(--accent-alpha-20)] border border-[var(--accent)] text-[var(--accent-hover)]"
                : "bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            }`}
            style={{
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Demo Card Container */}
      <div
        className="relative rounded-[20px] overflow-hidden transition-all duration-200"
        style={{
          border: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          boxShadow: isInteracting
            ? "0 0 40px rgba(110, 211, 194, 0.08)"
            : "0 0 20px rgba(0, 0, 0, 0.3)",
          height: "clamp(420px, 36vw, 580px)",
          minHeight: "420px",
        }}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
      >
        {/* Header Row */}
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2.5"
          style={{
            backgroundColor: "rgba(12, 20, 22, 0.8)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Live preview
            </span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: "rgba(110, 211, 194, 0.1)",
                color: "var(--accent-hover)",
                fontWeight: 500,
              }}
            >
              Interactive
            </span>
          </div>
          <Link
            href="/demo/command-center"
            className="text-xs font-medium transition-colors hover:text-[var(--accent-hover)]"
            style={{ color: "var(--text-secondary)" }}
          >
            Open demo →
          </Link>
        </div>

        {/* Loading Skeleton */}
        {!isVisible && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--surface)" }}
          >
            <div className="text-center space-y-3">
              <div className="w-12 h-12 border-2 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin mx-auto" />
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Loading preview…
              </p>
            </div>
          </div>
        )}

        {/* Overlay for scroll prevention */}
        {isVisible && !isInteracting && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer transition-opacity"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(2px)",
            }}
            onClick={() => setIsInteracting(true)}
            onMouseEnter={() => setIsInteracting(true)}
          >
            <div
              className="px-4 py-2 rounded-full border backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(12, 20, 22, 0.8)",
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Click to interact
            </div>
          </div>
        )}

        {/* Iframe */}
        {isVisible && (
          <AnimatePresence>
            <div
              style={{
                position: "absolute",
                top: "40px", // Account for header height
                left: 0,
                right: 0,
                bottom: 0,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  transform: "scale(0.65)",
                  transformOrigin: "top left",
                  width: "153.85%", // Compensate for scale (100% / 0.65)
                  height: "153.85%", // Compensate for scale (100% / 0.65)
                }}
              >
                <motion.iframe
                  ref={iframeRef}
                  src={getIframeUrl()}
                  className="border-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: isInteracting ? "auto" : "none",
                    border: "none",
                  }}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoading ? 0.5 : 1 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                  title="Command Center Demo Preview"
                  loading="lazy"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </div>
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

