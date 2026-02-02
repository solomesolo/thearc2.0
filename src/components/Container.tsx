"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "default" | "wide" | "narrow";
}

export default function Container({ 
  children, 
  className = "",
  maxWidth = "default"
}: ContainerProps) {
  // Global horizontal padding system:
  // Mobile (<768px): 24px
  // Tablet (>=768px, <1024px): 32px
  // Desktop (>=1024px, <1440px): 48px
  // XL Desktop (>=1440px): 0px (centered with max-width)
  
  const maxWidthClass = {
    default: "max-w-[1280px]",
    wide: "max-w-[1440px]",
    narrow: "max-w-[1024px]"
  }[maxWidth];
  
  // Padding system:
  // Mobile (<768px): 20px (px-5)
  // Tablet (>=768px, <1024px): 28px (px-7)
  // Desktop (>=1024px, <1440px): 40px (px-10)
  // Wide (>=1440px): 48px (px-12)
  // Note: For hero sections, we may use custom padding
  
  return (
    <div className={`w-full mx-auto ${maxWidthClass} px-5 md:px-7 lg:px-10 xl:px-12 ${className}`}>
      {children}
    </div>
  );
}

