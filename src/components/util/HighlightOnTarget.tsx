"use client";

import React, { useEffect, useRef } from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";

interface HighlightOnTargetProps {
  id: string;
  children: React.ReactNode;
}

export default function HighlightOnTarget({ id, children }: HighlightOnTargetProps) {
  const highlightTargetId = useCommandCenterStore((state) => state.highlightTargetId);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightTargetId === id && ref.current) {
      ref.current.style.outline = "2px solid var(--focus)";
      ref.current.style.outlineOffset = "4px";
      ref.current.style.transition = "outline 0.2s";
      ref.current.style.borderRadius = "8px";

      const timer = setTimeout(() => {
        if (ref.current) {
          ref.current.style.outline = "none";
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [highlightTargetId, id]);

  return (
    <div ref={ref} id={id}>
      {children}
    </div>
  );
}
