"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  const hoverClass = hover 
    ? "hover:border-[var(--accent)] hover:shadow-[0_0_20px_var(--accent-alpha-20)]" 
    : "";
  
  return (
    <div
      className={`bg-[#111111] border border-[#222222] rounded-[14px] p-8 transition-all ${hoverClass} ${className}`}
      style={{
        padding: '32px'
      }}
    >
      {children}
    </div>
  );
}

