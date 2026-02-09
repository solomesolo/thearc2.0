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
      style={{ backgroundColor: '#0B0E10' }} // Match hero section background
    >
      <Container applySectionSpacing={true}>
        {children}
      </Container>
    </section>
  );
}

