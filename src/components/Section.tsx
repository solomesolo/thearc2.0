"use client";

import React from "react";
import Container from "./Container";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: "black" | "dark";
}

export default function Section({ id, children, className = "", background = "black" }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`w-full ${className}`}
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <Container applySectionSpacing={true}>
        {children}
      </Container>
    </section>
  );
}

