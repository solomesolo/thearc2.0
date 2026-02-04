"use client";

import Link from "next/link";
import React from "react";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CTAButton({ href, onClick, children, variant = "primary", className = "" }: CTAButtonProps) {
  const baseClasses = `inline-flex items-center justify-center px-8 py-3.5 rounded-[var(--radius-button)] bg-layer-page text-accent border border-[var(--color-border-base)] text-base font-medium tracking-tight transition-button hover:border-accent hover:shadow-button-hover ${className}`;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={baseClasses}
        style={{
          boxShadow: 'var(--shadow-button)'
        }}
      >
        {children}
      </button>
    );
  }

  if (variant === "primary") {
    return (
      <Link
        href={href || "#"}
        className={baseClasses}
        style={{
          boxShadow: 'var(--shadow-button)'
        }}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <Link
      href={href || "#"}
      className={baseClasses}
      style={{
        boxShadow: 'var(--shadow-button)'
      }}
    >
      {children}
    </Link>
  );
}

