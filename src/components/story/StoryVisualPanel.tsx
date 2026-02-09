"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StoryStep } from "./StoryNarrativeSticky";

interface StoryVisualPanelProps {
  activeStep: StoryStep;
  prefersReducedMotion?: boolean;
}

export default function StoryVisualPanel({
  activeStep,
  prefersReducedMotion = false,
}: StoryVisualPanelProps) {
  const [isInteracting, setIsInteracting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for lazy loading
  useEffect(() => {
    if (typeof window === "undefined") {
      setIsVisible(true); // Set visible on server to avoid hydration mismatch
      return;
    }

    if (!containerRef.current) return;

    try {
      const rect = containerRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight + 300 && rect.bottom > -300;

      if (isInViewport) {
        setIsVisible(true);
        return;
      }

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
          rootMargin: "300px",
        }
      );

      observer.observe(containerRef.current);

      return () => observer.disconnect();
    } catch (error) {
      console.error("Intersection Observer setup failed:", error);
      setIsVisible(true); // Fallback to visible
    }
  }, []);

  // Initialize iframe when visible
  useEffect(() => {
    if (isVisible && iframeRef.current && !iframeRef.current.src) {
      setIsLoading(true);
      setHasError(false);
      iframeRef.current.src = `/demo/command-center`;
    }
  }, [isVisible]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Fallback: if iframe doesn't fire onLoad after 5 seconds, assume it loaded
  useEffect(() => {
    if (isVisible && isLoading && !hasError) {
      const timeout = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
        }
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, isLoading, hasError]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-[20px] overflow-hidden"
      style={{
        border: "1px solid rgba(231,240,238,0.08)",
        backgroundColor: "#0C1416",
        boxShadow: isInteracting
          ? "0 0 40px rgba(110, 211, 194, 0.08)"
          : "0 6px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(231,240,238,0.04)",
        height: "clamp(500px, 60vh, 700px)",
        minHeight: "500px",
        transition: "box-shadow 200ms ease",
      }}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      {/* Loading Skeleton */}
      {(!isVisible || isLoading || hasError) && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: "#0C1416" }}
        >
          {hasError ? (
            <div className="text-center space-y-3">
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Failed to load preview.
              </p>
              <button
                onClick={() => {
                  setHasError(false);
                  setIsLoading(true);
                  if (iframeRef.current) {
                    iframeRef.current.src = `/demo/command-center`;
                  }
                }}
                className="text-xs"
                style={{ color: "var(--accent)" }}
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div
                className="w-12 h-12 border-2 rounded-full animate-spin mx-auto"
                style={{
                  borderColor: "var(--border)",
                  borderTopColor: "var(--accent)",
                }}
              />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Loading preview…
              </p>
            </div>
          )}
        </div>
      )}

      {/* Overlay for scroll prevention */}
      {isVisible && !isInteracting && !isLoading && !hasError && (
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
      {isVisible && !hasError && (
        <AnimatePresence mode="wait">
          <motion.iframe
            key={activeStep}
            ref={iframeRef}
            src="/demo/command-center"
            className="border-0 w-full h-full"
            style={{
              pointerEvents: isInteracting ? "auto" : "none",
              border: "none",
            }}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0.5 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            title="Day in the life demo preview"
            loading="eager"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </AnimatePresence>
      )}
    </div>
  );
}

