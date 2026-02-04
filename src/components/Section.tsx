"use client";

import React from "react";
import Container from "./Container";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: "black" | "dark" | "section";
}

export default function Section({ id, children, className = "", background = "section" }: SectionProps) {
  const bgClass = background === "section" 
    ? "bg-layer-section" 
    : background === "dark" 
    ? "bg-layer-page" 
    : "bg-layer-page";
  
  return (
    <section 
      id={id} 
      className={`w-full ${bgClass} ${className}`}
      style={{
        backgroundColor: background === "section" 
          ? 'var(--color-bg-section)' 
          : 'var(--color-bg-page)'
      }}
    >
      <Container applySectionSpacing={true}>
        {children}
      </Container>
    </section>
  );
}

