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
  const baseClasses = `inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[var(--accent)] text-[#071012] border border-transparent text-base font-medium tracking-tight transition-all duration-200 hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-alpha-20)] focus:ring-offset-2 focus:ring-offset-[var(--page-bg)] active:bg-[var(--accent-pressed)] ${className}`;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={baseClasses}
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
      >
        {children}
      </Link>
    );
  }
  
  return (
    <Link
      href={href || "#"}
      className={baseClasses}
    >
      {children}
    </Link>
  );
}

