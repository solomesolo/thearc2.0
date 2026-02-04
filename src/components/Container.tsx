"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "default" | "wide" | "narrow" | "editorial";
  applySectionSpacing?: boolean;
}

export default function Container({ 
  children, 
  className = "",
  maxWidth = "default",
  applySectionSpacing = false
}: ContainerProps) {
  // Container max-width system:
  // default: 1200px (site-wide standard)
  // wide: 1440px (for hero or wide content)
  // narrow: 1024px (for focused content)
  
  const maxWidthClass = {
    default: "max-w-[1200px]",
    wide: "max-w-[1440px]",
    narrow: "max-w-[1024px]",
    editorial: "max-w-[1120px]" // Tighter, more editorial width (1120px max)
  }[maxWidth];
  
  // Horizontal padding system - Strict baseline grid:
  // Mobile (<768px): 16px (px-4) - space-3
  // Desktop (>=768px): 32px (px-8) - space-5
  
  // Section spacing (vertical padding) - Strict baseline grid:
  // Applied when applySectionSpacing={true}
  // Mobile: 64px top/bottom - space-7
  // Desktop: 96px top/bottom - space-7 * 1.5
  
  const sectionSpacingClass = applySectionSpacing
    ? "py-16 md:py-24"
    : "";
  
  return (
    <div 
      className={`w-full mx-auto ${maxWidthClass} px-4 md:px-8 ${sectionSpacingClass} ${className}`}
    >
      {children}
    </div>
  );
}

