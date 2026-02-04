"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "compact" | "large" | "elevated";
}

export default function Card({ 
  children, 
  className = "", 
  hover = true,
  variant = "default"
}: CardProps) {
  const variantClass = variant === "compact" 
    ? "card-compact" 
    : variant === "large" 
    ? "card-large" 
    : variant === "elevated"
    ? "card-elevated"
    : "";
  
  const hoverClass = hover ? "" : "no-hover";
  
  return (
    <div
      className={`card-premium ${variantClass} ${hoverClass} ${className}`}
      style={{
        transform: hover ? undefined : "none",
      }}
    >
      {children}
    </div>
  );
}

